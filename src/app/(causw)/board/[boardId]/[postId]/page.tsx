"use client"
import {
  PostCard,
  CommentCard,
  ChildCommentCard,
  CommentInput,
} from "@/entities";
import { PreviousButton, PostRscService, usePostDetail, usePostStore } from "@/shared";

const PostDetailPage = (props: any) => {
  const postId = props.params.postId;

  const { post, numLike, numFavorite, numComment, incrementLike, decrementLike, incrementFavorite, decrementFavorite, incrementComment } = usePostStore();
  
  
  const handlePostLike = async () => {
    try {
      incrementLike();
      const createPostResponse = await PostRscService().postLikeForPost(postId);
      console.log('게시물 좋아요 완료: ', createPostResponse);
    } catch (error) {
      console.error('좋아요 처리 에러: ', error);
      decrementLike();
    }  
  };
  const handlePostFavorite = async () => {
    try {
      incrementFavorite();
      const createPostResponse = await PostRscService().postFavorite(postId);
      console.log('게시물 즐겨찾기 완료: ', createPostResponse);
    } catch (error) {
      console.error('즐겨찾기 처리 에러: ', error);
      decrementFavorite();
    }  
  };
  usePostDetail(postId);
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute w-full h-full overflow-y-auto bg-boardPageBackground scrollbar-hide">
      <div className="w-full flex-col items-center">
        <PreviousButton />
      </div>
      <div className="w-full flex flex-col space-y-3 p-3 pt-10">
        <div className="sm:pl-3">
          <PostCard 
            title={post.title} content={post.content}
            isDeleted={post.isDeleted}
            writerName={post.writerName} writerAdmissionYear={post.writerAdmissionYear} writerProfileImage={post.writerProfileImage} 
            numComment={numComment} handlePostComment={()=>{}} numLike={numLike} handlePostLike={handlePostLike} numFavorite={numFavorite} handlePostFavorite={handlePostFavorite}
            isAnonymous={post.isAnonymous} isQuestion={post.isQuestion}
            createdAt={post.createdAt} updatedAt={post.updatedAt}               />
          <div className="pl-4 sm:pt-3">
            {post.commentList.content.map((comment, index) => (
              <div key={index}>
                <CommentCard 
                  writerName={comment.writerName} writerAdmissionYear={comment.writerAdmissionYear} writerProfileImage={comment.writerProfileImage} 
                  content={comment.content} 
                  createdAt={comment.createdAt} updatedAt={comment.updatedAt} 
                  isDeleted={comment.isDeleted} isAnonymous={comment.isAnonymous} 
                  numLike={comment.numLike}                      
                />
                {comment.childCommentList.map((childComment, idx) => (
                  <ChildCommentCard key={idx} 
                  content={childComment.content} 
                  createdAt={childComment.createdAt} updatedAt={childComment.updatedAt} 
                  isDeleted={childComment.isDeleted} isAnonymous={childComment.isAnonymous}
                  writerName={childComment.writerName} writerAdmissionYear={childComment.writerAdmissionYear} writerProfileImage={childComment.writerProfileImage} 
                  updatable={childComment.updatable} deletable={childComment.deletable}  
                  numLike={childComment.numLike}                        
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center py-2">
          <CommentInput />
        </div>
      </div>
    </div>
  );
};
export default PostDetailPage;