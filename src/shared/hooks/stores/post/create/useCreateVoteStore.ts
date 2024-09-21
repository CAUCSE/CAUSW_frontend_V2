import { create } from 'zustand';

interface CreateVoteState {
  isVote: boolean;
  voteTitle: string;
  options: string[];
  isMultipleChoice: boolean;
  allowAnonymous: boolean;
  toggleVote: () => void;
  setVoteTitle: (title: string) => void;
  setOption: (index: number, value: string) => void;
  addOption: () => void;
  removeOption: (index: number) => void;
  toggleMultipleChoice: () => void;
  toggleAllowAnonymous: () => void;
  submitVote: () => void;
}

export const useCreateVoteStore = create<CreateVoteState>((set) => ({
  isVote: false,
  voteTitle: '',
  options: ['', ''],
  isMultipleChoice: false,
  allowAnonymous: false,
  toggleVote: () => set((state) => ({ isVote: !state.isVote })),
  setVoteTitle: (title) => set({ voteTitle: title }),
  setOption: (index, value) =>
    set((state) => {
      const newOptions = [...state.options];
      newOptions[index] = value;
      return { options: newOptions };
    }),
  addOption: () => set((state) => ({ options: [...state.options, ''] })),
  removeOption: (index) =>
    set((state) => ({
      options: state.options.filter((_, i) => i !== index),
    })),
  toggleMultipleChoice: () => set((state) => ({ isMultipleChoice: !state.isMultipleChoice })),
  toggleAllowAnonymous: () => set((state) => ({ allowAnonymous: !state.allowAnonymous })),
  submitVote: () => {
    const { options, isMultipleChoice, allowAnonymous } = useCreateVoteStore.getState();
    const filteredOptions = options.filter((option) => option !== '');
    console.log('투표 제출:', filteredOptions, { isMultipleChoice, allowAnonymous });
  },
}));