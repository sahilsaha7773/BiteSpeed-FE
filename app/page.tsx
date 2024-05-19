"use client";

import "reactflow/dist/style.css";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  ReactFlowProvider,
} from "reactflow";
import { useCallback, useState, useRef, useEffect } from "react";
import MessageNode from "./nodes/MessageNode";
import NodesPanel from "./NodesPanel";
import useMyStore from "./store";
import Navbar from "./Navbar";

const initialNodes = [
  {
    id: "node-1",
    type: "messageNode",
    position: { x: 0, y: 0 },
    data: { value: "Edit by Clicking on this Node" },
  },
];
const nodeTypes = { messageNode: MessageNode };
let id = 0;

const getId = () => `dndnode_${id++}`;

export default function Home() {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const nodeText = useMyStore((state: any) => state.nodeText);
  const selectedNode = useMyStore((state: any) => state.selectedNode);
  const setOpenSettings = useMyStore((state: any) => state.setOpenSettings);
  const setSelectedNode = useMyStore((state: any) => state.setSelectedNode);

  const handleSave = () => {
    // throw error if there are more than one Nodes and more than one Node has empty target handles
    if (nodes.length < 2) {
      alert("Save Successful");
      return;
    }

    const targetNodes: { // target node id: number of edges
      [key: string]: number;
    } = {};

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      console.log("edge", edge);
      if (!edge.target) continue;
      if (!targetNodes[edge.target]) {
        targetNodes[edge.target] = 1;
      } else {
        targetNodes[edge.target] = targetNodes[edge.target] + 1;
      }
    }

    // check if there are more than one Nodes and more than one Node has empty target handles
    if (Object.keys(targetNodes).length < nodes.length - 1) {
      alert("Save Not Successful");
      return;
    }

    alert("Save Successful");
  };

  useEffect(() => {
    // we need to update the nodes in the store when the nodes change
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = {
            ...node.data,
            value: nodeText,
          };
        }

        return node;
      })
    );
  }, [nodeText, setNodes]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onNodeClick = useCallback((event: { preventDefault: () => void; }, node: any) => {
    event.preventDefault();
    setOpenSettings(true);
    setSelectedNode(node);
  }, []);

  const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: any; clientY: any; }) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }
      // @ts-ignore
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { value: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  return (
    <div>
      <Navbar handleSave={handleSave} />
      <div className="flex">
        <ReactFlowProvider>
          <div
            className="reactflow-wrapper"
            style={{ width: "70%", height: "100vh" }}
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              onNodeClick={onNodeClick}
              fitView
            >
              <Background variant={BackgroundVariant.Dots} />
              <Controls />
            </ReactFlow>
          </div>
          <NodesPanel />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
