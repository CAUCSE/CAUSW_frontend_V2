"use client";
import React from "react";
import { useRouter } from "next/navigation"; // 페이지 이동을 위한 useRouter 훅

interface IModalProps {
  closeModal: () => void;
  children: React.ReactNode;
  redirectTo: string; // 이동할 경로를 받는 props
}

export const RedirectModal = ({ closeModal, children, redirectTo }: IModalProps) => {
  const router = useRouter(); // useRouter 훅으로 페이지 이동 기능

  // 페이지 이동 함수
  const handleRedirect = () => {
    closeModal(); // 모달 닫기
    router.push(redirectTo); // 전달받은 경로로 이동
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative flex flex-col items-center rounded-lg bg-white p-8 md:w-1/2">
        <button
          className="absolute right-0 top-0 px-4 py-2 text-xl font-bold"
          onClick={closeModal}
        >
          x
        </button>
        {children}

        {/* 페이지 이동 버튼 */}
        <button className="h-10 w-28 rounded bg-focus hover:bg-blue-500 mt-4 text-white" onClick={handleRedirect}>
          이동하기
        </button>
      </div>
    </div>
  );
};