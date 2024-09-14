"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Confirmation = () => {
  const searchParams = useSearchParams();
  const floor = searchParams?.get('floor') || ''; // searchParams가 null일 경우 빈 문자열을 기본값으로 사용
  const locker = searchParams?.get('locker') || '';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <h2 className="text-2xl font-semibold mb-4">사물함 신청 완료</h2>
        <p className="mb-4">선택하신 사물함이 신청되었습니다.</p>
        <p className="text-lg font-semibold">{`내 사물함 위치: ${floor} ${locker}번`}</p>
        <Link href="/auth/lockers">
          <button className="bg-blue-500 text-white p-2 rounded-lg w-full mt-4">닫기</button>
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;

