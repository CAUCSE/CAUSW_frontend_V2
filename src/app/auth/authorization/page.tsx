"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserService } from "@/shared";
import SubmitAcademicRecordModal from "@/entities/application/AcademicRecordInput";
import SubmitApplicationModal from "@/entities/application/AdmissionApplicationPage";

const VerificationPage: React.FC = () => {
  const { getUserAdmissionInfo, getMyInfo, checkIsAcademicRecordSubmitted } =
    UserService();
  const [isAcademicRecordModalOpen, setIsAcademicModalOpen] = useState(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [userStatus, setUserStatus ] = useState('');
  const [emailValue, setEmailValue] = useState("");

  // UNDONE, AWAIT, REJECT, COMPLETE로 관리
  const [admissionApplicationStatus, setAdmissionApplicationStatus] =
    useState("");

  // BANNED, UNDONE, COMPLETE로 관리
  const [academicRecordApplicationStatus, setAcademicRecordApplicationStatus] =
    useState("");

  // 거절 사유 출력 부분 
  const [admissionRejectMessage, setAdmissionRejectMessage] = useState <"UNDONE" | "AWAIT" | "COMPLETE" | "REJECT" | ""> ("");
  const [academicRecordRejectMessage, setAcademicRecordRejectMessage] = useState <"BANNED" | "UNDONE" | "COMPLETE" | "REJECT" | ""> ("");

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await getMyInfo();
        // 상태 값들 가져오기
        const { state, rejectionOrDropReason, email } = response.data;
        
        setUserStatus(state);
        
        // 상태 업데이트
        setEmailValue(email);
        // 조건문 처리 (상태 값이 올바르게 설정된 후에 처리)
        if (state === "REJECT"){
          setAdmissionApplicationStatus("REJECT");
          setAcademicRecordApplicationStatus("BANNED");
          setAdmissionRejectMessage(rejectionOrDropReason);
        }
        else if (state === "AWAIT") {
          setAcademicRecordApplicationStatus("BANNED");
          checkAdmissionApplication(); // AWAIT인 경우 학적 상태 증빙 서류 제출 못하니까 admissionapplication 체크
        }
        else if (state === "ACTIVE") {
          console.log("await가 아닌 상태");
          setAdmissionApplicationStatus("COMPLETE");
          checkAcademicRecordApplication(); // AWAIT가 아닌 경우 학적 상태 증빙 서류 제출 필요 academicrecordapplication 체크
        }
        
      } catch (error) {
        console.log(error);
      }
    };

    if (!isAcademicRecordModalOpen && !isAdmissionModalOpen) {
      getInfo();
    }
  }, [isAcademicRecordModalOpen, isAdmissionModalOpen]);

  const checkAdmissionApplication = async () => {
    try {
      await getUserAdmissionInfo();
      setAdmissionApplicationStatus("AWAIT");
    } catch (error) {
      console.log(error);
      setAdmissionApplicationStatus("UNDONE");
    }
  };

  const checkAcademicRecordApplication = async () => {
    try {
      const { isRejected, rejectMessage } = (await checkIsAcademicRecordSubmitted()).data;
      if (isRejected) {
        setAcademicRecordApplicationStatus("REJECT");
        setAcademicRecordRejectMessage(rejectMessage);
      }
      else {
        setAcademicRecordApplicationStatus("COMPLETE");
      }
    } catch (error) {
      setAcademicRecordApplicationStatus("UNDONE");
    }
  };

  //

  return (
    <div>
      {isAcademicRecordModalOpen && (
        <SubmitAcademicRecordModal
          onClose={() => {
            setIsAcademicModalOpen(false);
          }}
          rejectMessage={academicRecordRejectMessage}
        />
      )}
      {isAdmissionModalOpen && (
        <SubmitApplicationModal
          onClose={() => {
            setIsAdmissionModalOpen(false);
          }}
          emailValue={`${emailValue}`}
          rejectMessage={admissionRejectMessage}
        />
      )}
      {!isAcademicRecordModalOpen && !isAdmissionModalOpen && (
        <div className="flex h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-lg rounded-lg bg-white p-8 text-center shadow-md">
            <div className="mb-6 flex justify-center"></div>
            <h1 className="mb-4 text-2xl font-semibold">본인 인증 안내</h1>
            <p className="mb-4 text-gray-600">
              서비스 이용을 위해 본인 인증이 필요합니다.
            </p>
            <p className="mb-4 text-gray-600">
              신청서와 재학 증빙 서류를 제출해 주세요.
            </p>

            <div className="mt-6 space-y-4">
              {admissionApplicationStatus === "AWAIT" && (
                <div className="w-full rounded-lg bg-gray-300 py-3 text-white transition hover:bg-gray-400">
                  {userStatus === "AWAIT" && <>가입 신청서 제출됨</>}
                </div>
              )}

              {admissionApplicationStatus === "COMPLETE" && (
                <div className="w-full rounded-lg bg-gray-300 py-3 text-white transition hover:bg-gray-400">
                  가입 신청서 제출 완료됨 (승인 완료)
                </div>
              )}
              {admissionApplicationStatus === "REJECT" && (
                <button
                onClick={() => {
                  setIsAdmissionModalOpen(true);
                }}
                className="w-full rounded-lg bg-focus py-3 text-white transition hover:bg-blue-500"
              >
                가입 신청서 제출 거절됨 (다시 제출하기)
              </button>
              )}

              {admissionApplicationStatus === "UNDONE" && (
                <button
                  onClick={() => {
                    setIsAdmissionModalOpen(true);
                  }}
                  className="w-full rounded-lg bg-focus py-3 text-white transition hover:bg-blue-500"
                >
                  가입 신청서 제출
                </button>
              )}

              {academicRecordApplicationStatus === "BANNED" && (
                <div className="w-full rounded-lg bg-gray-300 py-3 text-white transition hover:bg-gray-400">
                  재학 증빙 서류 제출 (가입 신청서 승인 시 활성화)
                </div>
              )}

              {academicRecordApplicationStatus === "COMPLETE" && (
                <div className="w-full rounded-lg bg-gray-300 py-3 text-white transition hover:bg-gray-400">
                  재학 증빙 서류 제출됨 (승인이 완료되면 서비스 사용가능)
                </div>
              )}

              {academicRecordApplicationStatus === "REJECT" && (
                <button
                  onClick={() => {
                    setIsAcademicModalOpen(true);
                  }}
                  className="w-full rounded-lg bg-focus py-3 text-white transition hover:bg-blue-500"
                >
                  재학 증빙 서류 거절됨 (다시 제출하기)
                  </button>
              )}

              {academicRecordApplicationStatus === "UNDONE" && (
                <button
                  onClick={() => {
                    setIsAcademicModalOpen(true);
                  }}
                  className="w-full rounded-lg bg-focus py-3 text-white transition hover:bg-blue-500"
                >
                  재학 증빙 서류 제출
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
