'use client';

import React from 'react';

import { AcademicRecordForm } from '@/fsd_widgets/auth';

import { useUserStore } from '@/shared';

const UpdataeAcademicRecordPage = () => {
  const curAcademicStatus = useUserStore((state) => state.academicStatus);
  return <AcademicRecordForm curAcademicStatus={curAcademicStatus} />;
};

export default UpdataeAcademicRecordPage;
