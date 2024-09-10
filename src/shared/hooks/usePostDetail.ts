"use client"
import { useEffect } from 'react';
import { usePostStore } from '@/shared/hooks/stores/usePostStore';
import { PostRscService } from "@/shared";

export const usePostDetail = (postId: string) => {
  const { setPost } = usePostStore();
  const { getPostById } = PostRscService();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(postId);
        setPost(postData);  // post와 numLikes를 상태로 설정
      } catch (error) {
        console.error('게시물 불러오기 실패: ', error);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, setPost]);
};
