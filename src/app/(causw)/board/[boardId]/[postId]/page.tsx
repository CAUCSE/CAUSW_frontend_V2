'use client';

import { notFound } from 'next/navigation';

import { PostDetailSection } from '@/fsd_widgets/post';

import { useGetPostDetail } from '@/fsd_entities/post';

import { ChildCommentCard, CommentCard, CommentInput, LoadingComponent, PostCard } from '@/entities';
import { LoadingScreen, PreviousButton } from '@/fsd_shared';
import {
  useChildCommentStore,
  useCommentInteraction,
  useCommentStore,
  usePostDetail,
  usePostInteraction,
  usePostStore,
} from '@/shared';

const PostDetailPage = (props: any) => {
  const postId = props.params.postId;

  const { data: postDetail, isLoading: isPostDetailLoading } = useGetPostDetail({ postId });

  const commentList = usePostStore((state) => state.commentList);

  const comments = useCommentStore((state) => state.comments);
  const childComments = useChildCommentStore((state) => state.childComments);

  const { loading } = usePostDetail(postId);

  const { routerCallback } = usePostInteraction();

  const {
    handleCommentLike,
    handleChildCommentLike,
    handleAddComment,
    handleDeleteComment,
    handleDeleteChildComment,
    toggleCommentPopupMenu,
    toggleChildCommentPopupMenu,
  } = useCommentInteraction();

  if (loading || isPostDetailLoading) {
    return <LoadingScreen />;
  }

  if (!postDetail) {
    return notFound();
  }

  return (
    <div className="h-full w-full">
      <PreviousButton routeCallback={routerCallback} />
      <div className="flex w-full flex-col space-y-3 overflow-y-auto p-3">
        <PostDetailSection postData={postDetail} />
        <div className="sm:pl-3">
          <div className="pl-4 sm:pt-3">
            {commentList.map((comment) => {
              const commentData = comments[comment.id] || {
                numLike: 0,
                isCommentPopupVisible: false,
                isOwner: false,
                isDeleted: false,
                overlayActive: false,
                childCommentList: [],
              };
              return (
                <div key={comment.id}>
                  <CommentCard
                    comment={comment}
                    numLike={commentData.numLike}
                    overlayActive={commentData.overlayActive}
                    isDeleted={commentData.isDeleted}
                    isPopupVisible={commentData.isCommentPopupVisible}
                    handleCommentToggle={() => toggleCommentPopupMenu(comment.id)}
                    handleCommentLike={() => handleCommentLike(comment.id)}
                    handleDeleteComment={() => handleDeleteComment(comment.id)}
                  />
                  {commentData.childCommentList.map((childComment, idx) => (
                    <ChildCommentCard
                      key={childComment.id}
                      childComment={childComment}
                      numLike={childComments[childComment.id].numLike}
                      isDeleted={childComments[childComment.id].isDeleted}
                      isPopupVisible={childComments[childComment.id].isCommentPopupVisible}
                      handleChildCommentLike={() => handleChildCommentLike(childComment.id)}
                      handleChildCommentToggle={() => toggleChildCommentPopupMenu(childComment.id)}
                      handleDeleteChildComment={() => handleDeleteChildComment(childComment.id)}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center py-2">
          <CommentInput handleAddComment={handleAddComment} />
        </div>
      </div>
    </div>
  );
};
export default PostDetailPage;
