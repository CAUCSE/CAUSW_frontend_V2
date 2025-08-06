import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { resetPassword } from '../../api/post';

export const useResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<User.ResetPasswordFormData>();

  const onSubmit = async (data: User.ResetPasswordFormData) => {
    try {
      const { confirmPassword, ...submitData } = data;
      await resetPassword(submitData);
      toast.success('비밀번호가 성공적으로 변경되었습니다.');
      setTimeout(() => {
        reset();
      }, 300);
    } catch (error: any) {
      toast.error(error.response?.data?.message || '알 수 없는 오류가 발생했습니다.');
    }
  };

  const onInvalid = () => {
    toast.error('입력값을 확인해주세요.');
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    onInvalid,
    watch,
  };
};
