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
      <div className="h-full w-full py-2">
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
        <button className="fixed right-6 bottom-24 h-16 w-16 transform rounded-[50px] bg-[#7AB6C1] px-6 py-3 text-3xl font-normal text-white shadow-lg hover:bg-[#5F8E97] xl:right-96 xl:bottom-10 xl:h-24 xl:w-24">
          +
        </button>
      </Link>
    </>
  );
};
