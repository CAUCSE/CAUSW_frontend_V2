import { create } from 'zustand';

interface CommentState {
  comments: { [id: string]: {numLike: number, childCommentList: Array<ChildComment.ChildCommentDto>, overlayActive: boolean}};
  setComments:(id:string, childCommentList: Array<ChildComment.ChildCommentDto>, numLike: number) => void;
  incrementCommentLike: (id: string) => void;
  decrementCommentLike: (id: string) => void;
  addChildComment: (id:string, newChildComment:ChildComment.ChildCommentDto) => void;
  toggleCommentOverlay: (id: string) => void;
  clearAllOverlays: () => void;
}

export const useCommentStore = create<CommentState>((set)=>({
  comments: {},
  childCommentList: [],
  setComments: (id, childCommentList, numLike) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: { numLike, childCommentList, overlayActive: false },
      },
    })),
  addChildComment: (id, newChildComment) => 
    set((state) => ({ 
      comments: {
        ...state.comments,
        [id]: {
          numLike: state.comments[id].numLike,
          childCommentList: [...state.comments[id].childCommentList, newChildComment],
          overlayActive: state.comments[id].overlayActive,
        }
      }
    })),
  incrementCommentLike: (id) => 
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: {
          numLike: state.comments[id].numLike + 1,
          childCommentList: state.comments[id].childCommentList,
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
                    childCommentList: state.comments[id].childCommentList,
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