"use client";

import {
  ChildCommentCard,
  CommentCard,
  CommentInput,
  PostCard,
  LoadingComponent,
} from "@/entities";
import {
  ChildCommentRscService,
  CommentRscService,
  PostRscService,
  PreviousButton,
  useChildCommentStore,
  useCommentStore,
  usePopup,
  usePostDetail,
  usePostStore,
  VoteRscService,
  useVoteStore,
} from "@/shared";
import { useParams, useRouter } from "next/navigation";

const PostDetailPage = (props: any) => {
  const postId = props.params.postId;
  const router = useRouter();
  const params = useParams();
  const { boardId } = params;

  const { isVisible, message, showPopup } = usePopup(2000);
  const {
    isPopupVisible,
    post,
    numLike,
    numFavorite,
    numComment,
    isPostForm,
    formId,
    commentList,
    createCommentInfo,
    incrementComment,
    decrementComment,
    addComment,
    setPostComment,
    incrementLike,
    decrementLike,
    incrementFavorite,
    decrementFavorite,
    togglePostPopup,
  } = usePostStore();
  const {
    comments,
    incrementCommentLike,
    decrementCommentLike,
    clearAllOverlays,
    addChildComment,
    setComments,
    deleteComment,
    toggleCommentPopup,
  } = useCommentStore();
  const {
    childComments,
    setChildComment,
    incrementChildCommentLike,
    decrementChildCommentLike,
    deleteChildComment,
    toggleChildCommentPopup,
  } = useChildCommentStore();

  const { loading } = usePostDetail(postId);

  const changeToPostComment = () => {
    setPostComment();
    clearAllOverlays();
  };

  const handlePostLike = async () => {
    try {
      incrementLike();
      const createPostResponse = await PostRscService().postLikeForPost(postId);
      console.log("게시물 좋아요 완료: ", createPostResponse);
    } catch (error) {
      console.error("좋아요 처리 에러: ", error);
      decrementLike();
      showPopup("이미 좋아요를 누른 게시글입니다.");
    }
  };

  const handleDeletePost = async () => {
    try {
      const deletePostResponse = await PostRscService().deletePost(postId);
      router.back();
      console.log("게시물 삭제 완료: ", deletePostResponse);
    } catch (error) {
      console.error("게시글 삭제 처리 에러: ", error);
    }
  };

  const handleCommentLike = async (commentId: string) => {
    try {
      incrementCommentLike(commentId);
      const PostCommentLikeResponse =
        await CommentRscService().postLikeForComment(commentId);
      console.log("댓글 좋앙 완료:", PostCommentLikeResponse);
    } catch (error) {
      console.error("댓글 좋아요 처리 에러: ", error);
      decrementCommentLike(commentId);
      showPopup("이미 좋아요를 누른 댓글입니다.");
    }
  };

  const handleChildCommentLike = async (childCommentId: string) => {
    try {
      incrementChildCommentLike(childCommentId);
      const PostChildCommentLikeResponse =
        await ChildCommentRscService().postLikeForChildComment(childCommentId);
      console.log("대댓글 좋앙 완료:", PostChildCommentLikeResponse);
    } catch (error) {
      console.error("대댓글 좋아요 처리 에러: ", error);
      decrementChildCommentLike(childCommentId);
      showPopup("이미 좋아요를 누른 댓글입니다.");
    }
  };

  const handlePostFavorite = async () => {
    try {
      incrementFavorite();
      const createPostResponse = await PostRscService().postFavorite(postId);
      console.log("게시물 즐겨찾기 완료: ", createPostResponse);
    } catch (error) {
      console.error("즐겨찾기 처리 에러: ", error);
      decrementFavorite();
      showPopup("이미 즐겨찾기를 누른 게시글입니다.");
    }
  };

  const handleAddComment = async (
    newComentContent: string,
    isAnonymous: boolean,
  ) => {
    if (!createCommentInfo.isChildComment) {
      const createComment: Comment.CreateCommentDto = {
        content: newComentContent,
        postId: postId,
        isAnonymous: isAnonymous,
      };
      try {
        const createCommentResponse =
          await CommentRscService().createComment(createComment);
        console.log("게시물 댓글 완료: ", createCommentResponse);
        addComment(createCommentResponse);
        setComments(createCommentResponse.id, false, true, false, [], 0);
        incrementComment();
      } catch (error) {
        console.error("게시물 댓글 처리 에러: ", error);
        decrementComment();
      }
    } else {
      const createChildComment: ChildComment.CreateChildCommentDto = {
        content: newComentContent,
        isAnonymous: isAnonymous,
        parentCommentId: createCommentInfo.commentId!,
      };
      try {
        const createChildCommentResponse =
          await ChildCommentRscService().createChildComment(createChildComment);
        console.log("대댓글 완료: ", createChildCommentResponse);
        addChildComment(
          createCommentInfo.commentId!,
          createChildCommentResponse,
        );
        setChildComment(createChildCommentResponse.id, 0, false, true, false);
        incrementComment();
      } catch (error) {
        console.error("게시물 대댓글 처리 에러: ", error);
        decrementComment();
      }
    }
    changeToPostComment();
  };

  const togglePostPopupMenu = () => {
    if (post?.isOwner) {
      togglePostPopup();
    }
  };

  const toggleCommentPopupMenu = (commentId: string) => {
    if (comments[commentId].isOwner && !comments[commentId].isDeleted) {
      toggleCommentPopup(commentId);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const deleteCommentResponse =
        await CommentRscService().deleteCommentById(commentId);
      deleteComment(commentId);
      console.log("댓글 삭제 완료: ", deleteCommentResponse);
    } catch (error) {
      console.error("댓글 삭제 처리 에러: ", error);
    }
  };

  const toggleChildCommentPopupMenu = (childCommentId: string) => {
    if (
      childComments[childCommentId].isOwner &&
      !childComments[childCommentId].isDeleted
    ) {
      toggleChildCommentPopup(childCommentId);
    }
  };
  const handleDeleteChildComment = async (childCommentId: string) => {
    try {
      const deleteChildCommentResponse =
        await ChildCommentRscService().deleteChildComment(childCommentId);
      deleteChildComment(childCommentId);
      console.log("대댓글 삭제 완료: ", deleteChildCommentResponse);
    } catch (error) {
      console.error("대댓글 삭제 처리 에러: ", error);
    }
  };

  if (loading || !post) {
    return <LoadingComponent />;
  }

  return (
    <div className="bottom-5 top-0 h-full w-full bg-boardPageBackground scrollbar-hide lg:relative">
      {isVisible && (
        <div
          className={`duration-2000 fixed left-1/2 top-20 -translate-x-1/2 transform rounded-lg bg-red-600 p-4 text-white shadow-lg transition-opacity ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 9999 }}
        >
          {message}
        </div>
      )}
      <div className="h-16 w-full bg-[#F8F8F8]">
        <PreviousButton
          routeCallback={() =>
            router.replace(boardId === "my" ? "/setting" : `/board/${boardId}`)
          }
        />
      </div>
      <div className="flex h-[calc(100%-9rem)] w-full flex-col space-y-3 overflow-y-auto p-3">
        <div className="sm:pl-3">
          <PostCard
            postData={post}
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
