'use client';

/**
 * ProfileEditForm.tsx
 * - "환경설정"-"개인정보 관리"-정보 수정 가능 영역
 */
import { useRouter } from 'next/navigation';

import { UseFormRegister } from 'react-hook-form';

import { ACCEPTED_IMAGE_TYPES } from '@/entities/post/config/fileUploadRule';

import { MESSAGES } from '@/shared';

interface ProfileEditFormProps {
  profileImagePreview: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  handleProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNicknameBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  userData: {
    profileImage: string;
    nickname: string;
    academicStatus: string;
  };
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  profileImagePreview,
  register,
  handleProfileImageChange,
  handleNicknameBlur,
  errors,
  userData,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center lg:flex lg:items-center lg:justify-center">
      {/* 프로필 사진 */}
      <img
        src={profileImagePreview}
        alt="프로필"
        className="mb-4 h-32 w-32 rounded-full object-cover lg:h-32 lg:w-32"
      />
      <p className="mb-2 text-sm text-gray-400">{MESSAGES.FILE_TYPE_INFO}</p>

      <label
        htmlFor="profileImage"
        className="text-black-500 bg-focus flex w-32 cursor-pointer justify-center rounded-3xl p-3 text-sm text-white hover:bg-blue-400 lg:w-40"
      >
        프로필 사진 수정
      </label>
      <input
        type="file"
        id="profileImage"
        className="hidden"
        accept={ACCEPTED_IMAGE_TYPES}
        {...register('profileImage')}
        onChange={handleProfileImageChange}
      />

      {/* 닉네임 입력 */}
      <div className="mt-4 flex w-full flex-row lg:flex-col">
        <div className="mb-4 ml-4 w-1/2 lg:w-full">
          <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
            닉네임
          </label>
          <input
            type="text"
            {...register('nickname', {
              required: '닉네임을 입력해주세요.',
              minLength: {
                value: 1,
                message: '닉네임은 1글자 이상 입력해주세요.',
              },
              maxLength: {
                value: 16,
                message: '닉네임은 16글자 이내로 입력해주세요.',
              },
            })}
            onBlur={handleNicknameBlur}
            className="w-full rounded-md border border-gray-300 p-2 lg:w-5/6"
          />
          {errors.nickname && (
            <p className="text-red-500">{errors.nickname.message}</p>
          )}
        </div>

        {/* 학적 상태 */}
        <div className="mb-4 ml-4 w-1/2 lg:w-full">
          <div className="w-full lg:w-full">
            <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
              학적 상태
            </label>
            <div className="flex w-full flex-row flex-wrap rounded-md sm:flex-nowrap lg:w-5/6">
              <div className="mr-2 mb-2 w-full rounded-md border border-gray-300 p-2 text-center lg:w-3/6">
                {userData.academicStatus === 'ENROLLED' && <>재학</>}
                {userData.academicStatus === 'LEAVE_OF_ABSENCE' && <>휴학</>}
                {userData.academicStatus === 'GRADUATED' && <>졸업</>}
              </div>
              <div
                onClick={() =>
                  router.push('/setting/personal-info/update-academic-record')
                }
                className="bg-focus mr-2 mb-2 w-full rounded-md border border-gray-300 p-2 text-center text-white hover:bg-blue-400 lg:w-5/6"
              >
                학적 상태 수정
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
