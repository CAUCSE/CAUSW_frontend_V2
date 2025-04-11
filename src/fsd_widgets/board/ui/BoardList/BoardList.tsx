import Link from 'next/link';

import { fetchBoardList } from '@/fsd_entities/board';

import { useUserStore } from '@/shared';

import { CustomBoard } from './CustomBoard';
import { DefaultNoticeBoard } from './DefaultNoticeBoard';

// TODO useUserStore 변경 시 리팩토링 진행

export const BoardList = async () => {
  const roles = useUserStore.getState().roles;
  const { sortedBoardList, defaultBoardForAdmin, defaultBoardForCommon, customBoardForAdmin, customBoardForCommon } =
    await fetchBoardList();

  return (
    <>
      <div className="absolute h-full w-full py-3">
        <div className="flex flex-col items-center">
          {sortedBoardList.filter(board => board.isDefault).length > 0 &&
            (roles.includes('ADMIN') ? (
              <DefaultNoticeBoard boardInfos={defaultBoardForAdmin} />
            ) : (
              <DefaultNoticeBoard boardInfos={defaultBoardForCommon} />
            ))}
          {roles.includes('ADMIN') ? (
            <CustomBoard boardInfos={customBoardForAdmin} />
          ) : (
            <CustomBoard boardInfos={customBoardForCommon} />
          )}
        </div>
      </div>
      <Link href={`/board/create`}>
        <button className="fixed bottom-[70px] right-[9px] w-32 transform rounded-xl bg-red-500 px-6 py-3 font-bold text-white shadow-lg xl:bottom-10 xl:left-1/2 xl:-translate-x-1/2">
          게시판 생성
        </button>
      </Link>
    </>
  );
};
