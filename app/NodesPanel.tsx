import {
  ArrowLeftCircleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/16/solid";
import { DragEvent, useState } from "react";
import { useNodes } from "reactflow";
import useMyStore from "./store";

const NodesPanel = () => {
  const openSettings = useMyStore((state: any) => state.openSettings);
  const setOpenSettings = useMyStore((state: any) => state.setOpenSettings);
  const selectedNode = useMyStore((state: any) => state.selectedNode);
  const [settingsData, setSettingsData] = useState(selectedNode?.data?.value);

  const nodeText = useMyStore((state: any) => state.nodeText);
  const setNodeText = useMyStore((state: any) => state.setNodeText);

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return openSettings ? (
    <div className="w-[30%] border-l-2 border-l-slate-300">
      <div className="flex items-center border-b-2 border-b-slate-300">
        <div
          className="cursor-pointer p-4 text-lg"
          onClick={() => setOpenSettings(false)}
        >
          <ArrowLeftCircleIcon width={20} />
        </div>
        <div className="mr-auto">Message</div>
      </div>
      <div className="p-4">
        <div>Text</div>
        {selectedNode && (
          <div>
            <textarea
              className="w-full p-2 border-2 border-gray-300 rounded-md"
              value={settingsData}
              onChange={(e) => {
                setNodeText(e.target.value);
                console.log("e.target.value", nodeText);
              }}
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <aside className="p-10 border-l-2 border-gray-300">
      <div
        className="dndnode messageNode flex flex-col items-center py-5 w-48 border-2 border-blue-500 text-blue-500"
        onDragStart={(event) => onDragStart(event, "messageNode")}
        draggable
      >
        <ChatBubbleOvalLeftEllipsisIcon width={50} height={50} color="" />
        <div>Message</div>
      </div>
    </aside>
  );
};

export default NodesPanel;
