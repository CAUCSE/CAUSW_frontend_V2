import { CustomBoard, DefaultBoard, IBoardResponseDto } from "@/entities";

import Link from "next/link";
import { MainBoardRscService } from "@/shared";

const BoardPage = async () => {
  const { getMainBoard } = MainBoardRscService();
  const boards = await getMainBoard();

  //TODO 디버깅용 코드 지우기
  //console.log(boards);

  return (
    <div className="absolute h-full w-full py-3 pl-4 lg:pl-8">
      <div className="flex flex-col items-center">
        <DefaultBoard
          boardInfos={boards.filter(
            (board: IBoardResponseDto) => board.isDefault,
          )}
        />
        <CustomBoard
          boardInfos={boards.filter(
            (board: IBoardResponseDto) => !board.isDefault,
          )}
        />
        <Link href={`/board/create`}>
          <button className="fixed bottom-28 rounded-3xl bg-red-500 px-6 py-3 font-bold text-white lg:bottom-10">
            게시판 생성
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BoardPage;
