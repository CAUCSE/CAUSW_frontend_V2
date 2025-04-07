import { create } from 'zustand';

interface PostState {
  isPopupVisible: boolean;
  post: Post.PostDto | null;
  numLike: number;
  numFavorite: number;
  numComment: number;
  commentList: Array<Comment.CommentDto>;
  createCommentInfo: { isChildComment: boolean; commentId: string | null };
  isPostForm: boolean;
  formId: string;
  setPost: (postData: any) => void;
  setNumLike: (num: number) => void;
  setNumFavorite: (num: number) => void;
  setNumComment: (num: number) => void;
  setIsPostForm: (state: boolean) => void;
  setCommentList: (comments: Array<Comment.CommentDto>) => void;
  incrementLike: () => void;
  decrementLike: () => void;
  incrementFavorite: () => void;
  decrementFavorite: () => void;
  incrementComment: () => void;
  addComment: (comment: Comment.CommentDto) => void;
  setPostComment: () => void;
  setCommentInfo: (commentId: string) => void;
  decrementComment: () => void;
  togglePostPopup: () => void;
}

export const usePostStore = create<PostState>(set => ({
  isPopupVisible: false,
  post: null,
  numLike: 0,
  numFavorite: 0,
  numComment: 0,
  commentList: [],
  createCommentInfo: { isChildComment: false, commentId: null },
  isPostForm: false,
  formId: '',
  setPost: postData =>
    set({
      isPopupVisible: false,
      post: postData,
      numLike: postData.numLike,
      numFavorite: postData.numFavorite,
      numComment: postData.numComment,
      commentList: postData.commentList.content ?? [],
      isPostForm: postData.isPostForm,
      formId: postData.formResponseDto ? postData.formResponseDto.formId : '',
    }),
  setNumLike: num => set({ numLike: num }),
  setNumFavorite: num => set({ numFavorite: num }),
  setNumComment: num => set({ numComment: num }),
  setIsPostForm: state => set({ isPostForm: state }),
  setCommentList: comments => set({ commentList: comments }),
  incrementLike: () => set(state => ({ numLike: state.numLike + 1 })),
  decrementLike: () => set(state => ({ numLike: state.numLike - 1 })),
  incrementFavorite: () => set(state => ({ numFavorite: state.numFavorite + 1 })),
  decrementFavorite: () => set(state => ({ numFavorite: state.numFavorite - 1 })),
  incrementComment: () => set(state => ({ numComment: state.numComment + 1 })),
  addComment: newComment => set(state => ({ commentList: [...state.commentList, newComment] })),
  setPostComment: () =>
    set(() => ({
      createCommentInfo: { isChildComment: false, commentId: null },
    })),
  setCommentInfo: commentId =>
    set(() => ({
      createCommentInfo: { isChildComment: true, commentId: commentId },
    })),
  decrementComment: () => set(state => ({ numComment: state.numComment - 1 })),
  togglePostPopup: () => set(state => ({ isPopupVisible: !state.isPopupVisible })),
}));
