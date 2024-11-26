import { create } from 'zustand';

interface CommentState {
  comments: { [id: string]: {numLike: number, isCommentPopupVisible:boolean, isOwner: boolean, isDeleted: boolean, childCommentList: Array<ChildComment.ChildCommentDto>, overlayActive: boolean, createdAt: string}};
  setComments:(id:string, isOwner: boolean, isCommentPopupVisible:boolean, isDeleted:boolean, childCommentList: Array<ChildComment.ChildCommentDto>, numLike: number, createdAt: string) => void;
  incrementCommentLike: (id: string) => void;
  decrementCommentLike: (id: string) => void;
  addChildComment: (id:string, newChildComment:ChildComment.ChildCommentDto) => void;
  toggleCommentOverlay: (id: string) => void;
  clearAllOverlays: () => void;
  deleteComment: (id: string) => void;
  toggleCommentPopup: (id:string) => void;
}

export const useCommentStore = create<CommentState>((set)=>({
  comments: {},
  childCommentList: [],
  setComments: (id,isCommentPopupVisible, isOwner, isDeleted, childCommentList, numLike, createdAt) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: { numLike, isCommentPopupVisible, isOwner, isDeleted, childCommentList, overlayActive: false, createdAt },
      },
    })),
  addChildComment: (id, newChildComment) => 
    set((state) => ({ 
      comments: {
        ...state.comments,
        [id]: {
          numLike: state.comments[id].numLike,
          isCommentPopupVisible: false,
          isOwner: true, 
          isDeleted: false,
          childCommentList: [...state.comments[id].childCommentList, newChildComment],
          overlayActive: state.comments[id].overlayActive,
          createdAt: state.comments[id].createdAt
        }
      }
    })),
  incrementCommentLike: (id) => 
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: {
          numLike: state.comments[id].numLike + 1,
          isCommentPopupVisible: false,
          isOwner: state.comments[id].isOwner, 
          isDeleted: state.comments[id].isDeleted,
          childCommentList: state.comments[id].childCommentList,
          overlayActive: state.comments[id].overlayActive,
          createdAt: state.comments[id].createdAt
        }
      }
    })),
  decrementCommentLike: (id) => 
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: {
          numLike: state.comments[id].numLike - 1,
          isCommentPopupVisible: false,
          isOwner: state.comments[id].isOwner, 
          isDeleted: state.comments[id].isDeleted,
          childCommentList: state.comments[id].childCommentList,
          overlayActive: state.comments[id].overlayActive,
          createdAt: state.comments[id].createdAt
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
  deleteComment: (id) => 
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: {
          numLike: state.comments[id].numLike,
          isCommentPopupVisible: false,
          isOwner: state.comments[id].isOwner, 
          isDeleted: true,
          childCommentList: state.comments[id].childCommentList,
          overlayActive: state.comments[id].overlayActive,
          createdAt: state.comments[id].createdAt
        }
      }
    })),
  toggleCommentPopup: (id) => 
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: {
          numLike: state.comments[id].numLike,
          isCommentPopupVisible: !state.comments[id].isCommentPopupVisible,
          isOwner: state.comments[id].isOwner, 
          isDeleted: state.comments[id].isDeleted,
          childCommentList: state.comments[id].childCommentList,
          overlayActive: state.comments[id].overlayActive,
          createdAt: state.comments[id].createdAt
        }
      }
    })),
}))