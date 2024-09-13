import { create } from 'zustand';

interface CommentState {
  comments: { [id: string]: {numLike: number, overlayActive: boolean}};
  setCommentLikes:(id:string, numLike: number) => void;
  incrementCommentLike: (id: string) => void;
  decrementCommentLike: (id: string) => void;
  toggleCommentOverlay: (id: string) => void;
  clearAllOverlays: () => void;
}

export const useCommentStore = create<CommentState>((set)=>({
  comments: {},
  setCommentLikes: (id, numLike) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: { numLike, overlayActive: false },
      },
    })),
  incrementCommentLike: (id) => 
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: {
          numLike: state.comments[id].numLike + 1,
          overlayActive: state.comments[id].overlayActive,
        }
      }
    })),
    decrementCommentLike: (id) => 
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: {
          numLike: state.comments[id].numLike - 1,
          overlayActive: state.comments[id].overlayActive,
        }
      }
    })),
    toggleCommentOverlay: (id) =>
    set((state) => {
      const updatedComments = Object.keys(state.comments).reduce((acc, commentId) => {
        acc[commentId] = {
          ...state.comments[commentId],
          overlayActive: commentId === id ? !state.comments[commentId].overlayActive : false,
        };
        return acc;
      }, {} as CommentState["comments"]);

      return { comments: updatedComments };
    }),
  clearAllOverlays: () =>
    set((state) => {
      const updatedComments = Object.keys(state.comments).reduce((acc, commentId) => {
        acc[commentId] = {
          ...state.comments[commentId],
          overlayActive: false,
        };
        return acc;
      }, {} as CommentState["comments"]);

      return { comments: updatedComments };
    }),
}))