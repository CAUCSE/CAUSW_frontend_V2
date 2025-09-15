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

  const renderBoard = () => {
    if (roles.includes('ADMIN')) {
      return (
        <>
          <DefaultNoticeBoard boardInfos={defaultBoardForAdmin} />
          <CustomBoard boardInfos={customBoardForAdmin} />
        </>
      );
    }

    return (
      <>
        <DefaultNoticeBoard boardInfos={defaultBoardForCommon} />
        <CustomBoard boardInfos={customBoardForCommon} />
      </>
    );
  };

  return (
    <>
      <div className="h-full w-full py-4">
        <div className="flex flex-col items-center">{renderBoard()}</div>
      </div>

      {!isGraduated && (
        <Link href={`/board/create`}>
          <button className="fixed right-6 bottom-24 h-16 w-16 transform rounded-[50px] bg-[#7AB6C1] px-6 py-3 text-3xl font-normal text-white shadow-lg hover:bg-[#5F8E97] xl:right-80 xl:bottom-10 xl:h-24 xl:w-24">
            +
          </button>
        </Link>
      )}
    </>
  );
};
