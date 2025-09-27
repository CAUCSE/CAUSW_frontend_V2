import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { usePostSignUp } from '../queries';

const allowedKeys = [
  'email',
  'nickname',
  'password',
  'studentId',
  'name',
  'department',
  'phoneNumber',
  'admissionYear',
] as const;

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User.SignUpForm>({ mode: 'onBlur' });

  const submitSignUp = usePostSignUp();

  const onSubmit = (data: User.SignUpForm) => {
    const postData = {
      ...data,
      admissionYear: data.admissionYearString,
    };

    const newPostData = allowedKeys.reduce(
      (acc, key) => {
        if (key === 'studentId' && !postData[key]) {
          return acc;
        }
        acc[key] = postData[key];
        return acc;
      },
      {} as Record<string, any>,
    );
    submitSignUp.mutate(newPostData as User.SignUpFormPost);
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
