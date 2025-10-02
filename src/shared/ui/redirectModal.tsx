'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

// 페이지 이동을 위한 useRouter 훅

interface IModalProps {
  closeModal: () => void;
  children: React.ReactNode;
  redirectTo: string; // 이동할 경로를 받는 props
}

export const RedirectModal = ({
  closeModal,
  children,
  redirectTo,
}: IModalProps) => {
  const router = useRouter(); // useRouter 훅으로 페이지 이동 기능

  // 페이지 이동 함수
  const handleRedirect = () => {
    closeModal(); // 모달 닫기
    router.push(redirectTo); // 전달받은 경로로 이동
  };

  return (
    <div className="bg-opacity-50 fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black p-4">
      <div className="relative flex flex-col items-center rounded-lg bg-white p-8 md:w-1/2">
        <button
          className="absolute top-0 right-0 px-4 py-2 text-xl font-bold"
          onClick={closeModal}
        >
          x
        </button>
        {children}

        {/* 페이지 이동 버튼 */}
        <button
          className="bg-focus mt-4 h-10 w-28 rounded-sm text-white hover:bg-blue-500"
          onClick={handleRedirect}
        >
          이동하기
        </button>
      </div>
    </div>
  );
};
