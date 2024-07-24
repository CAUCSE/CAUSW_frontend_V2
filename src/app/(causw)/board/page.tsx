import { PostCard, CommentCard, CommentInput } from "@/entities";


const BoardPage = async () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
      <div>
        <PostCard 
          username={"홍석천"} 
          timeAgo={"30분 전"} 
          hashtags={["시험","노잼","방학"]} 
          content={"나랑 술 먹을 사람 구함 ~ 또는 코딩 같이 할 사람~~~"} 
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
        <CommentInput/>
      </div>
    </div>
  );
};

export default BoardPage;
