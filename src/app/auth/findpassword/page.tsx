"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput, FormSubmitButton, FormErrorMessage } from "@/entities";
import axios from "axios";
import { BASEURL } from "@/shared";

interface FormData {
  name: string;
  studentId: string;
  phoneNumber: string; // contact -> phoneNumber로 변경
  email: string;
}

const FindPasswordPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.put(
        `${BASEURL}/api/v1/users/password/find`,
        {
          name: data.name,
          studentId: data.studentId,
          phoneNumber: data.phoneNumber, // 필드명 변경
          email: data.email,
        },
      );

      if (response.status === 200) {
        setSuccessMessage("비밀번호 재설정 이메일이 전송되었습니다.");
        setErrorMessage(null);
      } else {
        setErrorMessage("비밀번호 찾기에 실패했습니다.");
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Error: ", error);
      setErrorMessage("서버와 통신하는 도중 오류가 발생했습니다.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 sm:px-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="mb-4 text-xl font-semibold">이름</h2>
        <FormInput
          name="name"
          type="text"
          placeholder="이름을 입력해주세요"
          register={register}
          rules={{ required: "이름을 입력해주세요." }}
        />
        <FormErrorMessage message={errors.name?.message} />

        <h2 className="mb-4 mt-4 text-xl font-semibold">학번</h2>
        <FormInput
          name="studentId"
          type="text"
          placeholder="학번 8자리를 입력해주세요."
          register={register}
          rules={{ required: "학번을 입력해주세요." }}
        />
        <FormErrorMessage message={errors.studentId?.message} />

        <h2 className="mb-4 mt-4 text-xl font-semibold">연락처</h2>
        <FormInput
          name="phoneNumber" // contact -> phoneNumber로 변경
          type="text"
          placeholder="연락처를 입력해주세요"
          register={register}
          rules={{ required: "연락처를 입력해주세요." }}
        />
        <FormErrorMessage message={errors.phoneNumber?.message} />

        <h2 className="mb-4 mt-4 text-xl font-semibold">아이디 (이메일)</h2>
        <FormInput
          name="email"
          type="email"
          placeholder="아이디를 입력해주세요"
          register={register}
          rules={{ required: "아이디를 입력해주세요." }}
        />
        <FormErrorMessage message={errors.email?.message} />

        {errorMessage && <FormErrorMessage message={errorMessage} />}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <FormSubmitButton />
      </form>
    </div>
  );
};

export default FindPasswordPage;
