'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { VerificationHeader, VerificationStatus } from '@/fsd_widgets/auth';

import { useVerification } from '@/fsd_entities/auth';

import { PreviousButton } from '@/fsd_shared';

const VerificationPage: React.FC = () => {
  const {
    emailValue,
    admissionApplicationStatus,
    academicRecordApplicationStatus,
    admissionRejectMessage,
    academicRecordRejectMessage,
  } = useVerification();

  const router = useRouter();

  return (
    <div className="bg-board-page-background flex h-screen items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <PreviousButton routeCallback={() => router.push('./signin')} />
      </div>
      <div className="w-full max-w-lg rounded-lg bg-white p-8 text-center shadow-md">
        <VerificationHeader />

        {(admissionRejectMessage || academicRecordRejectMessage) && (
          <p className="text-error font-bold break-words">
            {' '}
            {academicRecordRejectMessage === '' ? '가입 신청서' : '재학 증빙 서류'} 거절 사유 :{' '}
            {admissionRejectMessage || academicRecordRejectMessage}
          </p>
        )}

        <VerificationStatus
          admissionApplicationStatus={admissionApplicationStatus}
          academicRecordApplicationStatus={academicRecordApplicationStatus}
          onAdmissionClick={() => router.push('/auth/authorization/admission')}
          onAcademicRecordClick={() => router.push('/auth/authorization/academic-record')}
        />
      </div>
    </div>
  );
};

export default VerificationPage;
