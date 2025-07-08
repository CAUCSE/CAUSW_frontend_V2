import { create } from 'zustand';

import { createPostCreationSlice, type PostCreationSlice } from './postCreationSlice';

export const usePostCreationStore = create<PostCreationSlice>()((...args) => ({
  ...createPostCreationSlice(...args),
}));
