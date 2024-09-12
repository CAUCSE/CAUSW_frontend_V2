import create from 'zustand';

interface ChildCommentStore {
  childComments: { [id: string]: { numLike: number } };  // 대댓글 ID별로 좋아요 수 관리
  setChildCommentLikes: (id: string, numLike: number) => void;
  incrementChildCommentLike: (id: string) => void;
  decrementChildCommentLike: (id: string) => void;
}

export const useChildCommentStore = create<ChildCommentStore>((set) => ({
  childComments: {},

  setChildCommentLikes: (id, numLike) =>
    set((state) => ({
      childComments: {
        ...state.childComments,
        [id]: { numLike },
      },
    })),
  incrementChildCommentLike: (id) =>
    set((state) => ({
      childComments: {
        ...state.childComments,
        [id]: {
          numLike: state.childComments[id].numLike + 1 || 1,  // 기본값 1
        },
      },
    })),
    decrementChildCommentLike: (id) =>
    set((state) => ({
      childComments: {
        ...state.childComments,
        [id]: {
          numLike: state.childComments[id].numLike - 1 || 1,  // 기본값 1
        },
      },
    })),
}));
