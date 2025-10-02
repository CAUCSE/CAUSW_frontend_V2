import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { parseErrorMessage } from '@/shared';

import { resetPassword } from '../../api';

export const useResetPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<User.ResetPasswordFormData>();

  const onSubmit = async (data: User.ResetPasswordFormData) => {
    try {
      const { confirmPassword: _confirmPassword, ...submitData } = data;
      await resetPassword(submitData);
      toast.success('비밀번호가 성공적으로 변경되었습니다.');

      router.push('/setting');
    } catch (error: unknown) {
      toast.error(parseErrorMessage(error, '알 수 없는 오류가 발생했습니다.'));
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
