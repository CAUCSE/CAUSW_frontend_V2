import { StateCreator } from 'zustand';

interface CommentState {
  childCommentActiveId?: Comment.CommentDto['id'];
}

interface CommentAction {
  setChildCommentActiveId: (
    childCommentActiveId?: Comment.CommentDto['id'],
  ) => void;
}

export type CommentSlice = CommentState & CommentAction;

export const createCommentSlice: StateCreator<
  CommentSlice,
  [],
  [],
  CommentSlice
> = (set) => ({
  childCommentActiveId: undefined,
  setChildCommentActiveId: (childCommentActiveId) =>
    set({ childCommentActiveId }),
});
