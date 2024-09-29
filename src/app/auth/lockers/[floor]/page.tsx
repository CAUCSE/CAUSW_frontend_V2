"use client";

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { BASEURL, getRccAccess } from '@/shared';

interface Locker {
  id: string;
  lockerNumber: number;  // 사물함 번호
  isActive: boolean;     // 사용 중인지 여부
  isMine: boolean;       // 내 사물함인지 여부
}

const LockerSelectionPage = () => {
  const { floor } = useParams();
  const decodedFloor = decodeURIComponent(floor as string); // URL에서 받은 값 디코딩
  const [lockers, setLockers] = useState<Locker[]>([]);
  const [selectedLocker, setSelectedLocker] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const locationIdMap: { [key: string]: string } = {
    '2층': '5aa6099b8e13e49e018e13ef62d20001',
    '3층': '5aa6099b8e13e49e018e13ef72370002',
    '4층': '5aa6099b8e13e49e018e13ef84ff0003',
  };

  // 사물함 데이터를 서버에서 가져오는 함수
  const fetchLockers = async () => {
    try {
      if (!decodedFloor || !locationIdMap[decodedFloor]) {
        setErrorMessage('잘못된 층 정보입니다.');
        return;
      }

      const locationId = locationIdMap[decodedFloor];

      // getRccAccess로 AccessToken을 가져와 헤더에 포함
      const accessToken = await getRccAccess();
      if (!accessToken) {
        throw new Error('AccessToken이 존재하지 않습니다.');
      }

      const response = await axios.get(`${BASEURL}/api/v1/lockers/locations/${locationId}`, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      });

      const lockerList = response.data.lockerList;

      setLockers(lockerList);  // 서버에서 받아온 사물함 데이터를 상태로 저장

      // 각 사물함 데이터 확인 (디버깅용)
      console.log('Received lockers:', lockerList);

    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data?.message || '사물함 데이터를 불러오는 중 오류가 발생했습니다.');
      } else {
        if (error instanceof Error) {
          setErrorMessage(error.message || '예상하지 못한 오류가 발생했습니다.');
        } else {
          setErrorMessage('예상하지 못한 오류가 발생했습니다.');
        }
      }
    }
  };

  // 사물함 액션 처리 함수 (신청, 반납, 연장)
  const handleLockerAction = async (actionType: string, actionMessage: string) => {
    if (!selectedLocker) return;

    const locker = lockers.find(l => l.id === selectedLocker);

    console.log('Selected Locker ID:', selectedLocker);

    // 이미 사용 중인 사물함인지 확인 (REGISTER 시에만 체크)
    if (actionType === 'REGISTER' && locker?.isActive) {
      setErrorMessage('이 사물함은 이미 사용 중입니다.');
      return;
    }

    try {
      const accessToken = await getRccAccess();
      // 디버깅
      console.log(`Authorization header: Bearer ${accessToken}`);
      if (!accessToken) {
        throw new Error('AccessToken이 존재하지 않습니다.');
      }

      await axios.put(`${BASEURL}/api/v1/lockers/${selectedLocker}`, {
        action: actionType,
        message: actionMessage,
      }, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      });

      fetchLockers(); // 액션 후 사물함 데이터를 갱신
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        setErrorMessage(`사물함 ${actionType} 중 오류가 발생했습니다: ` + error.response.data.message);
      } else {
        setErrorMessage(`사물함 ${actionType} 중 예상치 못한 오류가 발생했습니다.`);
      }
    }
  };

  useEffect(() => {
    if (floor) {
      fetchLockers();
    }
  }, [floor]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold mb-8">{decodedFloor} 사물함 선택</h1>

      {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div>
      )}

      <div className="grid grid-cols-5 gap-4 mb-8">
        {lockers.map((locker) => (
          <button
            key={locker.id}
            className={`p-4 rounded-lg shadow-md ${
              locker.isActive ? (locker.isMine ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-300'
            }`}
            onClick={() => setSelectedLocker(locker.id)}
          >
            {locker.lockerNumber}
          </button>
        ))}
      </div>

      {selectedLocker && (
        <div className="flex flex-col items-center space-y-4">
          <p>선택된 사물함 번호: {lockers.find(l => l.id === selectedLocker)?.lockerNumber}</p>

          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => handleLockerAction('REGISTER', '사물함 신청')}
            disabled={lockers.find((locker) => locker.id === selectedLocker)?.isActive}
          >
            신청하기
          </button>

          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={() => handleLockerAction('RETURN', '사물함 반납')}
            disabled={!lockers.find((locker) => locker.id === selectedLocker)?.isMine}
          >
            반납하기
          </button>

          <button
            className="bg-yellow-500 text-white p-2 rounded"
            onClick={() => handleLockerAction('EXTEND', '사물함 연장')}
            disabled={!lockers.find((locker) => locker.id === selectedLocker)?.isMine}
          >
            연장하기
          </button>
        </div>
      )}
    </div>
  );
};

export default LockerSelectionPage;
