'use client';

import React from 'react';

import { AcademicRecordForm } from '@/fsd_widgets/auth';

import { useMyInfo } from '@/fsd_entities/user/model';

const UpdataeAcademicRecordPage = () => {
  const { data: userInfo } = useMyInfo();
  
  if (!userInfo) return <div>Loading...</div>;
  
  return (
    <div className="p-3">
      <AcademicRecordForm curAcademicStatus={userInfo.academicStatus} />
    </div>
  );
};

export default UpdataeAcademicRecordPage;
