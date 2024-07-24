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
          likeCnt={10} 
          starCnt={20} 
          commentCnt={30}        
        />
        <CommentCard 
          usrId={"eunhwa813"} 
          commentDetail={"comment detail"} 
          goodCnt={10} 
          badCnt={10}                  
        />
        <CommentInput/>
      </div>
    </div>
  );
};

export default BoardPage;
