'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, CircleService } from '@/shared';
import { useUserStore } from '@/shared';

export function CircleManagementButtons({
  params: { name, studentId, userId, circleId },
}: {
  params: { name: string; studentId: string; userId: string; circleId: string };
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const { dropMember } = CircleService();
  const router = useRouter();
  const myId = useUserStore((state) => state.id);

  const deleteAndNavigateAndReload = async () => {
    try {
      await router.push('../'); // 페이지 이동
      window.location.reload(); // 페이지 새로고침
    } catch (error) {}
  };

  const expelMember = async () => {
    try {
      const response = await dropMember(userId, circleId);
      setIsSuccessModal(true);
    } catch (error) {
      setIsErrorModal(true);
    }
  };
  return (
    <div className="mt-8 flex justify-center gap-[30px] lg:gap-[60px]">
      <Button
        key="닫기"
        action={() => {
          router.push('../');
        }}
        variant="BLUE"
        className="h-[45px] w-[125px] lg:w-[200px]"
      >
        닫기
      </Button>

      {myId !== userId && (
        <Button
          key="추방"
          action={() => {
            setIsOpenModal(true);
          }}
          variant="RED"
          className="h-[45px] w-[125px] lg:w-[200px]"
        >
          추방
        </Button>
      )}

      {isOpenModal && (
        <div className="bg-opacity-50 fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black p-4">
          <div className="relative flex flex-col items-center rounded-lg bg-white p-8 md:w-1/2">
            <p className="text-md mb-2 font-bold lg:text-xl">
              {name}({studentId})을 동아리에서 추방
            </p>
            <p className="text-md font-bold text-red-500 lg:text-xl">
              {name}({studentId})을
            </p>
            <p className="text-md font-bold text-red-500 lg:text-xl">정말 동아리에서 추방하시곘습니까?</p>
            <p className="text-md font-bold text-red-500 lg:text-xl">이 작업은 복구할 수 없습니다.</p>

            <div className="m-4 flex space-x-8 p-4">
              <Button
                key="추방"
                action={() => {
                  expelMember();
                }}
                variant="RED"
                className="h-[45px] w-[125px] lg:w-[200px]"
              >
                추방
              </Button>
              <Button
                key="모달 닫기"
                action={() => {
                  setIsOpenModal(false);
                }}
                variant="GRAY"
                className="h-[45px] w-[125px] lg:w-[200px]"
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}

      {isErrorModal && (
        <div className="bg-opacity-50 fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black p-4">
          <div className="relative flex flex-col items-center rounded-lg bg-white p-8 md:w-1/2">
            <p className="text-md mb-2 font-bold lg:text-xl">알 수 없는 오류가 발생했습니다.</p>
            <Button
              key="모달 닫기"
              action={() => {
                setIsErrorModal(false);
              }}
              variant="GRAY"
              className="h-[45px] w-[125px] lg:w-[200px]"
            >
              닫기
            </Button>
          </div>
        </div>
      )}
      {isSuccessModal && (
        <div className="bg-opacity-50 fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black p-4">
          <div className="relative flex flex-col items-center rounded-lg bg-white p-8 md:w-1/2">
            <p className="text-md mb-2 font-bold lg:text-xl">{name}이 추방되었습니다.</p>
            <Button
              action={() => {
                setIsSuccessModal(false);
                deleteAndNavigateAndReload();
              }}
              variant="GRAY"
              className="h-[45px] w-[125px] lg:w-[200px]"
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
