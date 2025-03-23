"use client";

import { AuthService, useFindAccountStore } from "@/shared";
import {
  FormErrorMessage,
  FormInput,
  FormSubmitButton,
} from "@/_deprecated/entities";
import React, { useCallback } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

interface FormData {
  studentId: string;
  name: string;
  phoneNumber: string;
}

const FindEmailPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { email, setName, setStudentId, resetFindAccountStore } =
    useFindAccountStore(
      useShallow((state) => ({
        email: state.email,
        setName: state.setName,
        setStudentId: state.setStudentId,
        resetFindAccountStore: state.resetFindAccountStore,
      })),
    );

  const { useFindId } = AuthService();
  const { mutate: findId } = useFindId();
  const onSubmit = async (data: FormData) => {
    setStudentId(data.studentId);
    setName(data.name);

    findId({
      studentId: data.studentId,
      name: data.name,
    });
  };

  const handleRouteLogin = () => {
    router.push("/auth/signin");
  };

  const handleRouteFindPassword = () => {
    router.push("/auth/findpassword");
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-white px-4 sm:px-0"
      ref={useCallback(() => {
        resetFindAccountStore();
      }, [])}
    >
      {email !== "" ? (
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
          <h2 className="mb-4 text-xl font-semibold">
            당신의 아이디(이메일)은
          </h2>
          <p className="text-lg">
            <span className="text-red-500">{email}</span> 입니다.
          </p>
          <div className="mt-4 flex w-full justify-between px-4">
            <button
              className="mt-5 h-10 w-32 rounded-xl bg-blue-500 text-white"
              onClick={handleRouteLogin}
            >
              로그인하기
            </button>
            <button
              className="mt-5 h-10 w-32 rounded-xl bg-blue-500 text-white"
              onClick={handleRouteFindPassword}
            >
              비밀번호 찾기
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
        >
          <h2 className="mb-4 text-base font-semibold md:text-xl">
            아이디(이메일)를 찾고 싶으신가요?
          </h2>

          <h2 className="mb-4 mt-4 text-xl font-semibold">
            학번을 입력해주세요.
          </h2>
          <FormInput
            name="studentId"
            type="text"
            placeholder="현재 학번을 입력해주세요(숫자)"
            register={register}
            rules={{
              required: "학번을 입력해주세요.",
              pattern: {
                value: /^\d{8}$/,
                message: "학번은 8자리 숫자여야 합니다.",
              },
            }}
          />
          <FormErrorMessage message={errors.studentId?.message} />

          <h2 className="mb-4 mt-4 text-xl font-semibold">
            이름을 입력해주세요.
          </h2>
          <FormInput
            name="name"
            type="text"
            placeholder="한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가)"
            register={register}
            rules={{ required: "이름을 입력해주세요." }}
          />
          <FormErrorMessage message={errors.name?.message} />

          <FormSubmitButton />
        </form>
      )}
    </div>
  );
};

export default FindEmailPage;
