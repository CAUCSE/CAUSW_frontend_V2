"use client";
import React from 'react';
import Link from 'next/link';

const LockerFloorList = () => {
  const lockers = [
    { floor: '2층', available: 6, total: 136 },
    { floor: '3층', available: 163, total: 168 },
    { floor: '4층', available: 17, total: 32 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold mb-8">사물함 관리</h1>
      <div className="space-y-4 w-full max-w-md">
        {lockers.map((locker, index) => (
          <Link key={index} href={`/auth/lockers/${encodeURIComponent(locker.floor)}`}>
            <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer">
              <h2 className="text-xl font-semibold">{locker.floor}</h2>
              <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(locker.available / locker.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <span>{`잔여 ${locker.available}`}</span>
                <span>{`전체 ${locker.total}`}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LockerFloorList;
