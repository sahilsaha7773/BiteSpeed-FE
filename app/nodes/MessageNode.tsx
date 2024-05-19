import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import SourceHandle from "../handles/SourceHandle";


function MessageNode({ data, isConnectable }: {
  data: { value: string },
  isConnectable: boolean
}) {
  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="flex items-center bg-blue-300 rounded-t-[5px] p-1 gap-1">
        <div className="text-lg">📩</div>
        <div style={{
          fontSize: '12px',
        }}>Send Message</div>
      </div>
      <div className="p-4">{data.value}</div>
      <SourceHandle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={1}
      />
    </div>
  );
}

export default MessageNode;
