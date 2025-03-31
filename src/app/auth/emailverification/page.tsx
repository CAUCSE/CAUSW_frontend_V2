"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FormInput, FormSubmitButton, FormErrorMessage } from "@/entities";

interface FormData {
  verificationCode: string;
}

const EmailVerificationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // 이메일 인증 번호 확인 로직 구현
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 sm:px-0">
      {/* 반응형 디자인 추가 */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="mb-4 text-xl font-semibold">이메일 인증 번호</h2>
        <FormInput
          name="verificationCode"
          type="text"
          placeholder="인증 번호를 입력해주세요"
          register={register}
          rules={{ required: "인증 번호를 입력해주세요." }}
        />
        <FormErrorMessage message={errors.verificationCode?.message} />

        <FormSubmitButton />
      </form>
    </div>
  );
};

export default EmailVerificationPage;
