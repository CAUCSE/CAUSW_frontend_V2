'use client';

import { AuthFormSubmitButton, AuthInput } from '@/fsd_entities/auth';
import { useFindPasswordForm } from '@/fsd_entities/auth';

export const FindPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    handleRouterToSignIn,
    isSuccess,
  } = useFindPasswordForm();
  return (
    <div className="bg-boardPageBackground flex min-h-screen flex-col items-center justify-center px-4 sm:px-0">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <AuthInput
          name="name"
          type="text"
          label="이름"
          placeholder="이름을 입력해주세요"
          register={register}
          rules={{ required: '이름을 입력해주세요.' }}
          errorMessage={errors.name?.message}
        />

        <AuthInput
          name="studentId"
          type="text"
          label="학번"
          placeholder="학번 8자리를 입력해주세요."
          register={register}
          rules={{
            required: '학번을 입력해주세요.',
            pattern: {
              value: /^\d{8}$/,
              message: '학번은 8자리 숫자여야 합니다.',
            },
          }}
          errorMessage={errors.studentId?.message}
        />

        <AuthInput
          name="email"
          type="email"
          label="아이디 (이메일)"
          placeholder="아이디를 입력해주세요"
          register={register}
          rules={{ required: '아이디를 입력해주세요.' }}
          errorMessage={errors.email?.message}
        />

        {isSuccess ? (
          <div className="w-full flex justify-center">
            <button
              className="flex items-center w-40 justify-center mt-6 h-10 rounded-lg bg-focus text-white hover:bg-blue-400 mb-4"
              onClick={handleRouterToSignIn}
              type="button"
            >
              로그인 하기
            </button>
          </div>
        ) : (
          <AuthFormSubmitButton content="확인" />
        )}
      </form>
    </div>
  );
};

export default FindPasswordForm;
