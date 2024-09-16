"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput, FormSubmitButton, FormErrorMessage } from "@/entities";
import axios from "axios";
import { BASEURL } from "@/shared";

interface PasswordResetData {
  originPassword: string;
  updatedPassword: string;
}

const PasswordResetPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordResetData>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: PasswordResetData) => {
    try {
      const response = await axios.put(
        `${BASEURL}/api/v1/users/password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        setSuccessMessage("비밀번호가 성공적으로 재설정되었습니다.");
        setErrorMessage(null);
        reset(); // 폼을 제출 후 초기화
      } else {
        setErrorMessage("비밀번호 재설정에 실패했습니다.");
        setSuccessMessage(null);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(
          error.response.data.message || "비밀번호 재설정에 실패했습니다.",
        );
      } else {
        setErrorMessage("서버와 통신하는 도중 오류가 발생했습니다.");
      }
      setSuccessMessage(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 sm:px-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="mb-4 text-xl font-semibold">비밀번호 재설정</h2>

        <FormInput
          name="originPassword"
          type="password"
          placeholder="현재 비밀번호를 입력하세요."
          register={register}
          rules={{ required: "현재 비밀번호를 입력해주세요." }}
        />
        <FormErrorMessage message={errors.originPassword?.message} />

        <FormInput
          name="updatedPassword"
          type="password"
          placeholder="새로운 비밀번호를 입력하세요."
          register={register}
          rules={{ required: "새로운 비밀번호를 입력해주세요." }}
        />
        <FormErrorMessage message={errors.updatedPassword?.message} />

        {errorMessage && <FormErrorMessage message={errorMessage} />}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <FormSubmitButton />
      </form>
    </div>
  );
};

export default PasswordResetPage;
