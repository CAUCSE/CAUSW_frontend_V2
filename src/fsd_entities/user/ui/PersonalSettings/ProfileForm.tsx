'use client';

/**
 * ProfileForm.tsx
 * - "환경설정"-"개인정보 관리"
 */
import React, { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

// 유저 리펙 TODO: 엔티티 간 import 배제 필요
import { checkNicknameDuplicate } from '@/fsd_entities/auth/api/get';

import { Header, PreviousButton } from '@/fsd_shared';
import { useUserStore } from '@/shared';

import { updateInfo } from '../../api/put';
import { userQueryKey } from '../../config/queryKey/userQueryKey';
import { ProfileEditForm } from './forms/ProfileEditForm';
import { UserInfoContainer } from './UserInfoContainer';

interface FeeInfoProps {
  studentCouncilFeeStatus: string;
  paidFeeSemesters: string;
  remainingFeeSemesters: string;
}

interface ProfileFormProps {
  userData: any;
  feeInfo: FeeInfoProps;
}

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
  const setUserStore = useUserStore((state) => state.setUserStore);
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

  // 닉네임 중복 검사 및 유효성 체크
  const handleNicknameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const nickname = e.target.value;

    if (!nickname || nickname === userData.nickname) return;

    if (nickname.length < 1 || nickname.length > 16) {
      setError('nickname', {
        type: 'length',
        message: '닉네임은 1글자 이상 16글자 이내로 입력해주세요.',
      });
      return;
    } else {
      clearErrors('nickname');
    }

    const isDuplicate = await checkNicknameDuplicate(nickname);
    if (isDuplicate) {
      setError('nickname', {
        type: 'duplicate',
        message: '이미 사용 중인 닉네임입니다.',
      });
    } else {
      clearErrors('nickname');
    }
  };

  const refreshSideBar = (profileImageUrl: File) => {
    setUserStore({
      ...userData, // 기존 데이터 유지
      profileImageUrl: URL.createObjectURL(profileImageUrl),
    });
  };

  // 제출 핸들러
  const onSubmit = async (data: User.userUpdateDto, event: any) => {
    try {
      event.preventDefault();
      await updateInfo(data);
      toast.success('변경 사항이 저장되었습니다.');
      queryClient.invalidateQueries({ queryKey: userQueryKey.all });
      if (data.profileImage) {
        refreshSideBar(data.profileImage);
      }
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
