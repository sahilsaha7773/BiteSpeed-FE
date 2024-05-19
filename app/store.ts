// @ts-nocheck
import { create } from 'zustand'

const useMyStore = create((set) => ({
  nodeText: '',
  setNodeText: (nodeText) => set({ nodeText }),
  openSettings: false,
  setOpenSettings: (openSettings) => set({ openSettings }),
  selectedNode: null,
  setSelectedNode: (selectedNode) => set({ selectedNode }),
}))

export default useMyStore