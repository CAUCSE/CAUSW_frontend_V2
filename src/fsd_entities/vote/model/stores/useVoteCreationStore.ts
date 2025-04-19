import { create, StateCreator } from 'zustand';

interface VoteCreationState {
  voteTitle: string;
  optionList: string[];
  isMultipleChoice: boolean;
  allowAnonymous: boolean;
}

interface VoteCreationAction {
  setVoteTitle: (title: string) => void;
  setVoteOption: (index: number, value: string) => void;
  addVoteOption: () => void;
  removeVoteOption: (index: number) => void;
  toggleMultipleChoice: () => void;
  toggleAllowAnonymous: () => void;
  clearVote: () => void;
}

type VoteCreationSlice = VoteCreationState & VoteCreationAction;

const createVoteCreationStore: StateCreator<VoteCreationSlice, [], [], VoteCreationSlice> = set => ({
  voteTitle: '',
  optionList: ['', ''],
  isMultipleChoice: false,
  allowAnonymous: false,
  setVoteTitle: title => set({ voteTitle: title }),
  setVoteOption: (index, value) =>
    set(state => ({ optionList: state.optionList.map((option, idx) => (idx === index ? value : option)) })),
  addVoteOption: () => set(state => ({ optionList: [...state.optionList, ''] })),
  removeVoteOption: index => set(state => ({ optionList: state.optionList.filter((_, idx) => idx !== index) })),
  toggleMultipleChoice: () => set(state => ({ isMultipleChoice: !state.isMultipleChoice })),
  toggleAllowAnonymous: () => set(state => ({ allowAnonymous: !state.allowAnonymous })),
  clearVote: () =>
    set({
      voteTitle: '',
      optionList: ['', ''],
      isMultipleChoice: false,
      allowAnonymous: false,
    }),
});

export const useVoteCreationStore = create<VoteCreationSlice>()((...args) => ({
  ...createVoteCreationStore(...args),
}));
