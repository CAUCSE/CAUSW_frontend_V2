import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { AcademicRecordService } from '@/shared';

export const useSubmitAcademicRecord = (onClose: () => void, academicStatus: string) => {
  const router = useRouter();
  const { postAcademicRecord } = AcademicRecordService();

  return useMutation({
    mutationFn: async (data: User.CreateUserAcademicRecordApplicationRequestDto) => {
      // 불필요한 데이터 정리 (GRADUATED, ENROLLED 조건 적용)
      if (data.targetAcademicStatus !== 'GRADUATED') {
        data.graduationType = null;
        data.graduationYear = null;
      }
      if (data.targetAcademicStatus !== 'ENROLLED') {
        data.images = null;
      }

      return postAcademicRecord(data);
    },
    onSuccess: () => {
      toast.success('학적 증빙 서류 제출이 완료되었습니다.');
      // setTimeout(() => {
      //   academicStatus === 'ENROLLED' ? onClose() : router.push('/auth/signin');
      // }, 500);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || '학적 증빙 서류 제출에 실패했습니다.');
    },
  });
};
