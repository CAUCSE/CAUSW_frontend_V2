"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PreviousButton } from "@/shared";
const VerificationPage = () => {
  const router = useRouter();


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <PreviousButton></PreviousButton>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">

        </div>
        <h1 className="text-2xl font-semibold mb-4">본인 인증 안내</h1>
        <p className="text-gray-600 mb-4">
          서비스 이용을 위해 본인 인증이 필요합니다. 
        </p>
        <p className="text-gray-600 mb-4">
        신청서와 재학 증빙 서류를 제출해 주세요.
        </p>

        <div className="mt-6 space-y-4">
          <button
            onClick={() => {router.push('./authorization/submitadmissionsapplication')}}
            className="w-full py-3 bg-focus text-white rounded-lg hover:bg-blue-500 transition"
          >
            가입 신청서 제출
          </button>
          <button
            onClick={() => {router.push('./authorization/submitacademicrecord')}}
            className="w-full py-3 bg-focus text-white rounded-lg hover:bg-blue-500 transition"
          >
            재학 증빙 서류 제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
