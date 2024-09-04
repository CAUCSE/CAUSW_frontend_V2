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
        <div className="absolute top-3 w-full h-full overflow-y-auto bg-boardPageBackground scrollbar-hide md:bottom-10">
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
                      username={comment.writerName}
                      content={comment.content}
                      likes={20} // 좋아요 수는 PostDto에 따라 추가
                    />
                    {comment.childCommentList.map((childComment: { writerName: string; content: string; }, idx: number) => (
                      <ChildCommentCard
                        key={idx}
                        username={childComment.writerName}
                        content={childComment.content}
                        likes={20} // 좋아요 수는 PostDto에 따라 추가
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
      // return; (
      //   <div className="h-full w-full py-3 lg:pl-8">
      //     <div className="w-full flex-col items-center">
      //       <PreviousButton />
      //     </div>
      //     <div className="flex flex-col space-y-3 p-3 pt-10">
      //       <div className="md:pl-3">
      //         <PostCard
      //           username={defaultPostInfos.writerName}
      //           timeAgo={"30분 전"} // 시간 계산 로직 필요
      //           title={defaultPostInfos.title}
      //           content={defaultPostInfos.content}
      //           likes={defaultPostInfos.numLike}
      //           stars={20} // 이 부분이 PostDto에 포함되지 않은 경우 계산이 필요
      //           comments={defaultPostInfos.numComment}
      //           hasVote={true}
      //         />
      //         <div className="pl-4 md:pt-3">
      //           {defaultPostInfos.commentList.map((comment, index) => (
      //             <div key={index}>
      //               <CommentCard
      //                 username={comment.writerName}
      //                 content={comment.content}
      //                 likes={20} // 좋아요 수는 PostDto에 따라 추가
      //               />
      //               {comment.childCommentList.map((childComment, idx: number) => (
      //                 <ChildCommentCard
      //                   key={idx}
      //                   username={childComment.writerName}
      //                   content={childComment.content}
      //                   likes={20} // 좋아요 수는 PostDto에 따라 추가
      //                 />
      //               ))}
      //             </div>
      //           ))}
      //         </div>
      //       </div>
      //       <div className="flex justify-center">
      //         <CommentInput />
      //       </div>
      //     </div>
      //   </div>
      // );
    }
  } else {
    console.error("invalid");
    return; 
  }
};
export default PostDetailPage;