'use client';

import React from 'react';

import { notFound } from 'next/navigation';

import { AcademicRecordForm } from '@/widgets/auth';

import { useUserAcademic } from '@/entities/user/model';

import { LoadingComponent } from '@/shared/ui';

const UpdataeAcademicRecordPage = () => {
  const { data: userInfo, isLoading } = useUserAcademic();

  if (isLoading) return <LoadingComponent />;
  if (!userInfo) return notFound();

  return (
    <div className="p-3">
      <AcademicRecordForm curAcademicStatus={userInfo.academicStatus} />
    </div>
  );
};

export default UpdataeAcademicRecordPage;
