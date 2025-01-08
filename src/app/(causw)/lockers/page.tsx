"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LockerService } from "@/shared/hooks/services/LockerService";
import { LoadingComponent } from "@/entities";

interface LockerFloor {
  id: string;
  name: string;
  available: number;
  total: number;
}

const LockerList = () => {
  const [lockers, setLockers] = useState<LockerFloor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLockerData = async () => {
    try {
      const lockerLocations = await LockerService.fetchLocations();
      const updatedLockers: LockerFloor[] = lockerLocations.map((location: any) => ({
        id: location.id,
        name: location.name,
        available: location.enableLockerCount,
        total: location.totalLockerCount,
      }));
      setLockers(updatedLockers);
    } catch (error) {
      console.error("사물함 데이터를 불러오는 중 오류가 발생했습니다:", error);
      setError("사물함 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLockerData();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return <div className="text-red-500">{error}</div>;

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
