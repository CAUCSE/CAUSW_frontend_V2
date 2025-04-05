"use client";
import { AuthInput, AuthFormSubmitButton } from "@/fsd_entities/auth";
import { useFindEmailForm } from "@/fsd_entities/auth";

export const FindEmailForm = () => {

    const { register, handleSubmit, formState: { errors }, onSubmit } = useFindEmailForm();

    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 block text-lg font-bold text-gray-700 sm:text-xl">
            아이디(이메일)를 찾고 싶으신가요?
          </h2>
          <AuthInput
            name="studentId"
            type="text"
            label="학번을 입력해주세요."
            placeholder="현재 학번을 입력해주세요(숫자)"
            register={register}
            rules={{
              required: "학번을 입력해주세요.",
              pattern: {
                value: /^\d{8}$/,
                message: "학번은 8자리 숫자여야 합니다.",
              },
            }}
            errorMessage={errors.studentId?.message}/>
          <AuthInput
            name="name"
            type="text"
            label="이름을 입력해주세요."
            placeholder="한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가)"
            register={register}
            rules={{ required: "이름을 입력해주세요." }}
            errorMessage={errors.name?.message}
          />

          <AuthFormSubmitButton content="확인" />
        </form>
)}