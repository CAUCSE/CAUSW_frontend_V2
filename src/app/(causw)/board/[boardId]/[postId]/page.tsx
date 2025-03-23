"use client";

import {
  ChildCommentCard,
  CommentCard,
  CommentInput,
  LoadingComponent,
  PostCard,
} from "@/_deprecated/entities";
import {
  PreviousButton,
  useChildCommentStore,
  useCommentInteraction,
  useCommentStore,
  usePostDetail,
  usePostInteraction,
  usePostStore,
  useUserStore,
} from "@/shared";

import { notFound } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

const PostDetailPage = (props: any) => {
  const postId = props.params.postId;

  const {
    isPopupVisible,
    post,
    numLike,
    numFavorite,
    numComment,
    isPostForm,
    formId,
    commentList,
  } = usePostStore(
    useShallow((state) => ({
      isPopupVisible: state.isPopupVisible,
      post: state.post,
      numLike: state.numLike,
      numFavorite: state.numFavorite,
      numComment: state.numComment,
      isPostForm: state.isPostForm,
      formId: state.formId,
      commentList: state.commentList,
    })),
  );

  const comments = useCommentStore((state) => state.comments);
  const childComments = useChildCommentStore((state) => state.childComments);

  const { loading } = usePostDetail(postId);

  const {
    handlePostLike,
    handleDeletePost,
    handlePostFavorite,
    togglePostPopupMenu,
    routerCallback,
  } = usePostInteraction();

  const {
    handleCommentLike,
    handleChildCommentLike,
    handleAddComment,
    handleDeleteComment,
    handleDeleteChildComment,
    toggleCommentPopupMenu,
    toggleChildCommentPopupMenu,
    changeToPostComment,
  } = useCommentInteraction();

  if (loading) {
    return <LoadingComponent />;
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="bottom-5 top-0 h-full w-full bg-boardPageBackground scrollbar-hide lg:relative">
      <div className="h-16 w-full bg-[#F8F8F8]">
        <PreviousButton routeCallback={routerCallback} />
      </div>
      <div className="flex h-[calc(100%-9rem)] w-full flex-col space-y-3 overflow-y-auto p-3">
        <div className="sm:pl-3">
          <PostCard
            postData={post!}
            numComment={numComment}
            numFavorite={numFavorite}
            numLike={numLike}
            isPostForm={isPostForm}
            formId={formId}
            handlePostFavorite={handlePostFavorite}
            handlePostLike={handlePostLike}
            handleCommentBtn={changeToPostComment}
            hasVote={true}
            options={["1등", "2등", "3등"]}
            handlePostDelete={handleDeletePost}
            toggleMenu={togglePostPopupMenu}
            isPopupVisible={isPopupVisible}
          />
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
                    handleCommentToggle={() =>
                      toggleCommentPopupMenu(comment.id)
                    }
                    handleCommentLike={() => handleCommentLike(comment.id)}
                    handleDeleteComment={() => handleDeleteComment(comment.id)}
                  />
                  {commentData.childCommentList.map((childComment, idx) => (
                    <ChildCommentCard
                      key={childComment.id}
                      childComment={childComment}
                      numLike={childComments[childComment.id].numLike}
                      isDeleted={childComments[childComment.id].isDeleted}
                      isPopupVisible={
                        childComments[childComment.id].isCommentPopupVisible
                      }
                      handleChildCommentLike={() =>
                        handleChildCommentLike(childComment.id)
                      }
                      handleChildCommentToggle={() =>
                        toggleChildCommentPopupMenu(childComment.id)
                      }
                      handleDeleteChildComment={() =>
                        handleDeleteChildComment(childComment.id)
                      }
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
