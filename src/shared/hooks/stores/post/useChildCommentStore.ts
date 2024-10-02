import { create } from 'zustand';

interface ChildCommentStore {
  childComments: { [id: string]: { numLike: number, isCommentPopupVisible:boolean, isOwner: boolean, isDeleted: boolean } };  // 대댓글 ID별로 좋아요 수 관리
  setChildComment: (id: string, numLike: number, isCommentPopupVisible:boolean, isOwner: boolean, isDeleted: boolean) => void;
  incrementChildCommentLike: (id: string) => void;
  decrementChildCommentLike: (id: string) => void;
  toggleChildCommentPopup: (id:string)=>void;
  deleteChildComment: (id:string)=>void;
}

export const useChildCommentStore = create<ChildCommentStore>((set) => ({
  childComments: {},

  setChildComment: (id, numLike, isCommentPopupVisible, isOwner, isDeleted) =>
    set((state) => ({
      childComments: {
        ...state.childComments,
        [id]: { numLike, isCommentPopupVisible, isOwner, isDeleted },
      },
    })),
  incrementChildCommentLike: (id) =>
    set((state) => ({
      childComments: {
        ...state.childComments,
        [id]: {
          numLike: state.childComments[id].numLike + 1 || 1,
          isCommentPopupVisible: state.childComments[id].isCommentPopupVisible,
          isOwner: state.childComments[id].isOwner,
          isDeleted: state.childComments[id].isDeleted
        },
      },
    })),
  decrementChildCommentLike: (id) =>
    set((state) => ({
      childComments: {
        ...state.childComments,
        [id]: {
          numLike: state.childComments[id].numLike - 1 || 1,
          isCommentPopupVisible: state.childComments[id].isCommentPopupVisible,
          isOwner: state.childComments[id].isOwner,
          isDeleted: state.childComments[id].isDeleted
        },
      },
    })),
  toggleChildCommentPopup: (id) =>
    set((state) => ({
      childComments: {
        ...state.childComments,
        [id]: {
          numLike: state.childComments[id].numLike,
          isCommentPopupVisible: !state.childComments[id].isCommentPopupVisible,
          isOwner: state.childComments[id].isOwner,
          isDeleted: state.childComments[id].isDeleted
        },
      },
    })),
  deleteChildComment: (id) =>
    set((state) => ({
      childComments: {
        ...state.childComments,
        [id]: {
          numLike: state.childComments[id].numLike,
          isCommentPopupVisible: false,
          isOwner: state.childComments[id].isOwner,
          isDeleted: true
        },
      },
    })),
}));
