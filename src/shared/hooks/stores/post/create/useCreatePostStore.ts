import { create } from 'zustand';
import { PostRscService } from '@/shared';

interface CreatePostState {
  title: string;
  content: string;
  isQuestion: boolean;
  isAnonymous: boolean;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  toggleQuestion: () => void;
  toggleAnonymous: () => void;
  //createPost: (boardId: string) => Promise<void>;
  clearPost: () => void;
}

export const useCreatePostStore = create<CreatePostState>((set) => ({
  title: '',
  content: '',
  isQuestion: false,
  isAnonymous: false,
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  toggleQuestion: () => set((state) => ({ isQuestion: !state.isQuestion })),
  toggleAnonymous: () => set((state) => ({ isAnonymous: !state.isAnonymous })),
  clearPost: () => {
    set({title:'', content:'',isAnonymous: false, isQuestion:false})
  }
}));