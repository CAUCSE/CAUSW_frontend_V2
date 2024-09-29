"use client"
import { useEffect } from 'react';
import { useVoteStore, usePostStore, useCommentStore, useChildCommentStore, PostRscService } from '@/shared';

export const usePostDetail = (postId: string) => {
  const { setPost, setPostComment } = usePostStore();
  const {setComments} = useCommentStore();
  const {setChildCommentLikes} = useChildCommentStore();
  const { getPostById } = PostRscService();
  const { setVote } = useVoteStore();
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
        //console.log(`isOwner????// ${postData.isOwner}`)
        postData.updatedAt = getTimeDifference(postData.updatedAt)
        setPost(postData);  // post와 numLikes를 상태로 설정
        setPostComment();
        postData.commentList.content.forEach((comment: Comment.CommentDto)=>{
          setComments(comment.id, comment.childCommentList, comment.numLike);
          comment.childCommentList.forEach((childComment: any) => {
            setChildCommentLikes(childComment.id, childComment.numLike);  // 각 대댓글의 좋아요 수 설정
          });
        });
        if (postData.isPostVote){
          setVote(postData.voteResponseDto!);
        }
        
      } catch (error) {
        console.error('게시물 불러오기 실패: ', error);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, setPost, setComments, setVote]);
};
