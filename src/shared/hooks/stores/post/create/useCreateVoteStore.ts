import { create } from 'zustand';

interface CreateVoteState {
  isVote: boolean;
  voteTitle: string;
  options: string[];
  isMultipleChoice: boolean;
  allowAnonymous: boolean;
  // 일단은 isApply면 isVote 무조건 flase되도록 해둠.
  setIsVoteFalse: () => void;
  toggleVote: () => void;
  setVoteTitle: (title: string) => void;
  setVoteOption: (index: number, value: string) => void;
  addVoteOption: () => void;
  removeVoteOption: (index: number) => void;
  toggleMultipleChoice: () => void;
  toggleAllowAnonymous: () => void;
  //submitVote: () => void;
}

export const useCreateVoteStore = create<CreateVoteState>((set) => ({
  isVote: false,
  voteTitle: '',
  options: ['', ''],
  isMultipleChoice: false,
  allowAnonymous: false,
  setIsVoteFalse: () => set((state) => ({ isVote: false })),
  toggleVote: () => set((state) => ({ isVote: !state.isVote })),
  setVoteTitle: (title) => set({ voteTitle: title }),
  setVoteOption: (index, value) =>
    set((state) => {
      const newOptions = [...state.options];
      newOptions[index] = value;
      return { options: newOptions };
    }),
  addVoteOption: () => set((state) => ({ options: [...state.options, ''] })),
  removeVoteOption: (index) =>
    set((state) => ({
      options: state.options.filter((_, i) => i !== index),
    })),
  toggleMultipleChoice: () => set((state) => ({ isMultipleChoice: !state.isMultipleChoice })),
  toggleAllowAnonymous: () => set((state) => ({ allowAnonymous: !state.allowAnonymous })),
  /* submitVote: (postId: string) => {
    const { voteTitle, options, isMultipleChoice, allowAnonymous } = useCreateVoteStore.getState();
    const filteredOptions = options.filter((option) => option !== '');
    console.log('투표 제출:', filteredOptions, { isMultipleChoice, allowAnonymous });
  }, */
}));