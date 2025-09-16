'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { isGraduate, useUserAcademic } from '@/entities/user';

import { CustomBoard } from './CustomBoard';
import { DefaultNoticeBoard } from './DefaultNoticeBoard';

export const BoardListClient = ({
  roles,
  defaultBoardForAdmin,
  defaultBoardForCommon,
  customBoardForAdmin,
  customBoardForCommon,
}) => {
  const { data: userInfo } = useUserAcademic();
  const isGraduated = userInfo ? isGraduate(userInfo.academicStatus) : false;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const fabBase =
    'group fixed right-6 bottom-24 xl:right-80 xl:bottom-10 h-16 w-16 xl:h-24 xl:w-24 ' +
    'rounded-[50px] bg-[#7AB6C1] text-white text-3xl font-normal shadow-lg ' +
    'transition-all duration-200 ease-out will-change-transform ' +
    'hover:-translate-y-0.5 hover:shadow-xl hover:bg-[#6AA3AD] active:scale-95 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7AB6C1] ' +
    'motion-reduce:transition-none motion-reduce:hover:translate-y-0';

  const renderBoard = () => {
    if (roles.includes('ADMIN')) {
      return (
        <>
          {/* 기본 공지 섹션 */}
          <div>
            <DefaultNoticeBoard boardInfos={defaultBoardForAdmin} />
          </div>
          {/* 커스텀 보드 섹션 */}
          <div className={`mt-4`}>
            <CustomBoard boardInfos={customBoardForAdmin} />
          </div>
        </>
      );
    }

    return (
      <>
        <div>
          <DefaultNoticeBoard boardInfos={defaultBoardForCommon} />
        </div>
        <div className={`mt-4`}>
          <CustomBoard boardInfos={customBoardForCommon} />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="h-full w-full py-4">
        <div className="flex flex-col items-center">{renderBoard()}</div>
      </div>

      {!isGraduated && (
        <Link href="/board/create" aria-label="게시글 작성">
          <button type="button" title="게시글 작성" className={fabBase}>
            <span
              aria-hidden
              className="inline-block leading-none transition-transform duration-200 group-hover:scale-110"
            >
              +
            </span>
          </button>
        </Link>
      )}
    </>
  );
};
