'use client';

import { useEffect, useState } from 'react';

import { isGraduate, useUserAcademic } from '@/entities/user';

import { Fab } from '@/shared';

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

  const renderBoard = () => {
    if (roles.includes('ADMIN')) {
      return (
        <>
          {/* 기본 공지 섹션 */}
          <div className="w-full">
            <DefaultNoticeBoard boardInfos={defaultBoardForAdmin} />
          </div>
          {/* 커스텀 보드 섹션 */}
          <div className="mt-4 w-full">
            <CustomBoard boardInfos={customBoardForAdmin} />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="w-full">
          <DefaultNoticeBoard boardInfos={defaultBoardForCommon} />
        </div>
        <div className="mt-4 w-full">
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

      {!isGraduated && <Fab href="/board/create" label="게시판 추가" />}
    </>
  );
};
