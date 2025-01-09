import asyncio
import datetime
from unittest.mock import AsyncMock

import pytest
from apscheduler.events import JobExecutionEvent
from langflow.services.database.models.job.model import Job, JobStatus
from langflow.services.deps import get_jobs_service, session_scope
from langflow.services.jobs.service import JobsService
from sqlmodel import select


@pytest.fixture
async def task_service(client):  # noqa: ARG001
    """Create a task service for testing."""
    service = get_jobs_service()
    await service.setup()
    yield service
    await service.teardown()


@pytest.fixture
async def task_service_with_mock_listeners():
    """Create a task service with mock listeners."""
    service = get_jobs_service()
    service._handle_job_executed = AsyncMock()
    service._handle_job_error = AsyncMock()
    await service.setup()
    yield service
    await service.teardown()


# Create a mock task function that has all the kwargs
async def mock_task_func(**kwargs):
    return kwargs


async def failing_mock_task_func(**kwargs):  # noqa: ARG001
    msg = "Simulated failure"
    raise ValueError(msg)


@pytest.fixture
async def sample_job(task_service: JobsService, active_user, simple_api_test):
    """Create a sample job for testing."""
    task_id = await task_service.create_job(
        task_func=mock_task_func,
        run_at=None,
        name="Test Task",
        kwargs={
            "flow": simple_api_test,
            "input_request": {
                "input_value": "test input",
                "input_type": "text",
                "output_type": "text",
                "tweaks": {},
            },
            "stream": False,
            "api_key_user": active_user,
        },
    )
    async with session_scope() as session:
        stmt = select(Job).where(Job.id == task_id)
        job = (await session.exec(stmt)).first()
    assert job is not None, "Job was not created"
    return job


async def test_listeners_are_called(sample_job: Job):
    """Test that the listeners are called."""
    # Check that the job has the results set correctly
    assert isinstance(sample_job.result, dict), "Job result should be a dictionary"
    assert sample_job.error is None, "Job error should be None"


async def test_handle_job_executed(task_service: JobsService, sample_job: Job):
    """Test handling of successful job execution."""
    # Create a JobExecutionEvent
    event = JobExecutionEvent(
        code=0,  # Success code
        job_id=sample_job.id,
        jobstore="default",
        retval={"output": "Test result"},
        scheduled_run_time=sample_job.next_run_time,
    )

    # Handle the event
    await task_service._handle_job_executed(event)

    # Verify the job status was updated
    async with session_scope() as session:
        stmt = select(Job).where(Job.id == sample_job.id)
        updated_job = (await session.exec(stmt)).first()
        assert updated_job is not None, "Job not found"
        assert updated_job.status == JobStatus.COMPLETED, "Job status not updated to COMPLETED"
        assert updated_job.result == {"output": "Test result"}, "Job result not saved correctly"


async def test_handle_job_error(task_service: JobsService, sample_job: Job):
    """Test handling of job execution error."""
    # Create a JobEvent with an error
    test_error = ValueError("Test error message")
    event = JobExecutionEvent(
        code=1,  # Error code
        job_id=sample_job.id,
        jobstore="default",
        exception=test_error,
        scheduled_run_time=sample_job.next_run_time,
    )

    # Handle the error event
    await task_service._handle_job_error(event)

    # Verify the job status and error were updated
    async with session_scope() as session:
        stmt = select(Job).where(Job.id == sample_job.id)
        updated_job = (await session.exec(stmt)).first()
        assert updated_job is not None, "Job not found"
        assert updated_job.status == JobStatus.FAILED, "Job status not updated to FAILED"
        assert updated_job.error == str(test_error), "Job error not saved correctly"


