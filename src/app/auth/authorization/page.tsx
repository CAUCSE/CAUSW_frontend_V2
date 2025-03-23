"use client";

import React, { useEffect, useState } from "react";
import { PreviousButton, UserService } from "@/shared";
import SubmitAcademicRecordModal from "@/_deprecated/entities/auth/AcademicRecordInput";
import SubmitApplicationModal from "@/_deprecated/entities/auth/AdmissionApplicationPage";
import { VerificationStatus } from "@/_deprecated/widget";

const VerificationPage: React.FC = () => {
  const { getUserAdmissionInfo, getMyInfo, checkIsAcademicRecordSubmitted } =
    UserService();
  const [isAcademicRecordModalOpen, setIsAcademicModalOpen] = useState(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  // UNDONE, AWAIT, REJECT, COMPLETE로 관리
  const [admissionApplicationStatus, setAdmissionApplicationStatus] =
    useState<User.StatusType>("BANNED");

  // BANNED, UNDONE, COMPLETE로 관리
  const [academicRecordApplicationStatus, setAcademicRecordApplicationStatus] =
    useState<User.StatusType>("BANNED");

  // 거절 사유 출력 부분
  const [admissionRejectMessage, setAdmissionRejectMessage] = useState("");
  const [academicRecordRejectMessage, setAcademicRecordRejectMessage] =
    useState("");

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await getMyInfo();
        // 상태 값들 가져오기
        const { state, rejectionOrDropReason, email } = response.data;
        // 상태 업데이트
        setEmailValue(email);
        // 조건문 처리 (상태 값이 올바르게 설정된 후에 처리)
        if (state === "REJECT") {
          setAdmissionApplicationStatus("REJECTED");
          setAcademicRecordApplicationStatus("BANNED");
          setAdmissionRejectMessage(rejectionOrDropReason);
          return;
        }

        if (state === "AWAIT") {
          setAcademicRecordApplicationStatus("BANNED");
          return checkAdmissionApplication(); // AWAIT인 경우 학적 상태 증빙 서류 제출 못하니까 admissionapplication 체크
        }

        if (state === "ACTIVE") {
          setAdmissionApplicationStatus("COMPLETE");
          return checkAcademicRecordApplication(); // AWAIT가 아닌 경우 학적 상태 증빙 서류 제출 필요 academicrecordapplication 체크
        }
      } catch (error) {}
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
      const { isRejected, rejectMessage } = (
        await checkIsAcademicRecordSubmitted()
      ).data;
      if (isRejected) {
        setAcademicRecordApplicationStatus("REJECTED");
        setAcademicRecordRejectMessage(rejectMessage);
      } else {
        setAcademicRecordApplicationStatus("COMPLETE");
      }
    } catch (error) {
      setAcademicRecordApplicationStatus("UNDONE");
    }
  };

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
        <>
          <PreviousButton />
          <VerificationStatus
            admissionApplicationStatus={admissionApplicationStatus}
            academicRecordApplicationStatus={academicRecordApplicationStatus}
            onAdmissionClick={() => setIsAdmissionModalOpen(true)}
            onAcademicRecordClick={() => setIsAcademicModalOpen(true)}
          />
        </>
      )}
    </div>
  );
};

export default VerificationPage;
