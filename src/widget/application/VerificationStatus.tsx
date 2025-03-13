import { StatusButton } from '@/entities';
import React from 'react';

const ADMISSION_MESSAGES = {
    AWAIT: '가입 신청서 제출됨 (승인 대기중)',
    COMPLETE: '가입 신청서 제출 완료됨 (승인 완료)',
    REJECTED: '가입 신청서 거절됨 (다시 제출하기)',
    UNDONE: '가입 신청서 제출하기',
    BANNED: '신청 불가',
  } 
  
  const ACADEMIC_MESSAGES = {
    AWAIT: '재학 증빙 서류 제출됨 (승인 대기중)',
    COMPLETE: '재학 증빙 서류 제출됨 (승인 완료)',
    REJECTED: '재학 증빙 서류 거절됨 (다시 제출하기)',
    UNDONE: '재학 증빙 서류 제출하기',
    BANNED: '재학 증빙 서류 제출 (가입 신청서 승인 시 활성화)'
  } 


interface VerificationStatusProps {
  admissionApplicationStatus: User.StatusType;
  academicRecordApplicationStatus: User.StatusType;
  onAdmissionClick: () => void;
  onAcademicRecordClick: () => void;
}

export const VerificationStatus: React.FC<VerificationStatusProps> = ({
  admissionApplicationStatus,
  academicRecordApplicationStatus,
  onAdmissionClick,
  onAcademicRecordClick,
}) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">본인 인증 안내</h1>
        <p className="mb-4 text-gray-600">
          서비스 이용을 위해 본인 인증이 필요합니다.
        </p>
        <p className="mb-4 text-gray-600">
          신청서와 재학 증빙 서류를 제출해 주세요.
        </p>

        <div className="mt-6 space-y-4">
          <StatusButton
            status={admissionApplicationStatus}
            messages={ADMISSION_MESSAGES}
            onClick={onAdmissionClick}
          />

          <StatusButton
            status={academicRecordApplicationStatus}
            messages={ACADEMIC_MESSAGES}
            onClick={onAcademicRecordClick}
          />
        </div>
      </div>
    </div>
  );
};

