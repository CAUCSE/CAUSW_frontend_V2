import { BoardHeader, BoardPostList } from '@/widget';

const BoardPage = () => {
  return (
    <div className="h-full w-full">
      <BoardHeader />
      <BoardPostList />
    </div>
  );
};

export default BoardPage;
