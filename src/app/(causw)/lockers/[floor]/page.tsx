"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { LockerService } from "@/shared/hooks/services/LockerService";

interface Locker {
  id: string;
  lockerNumber: number;
  isActive: boolean;
  isMine: boolean;
  expireAt?: string;
}

const LockerSelectionPage = () => {
  const { floor } = useParams();
  const decodedFloor = decodeURIComponent(floor as string);
  const [lockers, setLockers] = useState<Locker[]>([]);
  const [selectedLocker, setSelectedLocker] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [hasMyLocker, setHasMyLocker] = useState<boolean>(false);
  const [myLocker, setMyLocker] = useState<Locker | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const fetchLockers = async () => {
    try {
      const lockerLocations = await LockerService.fetchLocations();
      const location = lockerLocations.find((loc) => loc.name === decodedFloor);

      if (!location) {
        setErrorMessage("해당 층의 사물함 정보를 찾을 수 없습니다.");
        return;
      }

      const lockerList = await LockerService.fetchLockers(location.id);
      setLockers(lockerList);

      const myLockerExists = lockerList.find((locker: Locker) => locker.isMine);
      setHasMyLocker(!!myLockerExists);
      setMyLocker(myLockerExists || null);
    } catch (error: any) {
      setErrorMessage(error.message || "사물함 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleLockerClick = (id: string) => {
    setSelectedLocker((prev) => (prev === id ? null : id));
  };

  const returnMyLocker = async () => {
    try {
      if (myLocker) {
        const expireAt = myLocker.expireAt || new Date().toISOString();
        await LockerService.updateLocker(myLocker.id, "RETURN", "기존 사물함 반납", expireAt);
        setModalTitle("사물함 반납 완료");
        setModalMessage(`기존 사물함이 반납되었습니다.\n반납된 사물함 번호: ${myLocker.lockerNumber}`);
        setErrorMessage(null);
        setMyLocker(null);
        fetchLockers();
      }
    } catch (error: any) {
      setErrorMessage(error.message || "사물함 반납 중 오류가 발생했습니다.");
    }
  };

  const handleLockerAction = async (actionType: string, actionMessage: string) => {
    const locker = actionType === "EXTEND" ? myLocker : lockers.find((l) => l.id === selectedLocker);

    if (!locker) {
      setErrorMessage("올바른 사물함을 선택해주세요.");
      return;
    }

    if (actionType === "REGISTER" && !locker.isActive) {
      setErrorMessage("이 사물함은 신청할 수 없습니다.");
      return;
    }

    try {
      await LockerService.updateLocker(locker.id, actionType, actionMessage, locker.expireAt);
      setModalTitle(`${locker.lockerNumber}번 사물함 ${actionMessage} 완료`);
      setModalMessage(`${locker.lockerNumber}번 사물함 ${actionMessage}가 완료되었습니다.`);
      fetchLockers();
    } catch (error: any) {
      setErrorMessage(error.message || `사물함 ${actionMessage} 중 오류가 발생했습니다.`);
    }
  };

  useEffect(() => {
    fetchLockers();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [floor]);

  return (
    <div>
  <div className="flex flex-col md:flex-row items-start justify-center min-h-screen bg-gray-100">
    {/* 사물함 선택 영역 */}
    <div className="w-full md:w-2/3 mt-8 flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-4">{decodedFloor} 선택</h1>
        {isMobile && (
          <div className="flex items-center mb-2 mr-4">
            <div className="flex items-center mr-2">
              <span className="inline-block w-4 h-4 bg-gray-300 rounded-full mr-1"></span>
              <span>선택 불가</span>
            </div>
            <div className="flex items-center mr-2">
              <span className="inline-block w-4 h-4 bg-white border rounded-full mr-1"></span>
              <span>선택 가능</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 bg-blue-300 rounded-full mr-1"></span>
              <span>내 사물함</span>
            </div>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div>
      )}

      <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
        {lockers.map((locker) => (
          <button
            key={locker.id}
            className={`p-4 rounded-lg shadow-md ${
              selectedLocker === locker.id
                ? "bg-green-300"
                : locker.isMine
                ? "bg-blue-300"
                : locker.isActive
                ? "bg-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleLockerClick(locker.id)}
            disabled={!locker.isActive && !locker.isMine}
          >
            {locker.lockerNumber}
          </button>
        ))}
      </div>
    </div>

    {/* 웹 화면에서 정보 패널 보이기, 모바일에서 가리기 */}
    <div
      className={`w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md mt-8 md:mt-0 md:sticky md:top-16 ${
        isMobile ? "hidden" : ""
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">사물함을 선택해주세요!</h2>
      <div className="mb-2">
        <span className="inline-block w-4 h-4 bg-gray-300 rounded-full mr-2"></span>
        <span>선택 불가</span>
      </div>
      <div className="mb-2">
        <span className="inline-block w-4 h-4 bg-white border rounded-full mr-2"></span>
        <span>선택 가능</span>
      </div>
      <div className="mb-2">
        <span className="inline-block w-4 h-4 bg-blue-300 rounded-full mr-2"></span>
        <span>내 사물함</span>
      </div>

      {selectedLocker && (
        <div className="mt-4">
          <p className="mb-2">
            선택된 사물함 번호:{" "}
            {lockers.find((l) => l.id === selectedLocker)?.lockerNumber}
          </p>
          {hasMyLocker && (
            <>
              {myLocker?.id === selectedLocker ? (
                <>
                  <button
                    className="bg-red-500 text-white p-2 w-full rounded mb-2"
                    onClick={() => handleLockerAction("RETURN", "사물함 반납")}
                  >
                    반납하기
                  </button>
                  <button
                    className="bg-yellow-500 text-white p-2 w-full rounded"
                    onClick={() => handleLockerAction("EXTEND", "사물함 연장")}
                  >
                    연장하기
                  </button>
                </>
              ) : (
                <button
                  className="bg-blue-500 text-white p-2 w-full rounded"
                  onClick={() => handleLockerAction("REGISTER", "사물함 신청")}
                  disabled={
                    !lockers.find((locker) => locker.id === selectedLocker)
                      ?.isActive
                  }
                >
                  신청하기
                </button>
              )}
            </>
          )}
          {!hasMyLocker && (
            <button
              className="bg-blue-500 text-white p-2 w-full rounded"
              onClick={() => handleLockerAction("REGISTER", "사물함 신청")}
              disabled={
                !lockers.find((locker) => locker.id === selectedLocker)
                  ?.isActive
              }
            >
              신청하기
            </button>
          )}
        </div>
      )}
    </div>

    {/* 모바일 화면에서 보일 UI */}
    {isMobile && selectedLocker && (
      <div className="fixed bottom-32 left-0 right-0 p-2 bg-white rounded-lg shadow-md z-10 flex justify-center">
        <div className="text-center w-3/4">
          <p className="mb-1 text-sm">
            사물함 번호:{" "}
            {lockers.find((l) => l.id === selectedLocker)?.lockerNumber}
          </p>
          {!hasMyLocker || myLocker?.id !== selectedLocker ? (
            <button
              className="bg-blue-500 text-white p-1 w-full rounded"
              onClick={() => handleLockerAction("REGISTER", "사물함 신청")}
              disabled={
                !lockers.find((locker) => locker.id === selectedLocker)
                  ?.isActive
              }
            >
              신청하기
            </button>
          ) : (
            <div className="flex justify-between mt-1">
              <button
                className="bg-red-500 text-white p-1 w-1/2 rounded mr-1 text-sm"
                onClick={() => handleLockerAction("RETURN", "사물함 반납")}
              >
                반납하기
              </button>
              <button
                className="bg-yellow-500 text-white p-1 w-1/2 rounded ml-1 text-sm"
                onClick={() => handleLockerAction("EXTEND", "사물함 연장")}
              >
                연장하기
              </button>
            </div>
          )}
        </div>
      </div>
    )}
  </div>

    </div>
  );
};

export default LockerSelectionPage;
