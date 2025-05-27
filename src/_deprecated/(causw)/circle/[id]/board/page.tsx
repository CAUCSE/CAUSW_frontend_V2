import Link from 'next/link';

import { CustomBoard } from '@/fsd_widgets/board/ui/BoardList/CustomBoard';

import { BoardRscService, CircleRscService } from '@/shared';

const CircleBoards = async ({ params: { id } }: { params: { id: string } }) => {
  const { getMainBoardList } = BoardRscService();
  const { getCircleBoards } = CircleRscService();
  const mainBoards = (await getMainBoardList()) as Array<Board.BoardResponseDto>;
  const circleBoardIds = await getCircleBoards(id).then((circleBoards) =>
    circleBoards.boardList.map((circleBoard) => circleBoard.id),
  );

  const commonBoards: Array<Board.BoardResponseDto> = [];

  mainBoards.forEach((element) => {
    if (circleBoardIds.includes(element.boardId)) {
      commonBoards.push(element);
    }
  });
  return (
    <>
      <div className="absolute h-full w-full py-3">
        <div className="flex flex-col items-center">
          <CustomBoard boardInfos={commonBoards} />
        </div>
      </div>
      <Link href={`/circle/${id}/board/create`}>
        <button className="fixed bottom-28 left-1/2 -translate-x-1/2 transform rounded-3xl bg-red-500 px-6 py-3 font-bold text-white xl:bottom-10">
          게시판 생성
        </button>
      </Link>
    </>
  );
};

export default CircleBoards;
