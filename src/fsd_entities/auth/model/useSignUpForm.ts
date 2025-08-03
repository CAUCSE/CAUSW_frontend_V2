import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { signup } from '@/fsd_entities/auth/api/post';

const allowedKeys = [
  'email',
  'nickname',
  'password',
  'studentId',
  'name',
  'major',
  'phoneNumber',
  'admissionYear',
] as const;

export const useSignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User.SignUpForm>({ mode: 'onBlur' });

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다!');
      setTimeout(() => {
        router.push('/auth/signin');
      }, 500);
    },
    onError: (error: any) => {
      toast.error('회원가입 실패: ' + (error.message || '오류가 발생했습니다.'));
    },
  });

  const onSubmit = (data: User.SignUpForm) => {
    const postData = {
      ...data,
      admissionYear: data.admissionYearString,
    };

    const newPostData = allowedKeys.reduce(
      (acc, key) => {
        acc[key] = postData[key];
        return acc;
      },
      {} as Record<string, any>,
    );
    mutation.mutate(newPostData as User.SignUpFormPost);
  };

  const onInvalid = () => {
    toast.error('모든 항목을 조건에 맞게 입력해주세요.');
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    onInvalid,
  };
};
