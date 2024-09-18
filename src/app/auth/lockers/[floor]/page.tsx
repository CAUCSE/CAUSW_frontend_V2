"use client";

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const LockerSelection = () => {
  const params = useParams();
  const floor = params?.floor as string | undefined;

  const [selectedLocker, setSelectedLocker] = useState<number | null>(null);
  const [myLocker, setMyLocker] = useState<number | null>(null);

  // 페이지 로드 시 로컬 스토리지에서 'myLocker' 정보를 불러옵니다.
  useEffect(() => {
    const savedLocker = localStorage.getItem('myLocker');
    if (savedLocker) {
      setMyLocker(parseInt(savedLocker));
    }
  }, []);

  const lockers = Array(30).fill(null).map((_, i) => ({
    id: i + 1,
    status: i % 5 === 0 ? 'unavailable' : i + 1 === myLocker ? 'my' : 'available',
  }));

  const handleLockerClick = (id: number) => {
    if (lockers[id - 1].status !== 'available') return;
    setSelectedLocker(id);
  };

  const handleLockerConfirm = () => {
    if (selectedLocker !== null) {
      localStorage.setItem('myLocker', selectedLocker.toString());
      setMyLocker(selectedLocker);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold mb-8">{floor} 사물함 선택</h1>
      <div className="grid grid-cols-5 gap-2 mb-8">
        {lockers.map((locker) => (
          <div
            key={locker.id}
            onClick={() => handleLockerClick(locker.id)}
            className={`p-4 rounded-lg shadow-md cursor-pointer ${
              locker.status === 'unavailable'
                ? 'bg-gray-300'
                : locker.status === 'my'
                ? 'bg-blue-300'
                : 'bg-white'
            } ${selectedLocker === locker.id ? 'ring-2 ring-blue-600' : ''}`}
          >
            {locker.id}
          </div>
        ))}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center max-w-md">
        <h2 className="text-xl font-semibold mb-4">사물함을 선택해주세요!</h2>
        <div className="text-left mb-4">
          <p>✔️ 선택 불가: <span className="bg-gray-300 p-1 rounded"> </span></p>
          <p>✔️ 선택 가능: <span className="bg-white p-1 border rounded"> </span></p>
          <p>✔️ 내 사물함: <span className="bg-blue-300 p-1 rounded"> </span></p>
        </div>
        <Link href={`/auth/lockers/${encodeURIComponent(floor || '')}/confirmation?locker=${selectedLocker}`}>
          <button
            className="bg-blue-500 text-white p-2 rounded-lg w-full disabled:bg-gray-300"
            disabled={selectedLocker === null}
            onClick={handleLockerConfirm}
          >
            신청하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LockerSelection;
