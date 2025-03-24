"use client";

import {
  PostRscService,
  useChildCommentStore,
  useCommentStore,
  usePostStore,
  useVoteStore,
} from "@/shared";
import { useEffect, useState } from "react";

import { getTimeDifference } from "@/utils/format";

export const usePostDetail = (postId: string) => {
  const { setPost, setPostComment } = usePostStore();
  const { setComments } = useCommentStore();
  const { setChildComment } = useChildCommentStore();
  const { getPostById } = PostRscService();
  const { setVote } = useVoteStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postData = await getPostById(postId);
        postData.updatedAt = getTimeDifference(postData.updatedAt);
        setPost(postData);
        setPostComment();
        postData.commentList.content.forEach((comment: Comment.CommentDto) => {
          setComments(
            comment.id,
            false,
            comment.isOwner,
            comment.isDeleted,
            comment.childCommentList,
            comment.numLike,
            getTimeDifference(comment.createdAt),
          );
          comment.childCommentList.forEach((childComment: any) => {
            setChildComment(
              childComment.id,
              childComment.numLike,
              false,
              childComment.isOwner,
              childComment.isDeleted,
              getTimeDifference(childComment.createdAt),
            ); // 각 대댓글의 좋아요 수 설정
          });
        });
        if (postData.isPostVote) {
          setVote(postData.voteResponseDto!);
        }
      } catch (error) {
        console.error("게시물 불러오기 실패: ", error);
      } finally {
        setLoading(false); // 데이터 가져온 후 로딩 끝
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, setPost, setComments, setVote]);

  return { loading };
};
