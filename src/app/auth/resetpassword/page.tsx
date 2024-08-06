"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormSubmitButton } from '../../../../src/entities/input/FormInput';
import FormErrorMessage from '../../../../src/entities/layout/FormErrorMessage';

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ResetPasswordPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => setShowCurrentPassword(!showCurrentPassword);
  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmNewPasswordVisibility = () => setShowConfirmNewPassword(!showConfirmNewPassword);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // 비밀번호 변경 로직 구현
  };

  const newPassword = watch("newPassword");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 sm:px-0">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">현재 비밀번호</h2>
        <div className="relative">
          <FormInput
            name="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            placeholder="현재 비밀번호를 입력해주세요"
            register={register}
            rules={{ required: '현재 비밀번호를 입력해주세요.' }}
          />
          <button
            type="button"
            onClick={toggleCurrentPasswordVisibility}
            className="absolute right-2 top-2 px-3 py-1 text-sm leading-5 bg-gray-300 rounded focus:outline-none"
          >
            {showCurrentPassword ? "숨김" : "보기"}
          </button>
        </div>
        <FormErrorMessage message={errors.currentPassword?.message} />

        <h2 className="text-xl font-semibold mt-4 mb-4">새 비밀번호</h2>
        <div className="relative">
          <FormInput
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="새 비밀번호를 입력해주세요"
            register={register}
            rules={{ required: '새 비밀번호를 입력해주세요.' }}
          />
          <button
            type="button"
            onClick={toggleNewPasswordVisibility}
            className="absolute right-2 top-2 px-3 py-1 text-sm leading-5 bg-gray-300 rounded focus:outline-none"
          >
            {showNewPassword ? "숨김" : "보기"}
          </button>
        </div>
        <FormErrorMessage message={errors.newPassword?.message} />

        <h2 className="text-xl font-semibold mt-4 mb-4">새 비밀번호 확인</h2>
        <div className="relative">
          <FormInput
            name="confirmNewPassword"
            type={showConfirmNewPassword ? "text" : "password"}
            placeholder="새 비밀번호를 다시 입력해주세요"
            register={register}
            rules={{
              required: '새 비밀번호를 다시 입력해주세요.',
              validate: value => value === newPassword || '비밀번호가 일치하지 않습니다.'
            }}
          />
          <button
            type="button"
            onClick={toggleConfirmNewPasswordVisibility}
            className="absolute right-2 top-2 px-3 py-1 text-sm leading-5 bg-gray-300 rounded focus:outline-none"
          >
            {showConfirmNewPassword ? "숨김" : "보기"}
          </button>
        </div>
        <FormErrorMessage message={errors.confirmNewPassword?.message} />

        <FormSubmitButton />
      </form>
    </div>
  );
};

export default ResetPasswordPage;


