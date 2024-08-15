import { PostCard, CommentCard, ChildCommentCard, CommentInput } from "@/entities";


const BoardDetailPage = async () => {
  return (
    <div className="relative min-h-screen pb-20">
      <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl h-full">
        <div className="flex flex-col item-start">
          {/* 투표 처리나 이런 건 어떻게 해야할라나 */}
          <PostCard 
            username={"홍석천"} 
            timeAgo={"30분 전"} 
            hashtags={["시험","노잼","방학"]} 
            content={"나랑 술 먹을 사람 구함 ~ 또는 코딩 같이 할 사람~~~\n오호랏"} 
            likes={10} 
            stars={20} 
            comments={30}        
          />
          {/* 이거 comment props list로 받아서 랜더링 진행함 */}
          <CommentCard 
            username={"이은화"} 
            comment={"나~~~~"} 
            likes={20} 
            dislikes={0}                       
          />
          <ChildCommentCard 
            username={"이은화"} 
            comment={"나~~~~"} 
            likes={20} 
            dislikes={0}                       
          />
        </div>
        <CommentInput/>
      </div>
    </div>
  );
};

export default BoardDetailPage;
