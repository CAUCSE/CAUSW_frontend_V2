import { StateCreator } from 'zustand';

interface PostCreationState {
  isVote: boolean;
  isApply: boolean;
}

interface PostCreationAction {
  toggleVote: () => void;
  toggleApply: () => void;
  clearPost: () => void;
}

export type PostCreationSlice = PostCreationState & PostCreationAction;

export const createPostCreationSlice: StateCreator<
  PostCreationSlice,
  [],
  [],
  PostCreationSlice
> = (set) => ({
  isVote: false,
  isApply: false,

  toggleVote: () => set((state) => ({ isVote: !state.isVote, isApply: false })),
  toggleApply: () =>
    set((state) => ({ isVote: false, isApply: !state.isApply })),
  clearPost: () => {
    set({
      isApply: false,
      isVote: false,
    });
  },
});
