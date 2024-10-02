import { create } from 'zustand';

interface FileUploadState {
  selectedFiles: File[];  
  setFiles: (files: File[]) => void;
  addFile: (file: File) => void;
  clearFiles: () => void;  
  removeFile: (index: number) => void;
}

export const useFileUploadStore = create<FileUploadState>((set) => ({
  selectedFiles: [],
  setFiles: (files: File[]) => set({ selectedFiles: files }),
  addFile: (file) => 
    set((state) => ({
      selectedFiles: [...state.selectedFiles, file],
    })),
  clearFiles: () => set({ selectedFiles: [] }),
  removeFile: (index: number) =>
    set((state) => ({
      selectedFiles: state.selectedFiles.filter((_, i) => i !== index),
    })),
}));
