"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { BASEURL, getRccAccess } from "@/shared"; // getRccAccess로 AccessToken 관리
import { LoadingComponent } from "@/entities";

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
      // getRccAccess로 AccessToken을 가져와 헤더에 포함
      const accessToken = await getRccAccess();
      if (!accessToken) {
        throw new Error("AccessToken이 존재하지 않습니다.");
      }

      const formattedAccessToken = accessToken.startsWith("Bearer ")
        ? accessToken
        : `Bearer ${accessToken}`;

      const response = await axios.get(`${BASEURL}/api/v1/lockers/locations`, {
        headers: {
          Authorization: formattedAccessToken,
          "Content-Type": "application/json",
        },
      });

      const { lockerLocations } = response.data; // 응답에서 lockerLocations 추출

      if (!Array.isArray(lockerLocations)) {
        throw new Error("API 응답이 올바른 배열 형식이 아닙니다.");
      }

      // 각 층의 사용 가능한 사물함과 전체 사물함 수를 계산
      const updatedLockers: LockerFloor[] = lockerLocations.map(
        (location: any) => ({
          id: location.id,
          name: location.name,
          available: location.enableLockerCount, // 사용 가능한 사물함 개수
          total: location.totalLockerCount, // 전체 사물함 개수
        })
      );

      setLockers(updatedLockers); // 상태 업데이트
      setLoading(false); // 로딩 상태 종료
    } catch (error) {
      if (error instanceof AxiosError) {
        // AxiosError로 타입을 좁혀서 처리
        console.error(
          "사물함 데이터를 불러오는 중 오류가 발생했습니다:",
          error.response?.data || error.message
        );
      } else {
        // 일반적인 에러 처리
        console.error("예상하지 못한 오류가 발생했습니다:", error);
      }
      setError("사물함 정보를 불러오는 중 오류가 발생했습니다.");
      setLoading(false); // 로딩 상태 종료
    }
  };

  useEffect(() => {
    fetchLockerData();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-8 text-2xl font-semibold">사물함 관리</h1>
      <div className="flex w-full max-w-md flex-col gap-2 space-y-4">
        {lockers.map((lockerFloor) => (
          <Link
            key={lockerFloor.id}
            href={`/lockers/${encodeURIComponent(lockerFloor.name)}`}
          >
            <div className="cursor-pointer rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">{lockerFloor.name}</h2>
              <div className="mt-2 h-2.5 w-full rounded-full bg-gray-300">
                <div
                  className="h-2.5 rounded-full bg-blue-600"
                  style={{
                    width: `${(lockerFloor.available / lockerFloor.total) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between">
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
