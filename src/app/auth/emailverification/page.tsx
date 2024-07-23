"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormSubmitButton } from '../../../entities/input/FormInput';
import FormErrorMessage from '../../../entities/layout/FormErrorMessage';

interface FormData {
  verificationCode: string;
}

const EmailVerificationPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // 이메일 인증 번호 확인 로직 구현
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">이메일 인증 번호</h2>
        <FormInput
          name="verificationCode"
          type="text"
          placeholder="인증 번호를 입력해주세요"
          register={register}
          rules={{ required: '인증 번호를 입력해주세요.' }}
        />
        <FormErrorMessage message={errors.verificationCode?.message} />

        <FormSubmitButton />
      </form>
    </div>
  );
};

export default EmailVerificationPage;
