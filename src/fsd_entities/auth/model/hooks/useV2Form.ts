import { useForm } from 'react-hook-form';

import { updateInfo, updateVTwo } from '@/fsd_entities/user/api';
import { useUserProfile } from '@/fsd_entities/user/model';
import { checkNicknameDuplicate } from '../../api/get';


export const useV2Form = () => {
  const { data: userInfo } = useUserProfile();
  const checkVTwo = userInfo?.isV2 || true;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    nickname: string;
    phoneNumberHyphen: string;
  }>({ mode: 'onBlur' });

  // 닉네임 중복 검사
  const onSubmit = async (data: { nickname: string; phoneNumberHyphen: string }) => {
    await updateInfo({
      nickname: data.nickname,
      phoneNumber: data.phoneNumberHyphen,
      profileImage: null,
    });
    await updateVTwo();
    window.location.href = '/home';
  };

  return { register, handleSubmit, errors, onSubmit, checkVTwo, checkNicknameDuplicate };
};
