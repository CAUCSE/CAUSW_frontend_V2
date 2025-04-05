import { create } from 'zustand';

interface ChildCommentStore {
  childComments: {
    [id: string]: {
      numLike: number;
      isCommentPopupVisible: boolean;
      isOwner: boolean;
      isDeleted: boolean;
      createdAt: string;
    };
  }; // 대댓글 ID별로 좋아요 수 관리
  setChildComment: (
    id: string,
    numLike: number,
    isCommentPopupVisible: boolean,
    isOwner: boolean,
    isDeleted: boolean,
    createdAt: string,
  ) => void;
  incrementChildCommentLike: (id: string) => void;
  decrementChildCommentLike: (id: string) => void;
  toggleChildCommentPopup: (id: string) => void;
  deleteChildComment: (id: string) => void;
}

export const useChildCommentStore = create<ChildCommentStore>(set => ({
  childComments: {},

  setChildComment: (id, numLike, isCommentPopupVisible, isOwner, isDeleted, createdAt) =>
    set(state => ({
      childComments: {
        ...state.childComments,
        [id]: { numLike, isCommentPopupVisible, isOwner, isDeleted, createdAt },
      },
    })),
  incrementChildCommentLike: id =>
    set(state => ({
      childComments: {
        ...state.childComments,
        [id]: {
          numLike: state.childComments[id].numLike + 1 || 1,
          isCommentPopupVisible: state.childComments[id].isCommentPopupVisible,
          isOwner: state.childComments[id].isOwner,
          isDeleted: state.childComments[id].isDeleted,
          createdAt: state.childComments[id].createdAt,
        },
      },
    })),
  decrementChildCommentLike: id =>
    set(state => ({
      childComments: {
        ...state.childComments,
        [id]: {
          numLike: state.childComments[id].numLike - 1 || 1,
          isCommentPopupVisible: state.childComments[id].isCommentPopupVisible,
          isOwner: state.childComments[id].isOwner,
          isDeleted: state.childComments[id].isDeleted,
          createdAt: state.childComments[id].createdAt,
        },
      },
    })),
  toggleChildCommentPopup: id =>
    set(state => ({
      childComments: {
        ...state.childComments,
        [id]: {
          numLike: state.childComments[id].numLike,
          isCommentPopupVisible: !state.childComments[id].isCommentPopupVisible,
          isOwner: state.childComments[id].isOwner,
          isDeleted: state.childComments[id].isDeleted,
          createdAt: state.childComments[id].createdAt,
        },
      },
    })),
  deleteChildComment: id =>
    set(state => ({
      childComments: {
        ...state.childComments,
        [id]: {
          numLike: state.childComments[id].numLike,
          isCommentPopupVisible: false,
          isOwner: state.childComments[id].isOwner,
          isDeleted: true,
          createdAt: state.childComments[id].createdAt,
        },
      },
    })),
}));
