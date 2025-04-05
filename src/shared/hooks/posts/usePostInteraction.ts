'use client';

import { useParams, useRouter } from 'next/navigation';

import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { PostRscService, usePostStore, useUserStore } from '@/shared';

export const usePostInteraction = () => {
  const params = useParams();
  const { boardId, postId } = params;
  const router = useRouter();

  const { post, incrementLike, incrementFavorite, togglePostPopup } = usePostStore();

  const { postLikeForPost, deletePost, postFavorite } = PostRscService();

  const { isPresidents, isAdmin, isVicePresidents } = useUserStore(
    useShallow(state => ({
      isPresidents: state.isPresidents,
      isAdmin: state.isAdmin,
      isVicePresidents: state.isVicePresidents,
    })),
  );

  const handlePostLike = async () => {
    try {
      await postLikeForPost(postId as string);
      incrementLike();
    } catch (error) {
      //decrementLike();
      toast.error('이미 좋아요를 누른 게시글입니다.');
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(postId as string);
      router.back();
    } catch (error) {
      toast.error('게시글 삭제에 실패했습니다.');
    }
  };

  const handlePostFavorite = async () => {
    try {
      await postFavorite(postId as string);
      incrementFavorite();
    } catch (error) {
      //decrementFavorite();
      toast.error('이미 즐겨찾기를 누른 게시글입니다.');
    }
  };

  const togglePostPopupMenu = () => {
    if (post?.isOwner || isAdmin() || isPresidents() || isVicePresidents()) {
      togglePostPopup();
    }
  };

  const routerCallback = () => {
    if (boardId === 'my' || boardId === 'search') {
      router.back();
      return;
    }
    router.replace(`/board/${boardId}`);
  };

  return {
    handlePostLike,
    handleDeletePost,
    handlePostFavorite,
    togglePostPopupMenu,
    routerCallback,
  };
};
