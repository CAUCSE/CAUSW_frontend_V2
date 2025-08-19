import { create } from 'zustand';

import { createUploadFileStore, type UploadFileSlice } from './uploadFileSlice';

export const useUploadFileStore = create<UploadFileSlice>()((...args) => ({
  ...createUploadFileStore(...args),
}));
