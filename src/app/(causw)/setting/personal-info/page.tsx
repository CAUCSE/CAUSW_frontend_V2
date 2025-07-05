'use client';

import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getMyCouncilFeeInfo, getMyInfo } from '@/fsd_entities/user/api';
import { userQueryKey } from '@/fsd_entities/user/config';
import { ProfileForm } from '@/fsd_entities/user/ui';

import { LoadingComponent } from '@/entities';

const PersonalInfoPage = () => {
  const [feeInfo, setFeeInfo] = useState({
    studentCouncilFeeStatus: '',
    paidFeeSemesters: '',
    remainingFeeSemesters: '',
  });

  // 유저 정보 가져오기
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: userQueryKey.all,
    queryFn: async () => {
      const response = await getMyInfo();
      return response.data;
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseUserCouncilFeeData = await getMyCouncilFeeInfo();
        const userCouncilFeeData = responseUserCouncilFeeData.data;

        setFeeInfo({
          studentCouncilFeeStatus: userCouncilFeeData.isAppliedThisSemester ? 'O' : 'X',
          paidFeeSemesters: `${userCouncilFeeData.numOfPaidSemester}학기`,
          remainingFeeSemesters: `${userCouncilFeeData.restOfSemester}학기`,
        });
      } catch (error: any) {
        setFeeInfo({
          studentCouncilFeeStatus: 'X',
          paidFeeSemesters: '0학기',
          remainingFeeSemesters: '0학기',
        });
      }
    };
    fetchUserData();
  }, []);

  if (isLoading) return <LoadingComponent />;
  if (error) return <p>에러 발생</p>;

  return (
    <div className="p-3">
      <ProfileForm userData={userData} feeInfo={feeInfo} />
    </div>
  );
};

export default PersonalInfoPage;
