"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASEURL, useLayoutStore, getRccAccess } from "@/shared";
import { FormInput, FormSubmitButton, FormErrorMessage } from "@/entities";

interface PasswordResetData {
  originPassword: string;
  updatedPassword: string;
}

const PasswordResetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordResetData>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setErrorMessageGlobal = useLayoutStore(
    (state) => state.setErrorMessage,
  );

  const onSubmit = async (data: PasswordResetData) => {
    const accessToken = getRccAccess();

    if (!accessToken) {
      setErrorMessageGlobal("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.put(
        `${BASEURL}/api/v1/users/password`,
        data,
        {
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        setSuccessMessage("비밀번호가 성공적으로 변경되었습니다.");
        setErrorMessage(null);
        reset(); // 폼 초기화
      } else {
        setErrorMessage("비밀번호 변경에 실패했습니다.");
        setSuccessMessage(null);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(
          error.response.data.message || "비밀번호 변경에 실패했습니다.",
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
