"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PersonalInfoPage = () => {
  const [profileImage, setProfileImage] = useState('/images/default_profile.png'); // 기본 이미지
  const [nickname, setNickname] = useState('hong');
  const [academicStatus, setAcademicStatus] = useState('재학');
  const router = useRouter(); // router 사용

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImageUrl = URL.createObjectURL(e.target.files[0]);
      setProfileImage(newImageUrl);
    }
  };

  return (
    <div className="p-3">
      {/* 이전 버튼 */}
      <div className="sticky top-0 bg-[#F8F8F8] z-10 w-full flex justify-left items-center py-2 mb-4">
        <button
          onClick={() => router.back()}
          className="text-black-500 hover:text-gray-500 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          이전
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">개인정보 관리</h1>

      {/* 반응형 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* 왼쪽: 프로필 사진, 닉네임, 학적 상태 */}
        <div className="flex flex-col items-center lg:flex lg:items-center lg:justify-center">
          <img
            src={profileImage}
            alt="프로필"
            className="w-32 h-32 lg:w-32 lg:h-32 rounded-full object-cover mb-4"
          />
          <label
            htmlFor="profileImage"
            className="flex justify-center text-sm text-black-500 cursor-pointer bg-focus text-white p-3 rounded-3xl w-32 lg:w-40 hover:bg-blue-600"
          >
            프로필 사진 수정
          </label>
          <input
            type="file"
            id="profileImage"
            className="hidden"
            accept="image/*"
            onChange={handleProfileImageChange}
          />

          {/* 닉네임과 학적 상태를 한 줄에 배치 */}
          <div className="w-full mt-4 flex flex-row lg:flex-col">
            <div className="mb-4 ml-4 w-1/2 lg:w-full">
              <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full lg:w-5/6"
              />
            </div>
            <div className="mb-4 ml-4 w-1/2 lg:w-full">
              <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">학적 상태</label>
              <select
                value={academicStatus}
                onChange={(e) => setAcademicStatus(e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full lg:w-5/6"
              >
                <option value="재학">재학</option>
                <option value="휴학">휴학</option>
                <option value="졸업">졸업</option>
              </select>
            </div>
          </div>
        </div>

        {/* 오른쪽: 이메일, 이름, 학번 등 */}
        <div className="grid grid-cols-2 gap-4 lg:flex lg:justify-between">
          <div>
            <div className="mb-4">
              <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">이름</label>
              <p className="text-gray-700">홍길동</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">이메일</label>
              <p className="text-gray-700">asdf@cau.ac.kr</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">학번</label>
              <p className="text-gray-700">20201234</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">입학 년도</label>
              <p className="text-gray-700">2020</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">졸업 년도</label>
              <p className="text-gray-700">2026년 2월</p>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">등록 완료 학기</label>
              <p className="text-gray-700">5차 학기</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">학부(학과)</label>
              <p className="text-gray-700">소프트웨어학부</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">본 학기 학생회비 적용 여부</label>
              <p className="text-gray-700">학생회비 납부 적용됨</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">납부한 학생회비 학기 차수</label>
              <p className="text-gray-700">8차 학기 분</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">남은 학생회비 차수</label>
              <p className="text-gray-700">3차 학기</p>
            </div>
          </div>
        </div>
      </div>

      {/* 변경 사항 저장 버튼 */}
      <div className="mt-8 flex justify-center">
        <button className="bg-focus text-white p-3 rounded-3xl w-32 lg:w-80 hover:bg-blue-600">
          변경 사항 저장
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
