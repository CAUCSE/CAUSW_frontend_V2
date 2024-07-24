import { CommentComponent, CommentInput, PostComponent } from "@/entities";


const BoardPage = async () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
      <div>
        <PostComponent 
          usrId={"eunhwa813"} 
          postTitle={"Post title"} 
          postDetail={"post detail"}
          goodCnt={10} 
          starCnt={15} 
          commentCnt={5}
        />
        <CommentComponent 
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
