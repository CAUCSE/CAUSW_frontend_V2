import {create} from 'zustand';

interface PostState {
  post: any | null;
  numLike: number;
  numFavorite: number;
  numComment: number;
  setPost: (postData: any) => void;
  setNumLike: (num: number) => void;
  setNumFavorite: (num: number) => void;
  setNumComment: (num: number) => void;
  incrementLike: () => void;
  decrementLike: () => void;
  incrementFavorite: () => void;
  decrementFavorite: () => void;
  incrementComment: () => void;
}

export const usePostStore = create<PostState>((set) => ({
  post: null,
  numLike: 0,
  numFavorite: 0,
  numComment: 0,
  setPost: (postData) => set({ post: postData, numLike: postData.numLike, numFavorite: postData.numFavorite, numComment: postData.numComment }),
  setNumLike: (num) => set({ numLike: num }),
  setNumFavorite: (num) => set({ numFavorite: num }),
  setNumComment: (num) => set({ numComment: num }),
  incrementLike: () => set((state) => ({ numLike: state.numLike + 1 })),
  decrementLike: () => set((state) => ({ numLike: state.numLike - 1 })),
  incrementFavorite: () => set((state) => ({ numFavorite: state.numFavorite + 1 })),
  decrementFavorite: () => set((state) => ({ numFavorite: state.numFavorite - 1 })),
  incrementComment: () => set((state) => ({ numComment: state.numComment + 1 })),
}));
