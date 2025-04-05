'use client';

import { useParams } from 'next/navigation';

import toast from 'react-hot-toast';

import {
  ChildCommentRscService,
  CommentRscService,
  useChildCommentStore,
  useCommentStore,
  usePostStore,
} from '@/shared';
import { getTimeDifference } from '@/utils/format';

export const useCommentInteraction = () => {
  const params = useParams();
  const { postId } = params;
  const { createCommentInfo, incrementComment, decrementComment, addComment, setPostComment } = usePostStore();

  const {
    comments,
    incrementCommentLike,
    clearAllOverlays,
    addChildComment,
    setComments,
    deleteComment,
    toggleCommentPopup,
  } = useCommentStore();

  const { childComments, setChildComment, incrementChildCommentLike, deleteChildComment, toggleChildCommentPopup } =
    useChildCommentStore();

  const { postLikeForComment, createComment } = CommentRscService();
  const { postLikeForChildComment, createChildComment } = ChildCommentRscService();

  const changeToPostComment = () => {
    setPostComment();
    clearAllOverlays();
  };

  const handleCommentLike = async (commentId: string) => {
    try {
      await postLikeForComment(commentId);
      incrementCommentLike(commentId);
    } catch (error) {
      //decrementCommentLike(commentId);
      toast.error('이미 좋아요를 누른 댓글입니다.');
    }
  };

  const handleChildCommentLike = async (childCommentId: string) => {
    try {
      await postLikeForChildComment(childCommentId);
      incrementChildCommentLike(childCommentId);
    } catch (error) {
      //decrementChildCommentLike(childCommentId);
      toast.error('이미 좋아요를 누른 댓글입니다.');
    }
  };

  const handleAddComment = async (newCommentContent: string, isAnonymous: boolean) => {
    if (!createCommentInfo.isChildComment) {
      const createCommentData: Comment.CreateCommentDto = {
        content: newCommentContent,
        postId: postId as string,
        isAnonymous: isAnonymous,
      };
      try {
        const createCommentResponse = await createComment(createCommentData);
        addComment(createCommentResponse);
        setComments(createCommentResponse.id, false, true, false, [], 0, getTimeDifference(Date()));
        incrementComment();
      } catch (error) {
        toast.error('댓글 작성에 실패했습니다.');
        decrementComment();
      }
    } else {
      const createChildCommentData: ChildComment.CreateChildCommentDto = {
        content: newCommentContent,
        isAnonymous: isAnonymous,
        parentCommentId: createCommentInfo.commentId!,
      };
      try {
        const createChildCommentResponse = await createChildComment(createChildCommentData);
        addChildComment(createCommentInfo.commentId!, createChildCommentResponse);
        setChildComment(createChildCommentResponse.id, 0, false, true, false, getTimeDifference(Date()));
        incrementComment();
      } catch (error) {
        decrementComment();
        toast.error('대댓글 작성에 실패했습니다.');
      }
    }
    changeToPostComment();
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await CommentRscService().deleteCommentById(commentId);
      deleteComment(commentId);
    } catch (error) {
      toast.error('댓글 삭제에 실패했습니다.');
    }
  };

  const handleDeleteChildComment = async (childCommentId: string) => {
    try {
      await ChildCommentRscService().deleteChildComment(childCommentId);
      deleteChildComment(childCommentId);
    } catch (error) {
      toast.error('대댓글 삭제에 실패했습니다.');
    }
  };

  const toggleCommentPopupMenu = (commentId: string) => {
    if (comments[commentId].isOwner && !comments[commentId].isDeleted) {
      toggleCommentPopup(commentId);
    }
  };

  const toggleChildCommentPopupMenu = (childCommentId: string) => {
    if (childComments[childCommentId].isOwner && !childComments[childCommentId].isDeleted) {
      toggleChildCommentPopup(childCommentId);
    }
  };

  return {
    handleCommentLike,
    handleChildCommentLike,
    handleAddComment,
    handleDeleteComment,
    handleDeleteChildComment,
    toggleCommentPopupMenu,
    toggleChildCommentPopupMenu,
    changeToPostComment,
  };
};
