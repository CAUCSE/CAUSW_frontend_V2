'use client';

import { useQuery } from '@tanstack/react-query';

import { getMyInfo } from '../../api';
import { userQueryKey } from '../../config/queryKeys/userQueryKey';

// 학적 관련 유틸리티 함수들
export const isGraduate = (academicStatus: string) => {
  return academicStatus === 'GRADUATED';
};

// 학적 관련 데이터 Hooks
export const useUserAcademic = () => {
  return useQuery({
    queryKey: userQueryKey.all,
    queryFn: getMyInfo,
    select: (data) => ({
      academicStatus: data.academicStatus,
      major: data.major,
      admissionYear: data.admissionYear,
      studentId: data.studentId,
      currentCompletedSemester: data.currentCompletedSemester,
      graduationType: data.graduationType,
      graduationYear: data.graduationYear,
    }),
    staleTime: 1000 * 60 * 5,
  });
};
