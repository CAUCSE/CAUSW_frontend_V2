'use client';

import React from 'react';

import { AcademicRecordForm } from '@/fsd_widgets/auth';

import { useUserAcademic } from '@/fsd_entities/user/model';
import { LoadingComponent } from '@/fsd_shared/ui';
import { notFound } from 'next/navigation';

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
