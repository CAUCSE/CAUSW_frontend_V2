"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { BASEURL, getRccAccess } from '@/shared'; // getRccAccess로 AccessToken 관리

interface LockerFloor {
  id: string;
  name: string;
  available: number;
  total: number;
}

const LockerList = () => {
  const [lockers, setLockers] = useState<LockerFloor[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  const fetchLockerData = async () => {
    try {
      const locationIdMap: { [key: string]: string } = {
        '2층': '5aa6099b8e13e49e018e13ef62d20001',
        '3층': '5aa6099b8e13e49e018e13ef72370002',
        '4층': '5aa6099b8e13e49e018e13ef84ff0003',
      };

      // getRccAccess로 AccessToken을 가져와 헤더에 포함
      const accessToken = await getRccAccess();
      if (!accessToken) {
        throw new Error('AccessToken이 존재하지 않습니다.');
      }

      const responses = await Promise.all([
        axios.get(`${BASEURL}/api/v1/lockers/locations/${locationIdMap['2층']}`, {
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        }),
        axios.get(`${BASEURL}/api/v1/lockers/locations/${locationIdMap['3층']}`, {
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        }),
        axios.get(`${BASEURL}/api/v1/lockers/locations/${locationIdMap['4층']}`, {
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        }),
      ]);

      // 각 층의 사용 가능한 사물함과 전체 사물함 수를 계산
      const updatedLockers: LockerFloor[] = [
        {
          id: locationIdMap['2층'],
          name: '2층',
          available: responses[0].data.lockerList.filter((locker: any) => locker.isActive === true).length,
          total: responses[0].data.lockerList.length,
        },
        {
          id: locationIdMap['3층'],
          name: '3층',
          available: responses[1].data.lockerList.filter((locker: any) => locker.isActive === true).length,
          total: responses[1].data.lockerList.length,
        },
        {
          id: locationIdMap['4층'],
          name: '4층',
          available: responses[2].data.lockerList.filter((locker: any) => locker.isActive === true).length,
          total: responses[2].data.lockerList.length,
        },
      ];

      setLockers(updatedLockers); // 상태 업데이트
      setLoading(false); // 로딩 상태 종료
    } catch (error) {
      if (error instanceof AxiosError) {
        // AxiosError로 타입을 좁혀서 처리
        console.error('사물함 데이터를 불러오는 중 오류가 발생했습니다:', error.response?.data || error.message);
      } else {
        // 일반적인 에러 처리
        console.error('예상하지 못한 오류가 발생했습니다:', error);
      }
      setError('사물함 정보를 불러오는 중 오류가 발생했습니다.');
      setLoading(false); // 로딩 상태 종료
    }
  };

  useEffect(() => {
    fetchLockerData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">로딩 중...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold mb-8">사물함 관리</h1>
      <div className="space-y-4 w-full max-w-md">
        {lockers.map((lockerFloor) => (
          <Link key={lockerFloor.id} href={`/auth/lockers/${encodeURIComponent(lockerFloor.name)}`}>
            <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer">
              <h2 className="text-xl font-semibold">{lockerFloor.name}</h2>
              <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(lockerFloor.available / lockerFloor.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <span>{`잔여 ${lockerFloor.available}`}</span>
                <span>{`전체 ${lockerFloor.total}`}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LockerList;
