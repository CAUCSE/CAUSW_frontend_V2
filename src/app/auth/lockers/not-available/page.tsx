"use client";

import React from 'react';
import Link from 'next/link';

const NotAvailable = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <h2 className="text-2xl font-semibold mb-4">사물함 신청 기간이 아닙니다!</h2>
        <p className="text-red-500 mb-4">지금은 사물함 신청 기간이 아닙니다. 다음 신청 기간을 기다려주세요.</p>
        <Link href="/auth/lockers">
          <button className="bg-gray-300 text-black p-2 rounded-lg w-full">확인</button>
        </Link>
      </div>
    </div>
  );
};

export default NotAvailable;

