"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { BASEURL, getRccAccess } from "@/shared";

// 모달 컴포넌트
const Modal = ({ title, message, onClose }: { title: string, message: string, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-4">
          {message.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

interface Locker {
  id: string;
  lockerNumber: number;  // 사물함 번호
  isActive: boolean;     // 사용 가능한지 여부
  isMine: boolean;       // 내 사물함인지 여부
}

const LockerSelectionPage = () => {
  const { floor } = useParams();
  const decodedFloor = decodeURIComponent(floor as string); // URL에서 받은 값 디코딩
  const [lockers, setLockers] = useState<Locker[]>([]);
  const [selectedLocker, setSelectedLocker] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null); // 모달 메시지 상태 추가
  const [modalTitle, setModalTitle] = useState<string | null>(null); // 모달 제목 상태 추가
  const [hasMyLocker, setHasMyLocker] = useState<boolean>(false); // 이미 신청된 사물함 여부 체크

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

      const lockerList: Locker[] = response.data.lockerList;  // 타입 명시
      setLockers(lockerList);  // 서버에서 받아온 사물함 데이터를 상태로 저장

      // 이미 신청된 사물함이 있는지 확인
      const myLockerExists = lockerList.some((locker: Locker) => locker.isMine);
      setHasMyLocker(myLockerExists);

      console.log('Received lockers:', lockerList);

    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data?.message || '사물함 데이터를 불러오는 중 오류가 발생했습니다.');
      } else {
        setErrorMessage('예상하지 못한 오류가 발생했습니다.');
      }
    }
  };


  // 모달 닫기 함수
  const closeModal = () => {
    setModalMessage(null);
    setModalTitle(null);
  };

  // 사물함 액션 처리 함수 (신청, 반납, 연장)
  const handleLockerAction = async (actionType: string, actionMessage: string) => {
    if (!selectedLocker) return;

    const locker = lockers.find(l => l.id === selectedLocker);

    console.log('Selected Locker ID:', selectedLocker);

    if (actionType === 'REGISTER' && !locker?.isActive) {
      setErrorMessage('이 사물함은 신청할 수 없습니다.');
      return;
    }

    try {
      const accessToken = await getRccAccess();
      console.log(`Authorization header: ${accessToken}`);
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

      const lockerLocation = `${decodedFloor} ${locker?.lockerNumber}번`;
      let message;
      if (actionType === 'REGISTER') {
        message = `선택하신 사물함이 신청되었습니다.\n내 사물함 위치: ${lockerLocation}`;
      } else if (actionType === 'RETURN') {
        message = `선택하신 사물함이 반납되었습니다.\n반납된 사물함 위치: ${lockerLocation}`;
      } else {
        message = `선택하신 사물함이 연장되었습니다.\n내 사물함 위치: ${lockerLocation}`;
      }

      setModalTitle(`사물함 ${actionType} 완료`);
      setModalMessage(message);
      setErrorMessage(null); // 오류 메시지 초기화
      fetchLockers(); // 액션 후 사물함 데이터를 갱신

    } catch (error) {
      setModalMessage(null); // 성공 메시지 초기화
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
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl flex justify-between">
        {/* 사물함 선택 영역 */}
        <div className="w-2/3 mt-8">
          <h1 className="text-2xl font-semibold mb-4">{decodedFloor} 선택</h1>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}

          <div className="grid grid-cols-5 gap-2">
            {lockers.map((locker) => (
              <button
                key={locker.id}
                className={`p-4 rounded-lg shadow-md ${
                  locker.isMine ? 'bg-blue-300' : locker.isActive ? 'bg-white' : 'bg-gray-300'
                }`}
                onClick={() => setSelectedLocker(locker.id)}
                disabled={!locker.isActive && !locker.isMine}
              >
                {locker.lockerNumber}
              </button>
            ))}
          </div>
        </div>

        {/* 정보 패널 */}
        <div
          className="p-4 bg-white rounded-lg shadow-md"
          style={{ position: 'absolute', top: '33vh', left: 'calc(66% + 20px)' }}
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
              <p className="mb-2">선택된 사물함 번호: {lockers.find(l => l.id === selectedLocker)?.lockerNumber}</p>

              {!hasMyLocker && (
                <button
                  className="bg-blue-500 text-white p-2 w-full rounded mb-2"
                  onClick={() => handleLockerAction('REGISTER', '사물함 신청')}
                  disabled={!lockers.find((locker) => locker.id === selectedLocker)?.isActive}
                >
                  신청하기
                </button>
              )}

              {hasMyLocker && (
                <>
                  <button
                    className={`p-2 w-full rounded mb-2 ${
                      lockers.find((locker) => locker.id === selectedLocker)?.isMine ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                    onClick={() => handleLockerAction('RETURN', '사물함 반납')}
                    disabled={!lockers.find((locker) => locker.id === selectedLocker)?.isMine}
                  >
                    반납하기
                  </button>

                  <button
                    className={`p-2 w-full rounded ${
                      lockers.find((locker) => locker.id === selectedLocker)?.isMine ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                    onClick={() => handleLockerAction('EXTEND', '사물함 연장')}
                    disabled={!lockers.find((locker) => locker.id === selectedLocker)?.isMine}
                  >
                    연장하기
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 모달 창 */}
      {modalMessage && modalTitle && (
        <Modal title={modalTitle} message={modalMessage} onClose={closeModal} />
      )}
    </div>
  );
};

export default LockerSelectionPage;
