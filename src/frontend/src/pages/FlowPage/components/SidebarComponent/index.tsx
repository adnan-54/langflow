import { cloneDeep } from "lodash";
import { useEffect, useMemo, useState } from "react";
import IconComponent from "../../../../components/genericIconComponent";
import { TagsSelector } from "../../../../components/tagsSelectorComponent";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../../../components/ui/resizable";
import ExportModal from "../../../../modals/exportModal";
import ShareModal from "../../../../modals/shareModal";
import useAlertStore from "../../../../stores/alertStore";
import useFlowStore from "../../../../stores/flowStore";
import useFlowsManagerStore from "../../../../stores/flowsManagerStore";
import { useStoreStore } from "../../../../stores/storeStore";
import { useTypesStore } from "../../../../stores/typesStore";
import { APIClassType, APIObjectType } from "../../../../types/api";
import { classNames, cn } from "../../../../utils/utils";
import SideBarAccordeon from "./sideBarAccordeon";

export default function Sidebar(): JSX.Element {
  const data = useTypesStore((state) => state.data);
  const templates = useTypesStore((state) => state.templates);
  const getFilterEdge = useFlowStore((state) => state.getFilterEdge);
  const setFilterEdge = useFlowStore((state) => state.setFilterEdge);
  const uploadFlow = useFlowsManagerStore((state) => state.uploadFlow);
  const currentFlow = useFlowsManagerStore((state) => state.currentFlow);
  const [filteredCategories, setFilterCategories] = useState<any[]>([]);
  const hasStore = useStoreStore((state) => state.hasStore);
  const hasApiKey = useStoreStore((state) => state.hasApiKey);
  const validApiKey = useStoreStore((state) => state.validApiKey);
  const sidebarOpen = useFlowStore((state) => state.sidebarOpen);
  const setSidebarOpen = useFlowStore((state) => state.setSidebarOpen);
  const isBuilt = useFlowStore((state) => state.isBuilt);
  const setErrorData = useAlertStore((state) => state.setErrorData);
  const [dataFilter, setFilterData] = useState(data);
  const [tabActive, setTabActive] = useState("Components");
  const [search, setSearch] = useState("");
  const [tagsVisible, setTagsVisible] = useState(false);

  const [size, setSize] = useState(40);
  function onDragStart(
    event: React.DragEvent<any>,
    data: { type: string; node?: APIClassType }
  ): void {
    //start drag event
    var crt = event.currentTarget.cloneNode(true);
    crt.style.position = "absolute";
    crt.style.top = "-500px";
    crt.style.right = "-500px";
    crt.classList.add("cursor-grabbing");
    document.body.appendChild(crt);
    event.dataTransfer.setDragImage(crt, 0, 0);
    event.dataTransfer.setData("nodedata", JSON.stringify(data));
  }

  // Handle showing components after use search input
  function handleSearchInput(e: string) {
    if (e === "") {
      setFilterData(data);
      return;
    }
    setFilterData((_) => {
      let ret = {};
      Object.keys(data).forEach((d: keyof APIObjectType, i) => {
        ret[d] = {};
        let keys = Object.keys(data[d]).filter(
          (nd) =>
            nd.toLowerCase().includes(e.toLowerCase()) ||
            data[d][nd].display_name?.toLowerCase().includes(e.toLowerCase())
        );
        keys.forEach((element) => {
          ret[d][element] = data[d][element];
        });
      });
      return ret;
    });
  }

  useEffect(() => {
    // show components with error on load
    let errors: string[] = [];
    Object.keys(templates).forEach((component) => {
      if (templates[component].error) {
        errors.push(component);
      }
    });
    if (errors.length > 0)
      setErrorData({ title: " Components with errors: ", list: errors });
  }, []);

  function handleBlur() {
    // check if search is search to reset fitler on click input
    if ((!search && search === "") || search === "search") {
      setFilterData(data);
      setFilterEdge([]);
      setSearch("");
    }
  }

  useEffect(() => {
    if (getFilterEdge.length !== 0) {
      setSearch("");
    }

    if (getFilterEdge.length === 0 && search === "") {
      setSearch("");
      setFilterData(data);
    }
  }, [getFilterEdge, data]);

  useEffect(() => {
    handleSearchInput(search);
  }, [data]);

  useEffect(() => {
    if (getFilterEdge?.length > 0) {
      setFilterData((_) => {
        let dataClone = cloneDeep(data);
        let ret = {};
        Object.keys(dataClone).forEach((d: keyof APIObjectType, i) => {
          ret[d] = {};
          if (getFilterEdge.some((x) => x.family === d)) {
            ret[d] = dataClone[d];

            const filtered = getFilterEdge
              .filter((x) => x.family === d)
              .pop()
              .type.split(",");

            for (let i = 0; i < filtered.length; i++) {
              filtered[i] = filtered[i].trimStart();
            }

            if (filtered.some((x) => x !== "")) {
              let keys = Object.keys(dataClone[d]).filter((nd) =>
                filtered.includes(nd)
              );
              Object.keys(dataClone[d]).forEach((element) => {
                if (!keys.includes(element)) {
                  delete ret[d][element];
                }
              });
            }
          }
        });
        setSearch("");
        return ret;
      });
    }
  }, [getFilterEdge]);

  useEffect(() => {
    if (getFilterEdge?.length > 0) {
      setFilterData((_) => {
        let dataClone = cloneDeep(data);
        let ret = {};
        Object.keys(dataClone).forEach((d: keyof APIObjectType, i) => {
          ret[d] = {};
          if (getFilterEdge.some((x) => x.family === d)) {
            ret[d] = dataClone[d];

            const filtered = getFilterEdge
              .filter((x) => x.family === d)
              .pop()
              .type.split(",");

            for (let i = 0; i < filtered.length; i++) {
              filtered[i] = filtered[i].trimStart();
            }

            if (filtered.some((x) => x !== "")) {
              let keys = Object.keys(dataClone[d]).filter((nd) =>
                filtered.includes(nd)
              );
              Object.keys(dataClone[d]).forEach((element) => {
                if (!keys.includes(element)) {
                  delete ret[d][element];
                }
              });
            }
          }
        });
        setSearch("");
        return ret;
      });
    }
  }, [getFilterEdge, data]);

  const ModalMemo = useMemo(
    () => (
      <ShareModal
        is_component={false}
        component={currentFlow!}
        disabled={!hasApiKey || !validApiKey || !hasStore}
      >
        <button
          disabled={!hasApiKey || !validApiKey || !hasStore}
          className={classNames(
            "extra-side-bar-buttons gap-[4px] text-sm font-semibold",
            !hasApiKey || !validApiKey || !hasStore
              ? "button-disable  cursor-default text-muted-foreground"
              : ""
          )}
        >
          <IconComponent
            name="Share3"
            className={classNames(
              "-m-0.5 -ml-1 h-6 w-6",
              !hasApiKey || !validApiKey || !hasStore
                ? "extra-side-bar-save-disable"
                : ""
            )}
          />
          Share
        </button>
      </ShareModal>
    ),
    [hasApiKey, validApiKey, currentFlow, hasStore]
  );

  const ExportMemo = useMemo(
    () => (
      <ExportModal>
        <button className={classNames("extra-side-bar-buttons")}>
          <IconComponent name="FileDown" className="side-bar-button-size" />
        </button>
      </ExportModal>
    ),
    []
  );

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="pointer-events-none absolute top-0 h-full w-full transition-all duration-500 ease-in-out"
        style={{ left: sidebarOpen ? 0 : -size + "vw" }}
      >
        <ResizablePanel
          maxSize={90}
          defaultSize={40}
          minSize={30}
          onResize={(size) => {
            setSize(size);
          }}
          className="pointer-events-auto flex flex-col bg-background shadow-lg"
        >
          <div className="flex items-center justify-between px-10 pt-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="primary"
                  className="mr-2 h-12 p-2 px-3 shadow-sm"
                  size="lg"
                  onClick={() => setTagsVisible(!tagsVisible)}
                >
                  <IconComponent name="Filter" className="h-5 w-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <TagsSelector
                  tags={[
                    { id: "vectorstore", name: "Vector Store" },
                    { id: "chain", name: "Chain" },
                    { id: "nlp", name: "NLP" },
                    { id: "tool", name: "Tool" },
                    { id: "io", name: "I/O" },
                  ]}
                  loadingTags={false}
                  disabled={false}
                  selectedTags={filteredCategories}
                  setSelectedTags={setFilterCategories}
                />
              </PopoverContent>
            </Popover>
            <div className="relative flex w-full items-center">
              <Input
                onFocusCapture={() => handleBlur()}
                value={search}
                type="text"
                name="search"
                id="search"
                placeholder="Search components..."
                className="nopan nodelete nodrag noundo nocopy input-search mx-0 h-12 px-4"
                onChange={(event) => {
                  handleSearchInput(event.target.value);
                  // Set search input state
                  setSearch(event.target.value);
                }}
              />
              <div className="search-icon right-1">
                <IconComponent
                  name="Search"
                  className={"h-5 w-5 stroke-[1.5] text-primary"}
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="ml-4 flex gap-0 border-b border-border">
              <button
                onClick={() => {
                  setTabActive("Components");
                }}
                className={
                  "flex items-center gap-2.5 border-b-2 px-4 py-3 transition-all " +
                  (tabActive === "Components"
                    ? "border-primary"
                    : " border-transparent text-muted-foreground hover:text-primary")
                }
              >
                <IconComponent name="ToyBrick" className="h-5 w-5" />
                {size > 40 ? "Components" : ""}
              </button>
              <button
                onClick={() => {
                  setTabActive("Flows");
                }}
                className={
                  "flex items-center gap-2.5 border-b-2 px-4 py-3 transition-all " +
                  (tabActive === "Flows"
                    ? "border-primary"
                    : " border-transparent text-muted-foreground hover:text-primary")
                }
              >
                <IconComponent name="Group" className="h-5 w-5" />
                {size > 40 ? "Flows" : ""}
              </button>
            </div>
          </div>

          <div className="space-y-8 overflow-y-scroll px-10 py-8 scrollbar-hide">
            <SideBarAccordeon
              title="Inputs / Outputs"
              icon="ArrowLeftRight"
              tagVisible={tagsVisible}
            />
            <SideBarAccordeon
              title="Data"
              icon="HardDrive"
              tagVisible={tagsVisible}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="pointer-events-none" />
      </ResizablePanelGroup>
    </>
  );
}
