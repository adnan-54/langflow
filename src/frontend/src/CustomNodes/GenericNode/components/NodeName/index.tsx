import { Input } from "@/components/ui/input";
import useFlowsManagerStore from "@/stores/flowsManagerStore";
import useFlowStore from "@/stores/flowStore";
import { VertexBuildTypeAPI } from "@/types/api";
import { cn } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function NodeName({
  display_name,
  selected,
  nodeId,
  showNode,
  validationStatus,
  isOutdated,
  beta,
  editNameDescription,
}: {
  display_name?: string;
  selected?: boolean;
  nodeId: string;
  showNode: boolean;
  validationStatus: VertexBuildTypeAPI | null;
  isOutdated: boolean;
  beta: boolean;
  editNameDescription: boolean;
}) {
  const [nodeName, setNodeName] = useState<string>(display_name ?? "");
  const takeSnapshot = useFlowsManagerStore((state) => state.takeSnapshot);
  const setNode = useFlowStore((state) => state.setNode);

  useEffect(() => {
    if (selected && editNameDescription) {
      takeSnapshot();
    }
  }, [editNameDescription]);

  useEffect(() => {
    setNodeName(display_name ?? "");
  }, [display_name]);

  return editNameDescription ? (
    <div className="m-[1px] w-full">
      <Input
        onBlur={() => {
          if (nodeName?.trim() !== "") {
            setNodeName(nodeName);
            setNode(nodeId, (old) => ({
              ...old,
              data: {
                ...old.data,
                node: {
                  ...old.data.node,
                  display_name: nodeName,
                },
              },
            }));
          } else {
            setNodeName(display_name ?? "");
          }
        }}
        value={nodeName}
        autoFocus
        onChange={(e) => setNodeName(e.target.value)}
        data-testid={`input-title-${display_name}`}
      />
    </div>
  ) : (
    <div className="group flex w-full items-center gap-1">
      <div
        data-testid={"title-" + display_name}
        className={cn(
          "nodoubleclick w-full truncate font-medium text-primary",
          showNode ? "cursor-text" : "cursor-default",
        )}
      >
        <div className="flex cursor-grab items-center gap-2">
          <span
            className={cn(
              "max-w-44 cursor-grab truncate text-[14px]",
              validationStatus?.data?.duration && "max-w-36",
              beta && "max-w-36",
              validationStatus?.data?.duration && beta && "max-w-20",
              isOutdated && "max-w-40",
              !showNode && "max-w-28",
            )}
          >
            {display_name}
          </span>
        </div>
      </div>
    </div>
  );
}
