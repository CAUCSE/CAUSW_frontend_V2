'use client';

/**
 * ProfileForm.tsx
 * - "환경설정"-"개인정보 관리"
 */
import React, { useEffect } from 'react';

import dynamic from 'next/dynamic';

import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

// 유저 리펙 TODO: 엔티티 간 import 배제 필요
import { checkNicknameDuplicate } from '@/fsd_entities/auth/api/get';

import { updateInfo } from '../../api';
import { userQueryKey } from '../../config/queryKeys/userQueryKey';

interface FeeInfoProps {
  studentCouncilFeeStatus: string;
  paidFeeSemesters: string;
  remainingFeeSemesters: string;
}

interface ProfileFormProps {
  userData: any;
  feeInfo: FeeInfoProps;
}

const PreviousButton = dynamic(() => import('@/fsd_shared').then((mod) => mod.PreviousButton), {
  ssr: false,
});
const Header = dynamic(() => import('@/fsd_shared').then((mod) => mod.Header), {
  ssr: false,
});
const UserInfoContainer = dynamic(() => import('./UserInfoContainer').then((mod) => mod.UserInfoContainer), {
  ssr: false,
});
const ProfileEditForm = dynamic(() => import('./forms/ProfileEditForm').then((mod) => mod.ProfileEditForm), {
  ssr: false,
});

export const ProfileForm: React.FC<ProfileFormProps> = ({ userData, feeInfo }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<User.userUpdateDto>();

  const queryClient = useQueryClient();
  // 프로필 이미지 변경
  const [profileImagePreview, setProfileImagePreview] = React.useState(
    userData.profileImageUrl ?? '/images/default_profile.png',
  );

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProfileImagePreview(newImageUrl);
      setValue('profileImage', file);
    }
  };

  // 닉네임 중복 검사
  const handleNicknameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const nickname = e.target.value.trim();

    if (!nickname || nickname === userData.nickname) return;

    // react-hook-form의 기본 validation이 통과한 경우에만 중복 검사 수행
    if (nickname.length >= 1 && nickname.length <= 16) {
      const isDuplicate = await checkNicknameDuplicate(nickname);
      if (isDuplicate) {
        setError('nickname', {
          type: 'duplicate',
          message: '이미 사용 중인 닉네임입니다.',
        });
      } else {
        clearErrors('nickname');
      }
    }
  };

  // 제출 핸들러
  const onSubmit = async (data: User.userUpdateDto, event: any) => {
    try {
      event.preventDefault();
      await updateInfo(data);
      toast.success('변경 사항이 저장되었습니다.');
      queryClient.invalidateQueries({ queryKey: userQueryKey.all });
    } catch (error: any) {
      if (error.status === 400) {
        toast.error('중복된 닉네임입니다.');
      } else {
        toast.error('알 수 없는 에러가 발생했습니다.');
      }
    }
  };
  useEffect(() => {
    setValue('nickname', userData.nickname);
    setValue('phoneNumber', userData.phoneNumber);
    setValue('profileImage', null);
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <div className="mb-2 h-12">
        <PreviousButton />
      </div>
      <Header big bold>
        개인정보 관리
      </Header>

      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
        <ProfileEditForm
          profileImagePreview={profileImagePreview}
          register={register}
          handleProfileImageChange={handleProfileImageChange}
          handleNicknameBlur={handleNicknameBlur}
          errors={errors}
          userData={userData}
        />

        <UserInfoContainer userData={userData} feeInfo={feeInfo} />
      </div>

      <div className="mt-8 flex justify-center">
        <button type="submit" className="bg-focus w-32 rounded-3xl p-3 text-white hover:bg-blue-400 lg:w-80">
          변경 사항 저장
        </button>
      </div>
    </form>
  );
};
