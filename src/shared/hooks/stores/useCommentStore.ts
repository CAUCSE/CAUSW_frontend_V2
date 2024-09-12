import { create } from 'zustand';

interface CommentState {
  comments: { [id: string]: {numLike: number}};
  setCommentLikes:(id:string, numLike: number) => void;
  incrementCommentLike: (id: string) => void;
  decrementCommentLike: (id: string) => void;
}

export const useCommentStore = create<CommentState>((set)=>({
  comments: {},
  setCommentLikes: (id, numLike) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: { numLike },
      },
    })),
  incrementCommentLike: (id) => 
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: {
          numLike: state.comments[id].numLike + 1,
        }
      }
    })),
    decrementCommentLike: (id) => 
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: {
          numLike: state.comments[id].numLike - 1,
        }
      }
    })),
}))