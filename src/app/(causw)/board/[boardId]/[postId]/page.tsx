import {
  PostCard,
  CommentCard,
  ChildCommentCard,
  CommentInput,
} from "@/entities";
import { PreviousButton, PostRscService } from "@/shared";

const PostDetailPage = async (props: any) => {
  console.log(props.params.postId);

  const { getPostById } = PostRscService();
  if (typeof props.params.postId === "string") {
    try {
      const post = await getPostById(props.params.postId);
      console.log(post);
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
                numComment={post.numComment} numLike={post.numLike} numFavorite={post.numFavorite}
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
    }catch {
      console.error("invalid");
      return; 
    }
  } else {
    console.error("invalid");
    return; 
  }
};
export default PostDetailPage;