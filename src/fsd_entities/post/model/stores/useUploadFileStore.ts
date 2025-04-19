import { StateCreator } from 'zustand';
import { create } from 'zustand';

interface UploadFileState {
  selectedFileList: File[];
}

interface UploadFileAction {
  addFile: (file: File) => void;
  removeFile: (index: number) => void;
  clearFileList: () => void;
}

type UploadFileSlice = UploadFileState & UploadFileAction;

const createUploadFileStore: StateCreator<UploadFileSlice, [], [], UploadFileSlice> = set => ({
  selectedFileList: [],
  addFile: (file: File) =>
    set(state => ({
      selectedFileList: [...state.selectedFileList, file],
    })),
  removeFile: (index: number) =>
    set(state => ({
      selectedFileList: state.selectedFileList.filter((_, i) => i !== index),
    })),
  clearFileList: () => set({ selectedFileList: [] }),
});

export const useUploadFileStore = create<UploadFileSlice>()((...args) => ({
  ...createUploadFileStore(...args),
}));
