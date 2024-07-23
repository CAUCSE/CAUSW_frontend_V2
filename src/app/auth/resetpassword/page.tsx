"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormSubmitButton } from '../../../entities/input/FormInput';
import FormErrorMessage from '../../../entities/layout/FormErrorMessage';

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ResetPasswordPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // 비밀번호 변경 로직 구현
  };

  const newPassword = watch("newPassword");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">현재 비밀번호</h2>
        <FormInput
          name="currentPassword"
          type="password"
          placeholder="현재 비밀번호를 입력해주세요"
          register={register}
          rules={{ required: '현재 비밀번호를 입력해주세요.' }}
        />
        <FormErrorMessage message={errors.currentPassword?.message} />

        <h2 className="text-xl font-semibold mt-4 mb-4">새 비밀번호</h2>
        <FormInput
          name="newPassword"
          type="password"
          placeholder="새 비밀번호를 입력해주세요"
          register={register}
          rules={{ required: '새 비밀번호를 입력해주세요.' }}
        />
        <FormErrorMessage message={errors.newPassword?.message} />

        <h2 className="text-xl font-semibold mt-4 mb-4">새 비밀번호 확인</h2>
        <FormInput
          name="confirmNewPassword"
          type="password"
          placeholder="새 비밀번호를 다시 입력해주세요"
          register={register}
          rules={{
            required: '새 비밀번호를 다시 입력해주세요.',
            validate: value => value === newPassword || '비밀번호가 일치하지 않습니다.'
          }}
        />
        <FormErrorMessage message={errors.confirmNewPassword?.message} />

        <FormSubmitButton />
      </form>
    </div>
  );
};

export default ResetPasswordPage;
