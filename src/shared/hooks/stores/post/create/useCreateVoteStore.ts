import { create } from "zustand";

interface CreateVoteState {
  voteTitle: string;
  options: string[];
  isMultipleChoice: boolean;
  allowAnonymous: boolean;
  setVoteTitle: (title: string) => void;
  setVoteOption: (index: number, value: string) => void;
  addVoteOption: () => void;
  removeVoteOption: (index: number) => void;
  toggleMultipleChoice: () => void;
  toggleAllowAnonymous: () => void;
  clearVote: () => void;
  //submitVote: () => void;
}

export const useCreateVoteStore = create<CreateVoteState>((set) => ({
  voteTitle: "",
  options: ["", ""],
  isMultipleChoice: false,
  allowAnonymous: false,
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
  },
  clearVote: () =>
    set(() => ({
      isVote: false,
      isApply: false,
      voteTitle: "",
      options: ["", ""],
      isMultipleChoice: false,
      allowAnonymous: false,
    })),
}));
