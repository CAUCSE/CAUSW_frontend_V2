import { create } from "zustand";

interface CreateVoteState {
  isVote: boolean;
  isApply: boolean;
  voteTitle: string;
  options: string[];
  isMultipleChoice: boolean;
  allowAnonymous: boolean;
  // 일단은 isApply면 isVote 무조건 flase되도록 해둠.
  setIsVoteFalse: () => void;
  toggleVote: () => void;
  toggleApply: () => void;
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
  isApply: false,
  voteTitle: "",
  options: ["", ""],
  isMultipleChoice: false,
  allowAnonymous: false,
  setIsVoteFalse: () => set((state) => ({ isVote: false })),
  toggleVote: () => set((state) => ({ isVote: !state.isVote, isApply: false })),
  toggleApply: () =>
    set((state) => ({ isApply: !state.isApply, isVote: false })),
  setVoteTitle: (title) => set({ voteTitle: title }),
  setVoteOption: (index, value) =>
    set((state) => {
      const newOptions = [...state.options];
      newOptions[index] = value;
      return { options: newOptions };
    }),
  addVoteOption: () => set((state) => ({ options: [...state.options, ""] })),
  removeVoteOption: (index) =>
    set((state) => ({
      options: state.options.filter((_, i) => i !== index),
    })),
  toggleMultipleChoice: () =>
    set((state) => ({ isMultipleChoice: !state.isMultipleChoice })),
  toggleAllowAnonymous: () =>
    set((state) => ({ allowAnonymous: !state.allowAnonymous })),
  submitVote: () => {
    const { options, isMultipleChoice, allowAnonymous } =
      useCreateVoteStore.getState();
    const filteredOptions = options.filter((option) => option !== "");
    console.log("투표 제출:", filteredOptions, {
      isMultipleChoice,
      allowAnonymous,
    });
  },
}));
