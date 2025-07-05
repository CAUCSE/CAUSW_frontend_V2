'use client';

import React from 'react';

import { AcademicRecordForm } from '@/fsd_widgets/auth';

import { useMyInfoStore } from '@/fsd_entities/user/model';

const UpdataeAcademicRecordPage = () => {
  const curAcademicStatus = useMyInfoStore((state) => state.academicStatus);
  return <AcademicRecordForm curAcademicStatus={curAcademicStatus} />;
};

export default UpdataeAcademicRecordPage;
