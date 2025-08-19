import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useUserProfile } from '@/fsd_entities/user/model';

import { usePostAdmission } from '../queries';

export const useAdmissionForm = () => {
  const { data: userInfo } = useUserProfile();

  const email = userInfo?.email || '';
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User.AdmissionCreateRequestDto>({ mode: 'onBlur' });

  const submitAdmission = usePostAdmission();

  const onSubmit = (data: User.AdmissionCreateRequestDto) => {
    if (!data.attachImage) {
      toast.error('이미지를 첨부해주세요.');
      return;
    }
    submitAdmission.mutate(data);
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
