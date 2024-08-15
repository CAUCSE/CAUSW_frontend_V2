import { PostCard, CommentCard, ChildCommentCard, CommentInput } from "@/entities";


const BoardDetailPage = async () => {
  {/* <div className="relative min-h-screen pb-20">
      <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl h-full scrollbar-hide"></div> */}
  return (
    <div className="absolute bottom-28 top-28 w-full overflow-y-auto bg-boardPageBackground scrollbar-hide md:bottom-10 md:left-40 md:right-72 md:top-0 md:w-auto">
        <div className="flex flex-col space-y-3t p-3">
          <div className="sm:pl-3">
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
          </div>
          <div className="flex justify-center ">
            <CommentInput/>
          </div>
        </div>
      </div>
  );
};

export default BoardDetailPage;
