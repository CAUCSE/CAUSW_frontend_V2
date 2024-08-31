import {
  PostCard,
  CommentCard,
  ChildCommentCard,
  CommentInput,
} from "@/entities";
import { PreviousButton, PostRscService } from "@/shared";

const PostDetailPage = async (props: any) => {
  return <></>;
  console.log(props.params.postId);

  const { getPostById } = PostRscService();
  if (typeof props.params.postId === "string") {
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
              hashtags={["시험", "노잼", "방학"]} // 필요한 경우 추가 데이터 사용
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
          <div className="flex justify-center py-2">
            <CommentInput />
          </div>
        </div>
      </div>
    );
  } else {
    console.error("invalid");
    return;
  }
};

/* export default PostDetailPage;

const PostDetailPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId"); // query 파라미터에서 postId 가져옴
  const { getPostById } = PostRscService();
  const [post, setPost] = useState<Post.PostDto | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof postId === "string") {
        const data = await getPostById(postId);
        setPost(data);
        console.log(data);
      } else {
        console.error("Invalid postId");
      }
    };

    fetchData();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  
};
 */
export default PostDetailPage;

/* return (
      <div className="absolute bottom-32 top-28 w-full overflow-y-auto bg-boardPageBackground scrollbar-hide md:bottom-10 md:left-40 md:right-72 md:top-0 md:w-auto">
        <div className="w-full flex-col items-center">
          <PreviousButton/>
        </div>
        <div className="flex flex-col space-y-3t p-3 pt-10">
          <div className="sm:pl-3">

            <PostCard 
              username={"홍석천"} 
              timeAgo={"30분 전"} 
              hashtags={["시험","노잼","방학"]} 
              content={"나랑 술 먹을 사람 구함 ~ 또는 코딩 같이 할 사람~~~\n오호랏"} 
              likes={10} 
              stars={20} 
              comments={30}        
            />
            <div className="sm:pt-3 pl-4">
              
              <CommentCard 
                username={"이은화"} 
                content={"나~~~~"} 
                likes={20}                  
              />
              <ChildCommentCard 
                username={"이은화"} 
                content={"나~~~~"} 
                likes={20}              
              />
              <ChildCommentCard 
                username={"이은화"} 
                content={"나~~~~"} 
                likes={20}              
              />
              <ChildCommentCard 
                username={"이은화"} 
                content={"나~~~~"} 
                likes={20}              
              />
              <ChildCommentCard 
                username={"이은화"} 
                content={"나~~~~"} 
                likes={20}              
              />
              <CommentCard 
                username={"이은화"} 
                content={"나~~~~"} 
                likes={20}                  
              />
              <CommentCard 
                username={"이은화"} 
                content={"나~~~~"} 
                likes={20}                  
              />
              <ChildCommentCard 
                username={"이은화"} 
                content={"나~~~~"} 
                likes={20}              
              />
              <ChildCommentCard 
                username={"이은화"} 
                content={"나~~~~"} 
                likes={20}              
              />
            </div>
          </div>
          <div className="flex justify-center py-2">
            <CommentInput/>
          </div>
        </div>
      </div>
    ); */
