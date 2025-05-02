import { StateCreator } from 'zustand';

interface PostCreationState {
  title: string;
  content: string;
  isQuestion: boolean;
  isAnonymous: boolean;
  isVote: boolean;
  isApply: boolean;
}

interface PostCreationAction {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setIsQuestion: (isQuestion: boolean) => void;
  setIsAnonymous: (isAnonymous: boolean) => void;
  toggleQuestion: () => void;
  toggleAnonymous: () => void;
  toggleVote: () => void;
  toggleApply: () => void;
  clearPost: () => void;
}

export type PostCreationSlice = PostCreationState & PostCreationAction;

export const createPostCreationSlice: StateCreator<PostCreationSlice, [], [], PostCreationSlice> = set => ({
  title: '',
  content: '',
  isQuestion: false,
  isAnonymous: false,
  isVote: false,
  isApply: false,

  setTitle: title => set({ title }),
  setContent: content => set({ content }),
  setIsQuestion: isQuestion => set({ isQuestion }),
  setIsAnonymous: isAnonymous => set({ isAnonymous }),
  toggleQuestion: () => set(state => ({ isQuestion: !state.isQuestion })),
  toggleAnonymous: () => set(state => ({ isAnonymous: !state.isAnonymous })),
  toggleVote: () => set(state => ({ isVote: !state.isVote, isApply: false })),
  toggleApply: () => set(state => ({ isVote: false, isApply: !state.isApply })),
  clearPost: () => {
    set({
      title: '',
      content: '',
      isAnonymous: false,
      isQuestion: false,
      isApply: false,
      isVote: false,
    });
  },
});
