import { PostCard, CommentCard, CommentInput } from "@/entities";


const BoardPage = async () => {
  return (
    <div className="relative min-h-screen pb-20">
      <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-lg h-full">
        <div className="flex flex-col item-start">
          <PostCard 
            username={"홍석천"} 
            timeAgo={"30분 전"} 
            hashtags={["시험","노잼","방학"]} 
            content={"나랑 술 먹을 사람 구함 ~ 또는 코딩 같이 할 사람~~~\n오호랏"} 
            likes={10} 
            stars={20} 
            comments={30}        
          />
          <CommentCard 
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

export default BoardPage;
