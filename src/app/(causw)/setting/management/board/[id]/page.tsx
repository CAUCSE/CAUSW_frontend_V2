'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { LoadingComponent } from '@/entities';
import { SettingService } from '@/shared';

import CheckedIcon from '../../../../../../../public/icons/checked_icon.svg';
import NonCheckedIcon from '../../../../../../../public/icons/not_checked_icon.svg';

const BoardDetailManagement = ({ params: { id } }: { params: { id: string } }) => {
  const { getApplyBoards, acceptApplyBoards, rejectApplyBoards } = SettingService();

  const [data, setData] = useState<undefined | Setting.GetApplyBoardResponseDto>();

  useEffect(() => {
    getApplyBoards(id).then((res) => setData(res));
  }, []);

  if (!data) return <LoadingComponent />;

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <Link href="/setting/management/board" className="mb-7 flex items-center text-lg">
        <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
        이전
      </Link>
      <div className="flex h-full flex-col gap-3 p-2 pt-10 lg:p-10">
        <div className="mb-2 text-[35px] lg:mt-2 lg:mb-6">게시판 생성 신청 정보</div>

        <div className="text-[28px]">게시판 이름</div>
        <div className="border-b-post-title-input mb-5 w-full border-black bg-transparent text-[20px] text-black focus:outline-hidden">
          {data.boardName}
        </div>

        <div className="text-[28px]">신청자</div>
        <div className="border-b-post-title-input mb-5 w-full border-black bg-transparent text-[20px] text-black focus:outline-hidden">
          {data.user.name} ({data.user.studentId})
        </div>

        <div className="text-[28px]">게시판 설명</div>
        <div className="border-b-post-title-input mb-5 w-full border-black bg-transparent text-[20px] text-black focus:outline-hidden">
          {data.description}
        </div>

        {/* <RoleSelectSection userRole={hasAuth} roles={roles} /> */}

        <div className="flex items-center space-x-4 pt-4">
          <span>
            {data.isAnonymousAllowed ? (
              <CheckedIcon width={22} height={22} />
            ) : (
              <NonCheckedIcon width={22} height={22} />
            )}
          </span>
          <span className="text-[20px]">익명 허용 여부</span>
        </div>

        <div className="flex w-full flex-col justify-center gap-3 md:flex-row">
          <button
            className="bg-default flex h-10 w-80 items-center justify-center rounded-xl text-lg text-white md:h-16 lg:text-xl"
            onClick={() => {
              acceptApplyBoards(id).then(() => {
                window.location.href = '/setting/management/board';
              });
            }}
          >
            승인
          </button>
          <button
            className="flex h-10 w-80 items-center justify-center rounded-xl bg-gray-400 text-lg text-white md:h-16 lg:text-xl"
            onClick={() => {
              rejectApplyBoards(id).then(() => {
                window.location.href = '/setting/management/board';
              });
            }}
          >
            거부
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetailManagement;
