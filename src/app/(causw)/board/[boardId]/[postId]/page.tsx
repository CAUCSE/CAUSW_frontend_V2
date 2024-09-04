import {
  PostCard,
  CommentCard,
  ChildCommentCard,
  CommentInput,
} from "@/entities";
import { PreviousButton, PostRscService } from "@/shared";

interface ChildCommentProps {
  writerName:string;
  content: string;
}
interface CommentProps {
  writerName:string;
  content: string;
  childCommentList: Array<ChildCommentProps>;
}
interface PostProps {
  writerName: string;
  title: string;
  content: string;
  numLike: number;
  numStar: number;
  numComment: number;
  commentList: Array<CommentProps>;
}

const defaultChildCommentInfods: ChildCommentProps = 
{
  writerName: "은황ㄴㄹ",
  content: "nfkldsnkfds",
};

const defaultCommentInfos: CommentProps = 
{
  writerName:"dfdsfdsf",
  content:"gkdlgkdlsnglkdsnf",
  childCommentList: [
    defaultChildCommentInfods
  ],
}
const defaultPostInfos: PostProps = 
{
  writerName: "이은화",
  title: "술술술술",
  content: "안녕!!!",
  numLike: 5,
  numStar: 10,
  numComment: 2,
  commentList: [
    defaultCommentInfos,
    defaultCommentInfos,
  ],
};
const PostDetailPage = async (props: any) => {
  console.log(props.params.postId);

  const { getPostById } = PostRscService();
  if (typeof props.params.postId === "string") {
    try {
      const post = await getPostById(props.params.postId);
      console.log(post);
      return (
        <div className="absolute bottom-32 top-28 w-full overflow-y-auto bg-boardPageBackground scrollbar-hide md:bottom-10 md:left-40 md:right-72 md:top-0 md:w-auto">
          <div className="w-full flex-col items-center">
            <PreviousButton />
          </div>
          <div className="flex flex-col space-y-3 p-3 pt-10">
            <div className="sm:pl-3">
              <PostCard
                username={post.writerName}
                timeAgo={"30분 전"} // 시간 계산 로직 필요
                title={post.title}
                content={post.content}
                likes={post.numLike}
                stars={20} // 이 부분이 PostDto에 포함되지 않은 경우 계산이 필요
                comments={post.numComment}
              />
              <div className="pl-4 sm:pt-3">
                {post.commentList.map((comment, index) => (
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
      return (
        <div className="h-full w-full py-3 lg:pl-8">
          <div className="w-full flex-col items-center">
            <PreviousButton />
          </div>
          <div className="flex flex-col space-y-3 p-3 pt-10">
            <div className="md:pl-3">
              <PostCard
                username={defaultPostInfos.writerName}
                timeAgo={"30분 전"} // 시간 계산 로직 필요
                title={defaultPostInfos.title}
                content={defaultPostInfos.content}
                likes={defaultPostInfos.numLike}
                stars={20} // 이 부분이 PostDto에 포함되지 않은 경우 계산이 필요
                comments={defaultPostInfos.numComment}
              />
              <div className="pl-4 md:pt-3">
                {defaultPostInfos.commentList.map((comment, index) => (
                  <div key={index}>
                    <CommentCard
                      username={comment.writerName}
                      content={comment.content}
                      likes={20} // 좋아요 수는 PostDto에 따라 추가
                    />
                    {comment.childCommentList.map((childComment, idx: number) => (
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
            <div className="flex justify-center">
              <CommentInput />
            </div>
          </div>
        </div>
      );
    }
    
    
  } else {
    console.error("invalid");
    return; 
  }
};
export default PostDetailPage;