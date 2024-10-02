import { create } from "zustand";
import { PostRscService } from "@/shared";

interface CreatePostState {
  title: string;
  content: string;
  isQuestion: boolean;
  isAnonymous: boolean;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setIsQuestion: (isQuestion: boolean) => void;
  setIsAnonymous: (isAnonymous: boolean) => void;
  toggleQuestion: () => void;
  toggleAnonymous: () => void;
  clearPost: () => void;
}

export const useCreatePostStore = create<CreatePostState>((set) => ({
  title: "",
  content: "",
  isQuestion: false,
  isAnonymous: false,
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setIsQuestion: (isQuestion) => set({ isQuestion }),
  setIsAnonymous: (isAnonymous) => set({ isAnonymous }),
  toggleQuestion: () => set((state) => ({ isQuestion: !state.isQuestion })),
  toggleAnonymous: () => set((state) => ({ isAnonymous: !state.isAnonymous })),
  clearPost: () => {
    set({ title: "", content: "", isAnonymous: false, isQuestion: false });
  },
}));
