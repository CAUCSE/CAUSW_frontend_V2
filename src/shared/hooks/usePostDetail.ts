"use client"
import { useEffect } from 'react';
import { usePostStore } from '@/shared/hooks/stores/usePostStore';
import { PostRscService } from "@/shared";

export const usePostDetail = (postId: string) => {
  const { setPost } = usePostStore();
  const { getPostById } = PostRscService();

  const getTimeDifference = (ISOtime: string) => {
    const createdTime = new Date(ISOtime);
    const now = new Date();
    const diffMSec = now.getTime() - createdTime.getTime();
    const diffMin = Math.round(diffMSec / (60 * 1000));
    if (diffMin === 0) {
      return `방금 전`;
    } else if (diffMin < 60) {
      return `${diffMin}분 전`;
    } else if (
      now.getFullYear() === createdTime.getFullYear() &&
      now.getMonth() === createdTime.getMonth() &&
      now.getDate() === createdTime.getDate()
    ) {
      return `${createdTime.getHours()}:${createdTime.getMinutes()}`;
    } else if (now.getFullYear() === createdTime.getFullYear()) {
      return `${createdTime.getMonth() + 1}/${createdTime.getDate()}`;
    } else {
      return `${now.getFullYear() - createdTime.getFullYear()}년 전`;
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(postId);
        postData.updatedAt = getTimeDifference(postData.updatedAt)
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
