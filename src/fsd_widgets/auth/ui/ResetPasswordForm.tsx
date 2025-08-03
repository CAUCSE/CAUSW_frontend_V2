'use client';

import { useRouter } from 'next/navigation';

import { AuthFormSubmitButton, AuthInput } from '@/fsd_entities/auth';
import { useResetPasswordForm } from '@/fsd_entities/auth/model/useResetPasswordForm';

import { PreviousButton } from '@/fsd_shared';

export const ResetPasswordForm = () => {
  const router = useRouter();
  const validatePasswordMatch = (value: string) => {
    const password = watch('updatedPassword');
    return value === password || '새로운 비밀번호가 일치하지 않습니다';
  };

  const { register, handleSubmit, errors, onSubmit, onInvalid, watch } = useResetPasswordForm();

  return (
    <div className="flex h-screen w-full min-w-80 flex-col rounded-md p-2">
      <PreviousButton routeCallback={() => router.back()} />
      <div className="flex h-full w-full min-w-80 flex-col items-center justify-center gap-y-4 rounded-md p-8">
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex w-full min-w-80 flex-col items-center justify-center gap-y-4 rounded-md p-8"
        >
          <AuthInput
            register={register}
            name="originPassword"
            type="password"
            rules={{ required: '기존 비밀번호를 입력해주세요' }}
            label="기존 비밀번호"
            placeholder="기존 비밀번호를 입력해주세요"
            errorMessage={errors.originPassword?.message}
          />
          <AuthInput
            register={register}
            name="updatedPassword"
            type="password"
            rules={{ required: '새로운 비밀번호를 입력해주세요' }}
            label="새로운 비밀번호"
            placeholder="새로운 비밀번호를 입력해주세요"
            errorMessage={errors.updatedPassword?.message}
          />
          <AuthInput
            register={register}
            name="confirmPassword"
            type="password"
            rules={{
              required: '새로운 비밀번호를 다시 입력해주세요',
              validate: validatePasswordMatch,
            }}
            label="새로운 비밀번호 확인"
            placeholder="새로운 비밀번호를 다시 입력해주세요"
            errorMessage={errors.confirmPassword?.message}
          />
          <AuthFormSubmitButton content="비밀번호 변경" />
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
