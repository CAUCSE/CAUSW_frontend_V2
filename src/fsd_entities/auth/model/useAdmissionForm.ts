import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { set, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useMyInfoStore } from '@/fsd_entities/user/model';

import { submitAdmissionsApplication } from '../api/post';

export const useAdmissionForm = () => {
  const router = useRouter();

  const email = useMyInfoStore((state) => state.email);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User.AdmissionCreateRequestDto>({ mode: 'onBlur' });

  const mutation = useMutation({
    mutationFn: submitAdmissionsApplication,
    onSuccess: () => {
      toast.success('가입 신청서 제출이 완료되었습니다!');
      setTimeout(() => {
        router.push('/auth/authorization');
      }, 500);
    },
    onError: (error: any) => {
      toast.error('가입 신청서 제출 실패: ' + (error || '오류가 발생했습니다.'));
    },
  });

  const onSubmit = (data: User.AdmissionCreateRequestDto) => {
    if (!data.attachImage) {
      toast.error('이미지를 첨부해주세요.');
      return;
    }
    mutation.mutate(data);
  };

  const onInvalid = () => {
    toast.error('모든 항목을 조건에 맞게 입력해주세요.');
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    onInvalid,
    setValue,
    email,
  };
};
