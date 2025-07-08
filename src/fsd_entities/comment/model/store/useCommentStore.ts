import { create } from 'zustand';

import { type CommentSlice, createCommentSlice } from './commentSlice';

export const useCommentStore = create<CommentSlice>()((...args) => ({
  ...createCommentSlice(...args),
}));
