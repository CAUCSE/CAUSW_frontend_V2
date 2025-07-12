import Link from 'next/link';

import { fetchBoardList } from '@/fsd_entities/board';
import { getMyRoles } from '@/fsd_entities/user/api';

import { CustomBoard } from './CustomBoard';
import { DefaultNoticeBoard } from './DefaultNoticeBoard';

export const BoardList = async () => {
  const roles = await getMyRoles();
  const { sortedBoardList, defaultBoardForAdmin, defaultBoardForCommon, customBoardForAdmin, customBoardForCommon } =
    await fetchBoardList();

  return (
    <>
      <div className="h-full w-full py-3">
        <div className="flex flex-col items-center">
          {sortedBoardList.filter((board) => board.isDefault).length > 0 &&
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
        <button className="fixed right-[9px] bottom-[70px] w-32 transform rounded-xl bg-red-500 px-6 py-3 font-bold text-white shadow-lg xl:bottom-10 xl:left-1/2 xl:-translate-x-1/2">
          게시판 생성
        </button>
      </Link>
    </>
  );
};