async def test_concurrent_job_updates(task_service: JobsService, sample_job: Job):
    """Test handling concurrent updates to the same job."""
    # Create multiple events for the same job
    success_event = JobExecutionEvent(
        code=0,
        job_id=sample_job.id,
        scheduled_run_time=sample_job.next_run_time,
        jobstore="default",
        retval="Success result",
    )
    error_event = JobExecutionEvent(
        code=1,
        job_id=sample_job.id,
        jobstore="default",
        exception=ValueError("Test error"),
        scheduled_run_time=sample_job.next_run_time,
    )

    # Handle events concurrently
    await asyncio.gather(
        task_service._handle_job_executed(success_event),
        task_service._handle_job_error(error_event),
    )

    # Verify final state (one of the updates should succeed, the other should fail gracefully)
    async with session_scope() as session:
        stmt = select(Job).where(Job.id == sample_job.id)
        final_job = (await session.exec(stmt)).first()
        assert final_job is not None, "Job not found"
        assert final_job.status in [JobStatus.COMPLETED, JobStatus.FAILED], "Job should be either completed or failed"


@pytest.mark.usefixtures("client")
async def test_invalid_job_id(task_service: JobsService):
    """Test handling events for non-existent jobs."""
    # Create events with invalid job ID
    invalid_success_event = JobExecutionEvent(
        code=0,
        job_id="nonexistent_id",
        jobstore="default",
        retval="Success result",
        scheduled_run_time=datetime.datetime.now(datetime.timezone.utc),
    )
    invalid_error_event = JobExecutionEvent(
        code=1,
        job_id="nonexistent_id",
        jobstore="default",
        exception=ValueError("Test error"),
        scheduled_run_time=datetime.datetime.now(datetime.timezone.utc),
    )

    # Both handlers should handle non-existent jobs gracefully
    await task_service._handle_job_executed(invalid_success_event)
    await task_service._handle_job_error(invalid_error_event)


@pytest.mark.asyncio
async def test_job_cancellation(task_service: JobsService, sample_job: Job):
    """Test cancelling a scheduled job."""
    # Cancel the job
    cancelled = await task_service.cancel_job(sample_job.id)
    assert cancelled is True

    # Verify job status
    async with session_scope() as session:
        stmt = select(Job).where(Job.id == sample_job.id)
        updated_job = (await session.exec(stmt)).first()
        assert updated_job is not None
        assert updated_job.status == JobStatus.CANCELLED
        assert updated_job.is_active is False


@pytest.mark.asyncio
async def test_job_result_size_limits(task_service: JobsService, sample_job: Job):
    """Test handling of large job results."""
    # Create a large result payload
    large_result = {
        "data": "x" * 1_000_000,  # 1MB of data
        "metadata": {"size": "very large"},
    }

    # Create success event with large result
    event = JobExecutionEvent(
        code=0,
        job_id=sample_job.id,
        jobstore="default",
        retval=large_result,
        scheduled_run_time=sample_job.next_run_time,
    )

    # Handle the event
    await task_service._handle_job_executed(event)

    # Verify the job result was handled appropriately
    async with session_scope() as session:
        stmt = select(Job).where(Job.id == sample_job.id)
        updated_job = (await session.exec(stmt)).first()
        assert updated_job is not None
        assert updated_job.status == JobStatus.COMPLETED
        # Verify result was either truncated or properly stored
        assert isinstance(updated_job.result, dict)
        assert "data" in updated_job.result


@pytest.mark.asyncio
async def test_concurrent_job_creation(task_service: JobsService, active_user, simple_api_test):
    """Test creating multiple jobs concurrently."""
    num_jobs = 5
    job_ids = []

    # Create multiple jobs concurrently
    async def create_job(index: int):
        return await task_service.create_job(
            task_func=mock_task_func,
            run_at=None,
            name=f"Concurrent Job {index}",
            kwargs={
                "flow": simple_api_test,
                "input_request": {"input_value": f"concurrent test {index}"},
                "stream": False,
                "api_key_user": active_user,
            },
        )

    # Create jobs concurrently
    tasks = [create_job(i) for i in range(num_jobs)]
    job_ids = await asyncio.gather(*tasks)

    # Verify all jobs were created successfully
    async with session_scope() as session:
        for job_id in job_ids:
            stmt = select(Job).where(Job.id == job_id)
            job = (await session.exec(stmt)).first()
            assert job is not None
            assert job.status == JobStatus.COMPLETED
            assert job.is_active is True

    # Verify all jobs have unique IDs
    assert len(set(job_ids)) == num_jobs
