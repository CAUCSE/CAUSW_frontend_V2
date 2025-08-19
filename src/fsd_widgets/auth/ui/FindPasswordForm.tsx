'use client';

import { AuthFormSubmitButton, AuthInput } from '@/fsd_entities/auth';
import { useFindPasswordForm } from '@/fsd_entities/auth';

const formatPhoneNumber = (value: string) => {
  if (!value) return '';
  return value.replace(/[^0-9]/g, '').replace(/(^\d{3})(\d{3,4})(\d{4}$)/, '$1-$2-$3');
};

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
    <div className="bg-board-page-background flex min-h-screen flex-col items-center justify-center px-4 sm:px-0">
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
          register={register}
          name="phoneNumber"
          rules={{
            required: '휴대폰 번호를 입력해주세요.',
            pattern: {
              value: /^\d{3}-\d{3,4}-\d{4}$/,
              message: 'ex) 010-1234-5678 형식으로 입력해주세요.',
            },
          }}
          label="연락처"
          placeholder="ex) 010-1234-5678"
          errorMessage={errors.phoneNumber?.message}
          formatter={formatPhoneNumber}
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
          <div className="flex w-full justify-center">
            <button
              className="bg-focus mt-6 mb-4 flex h-10 w-40 items-center justify-center rounded-lg text-white hover:bg-blue-400"
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
      <p className="mt-4 text-center text-sm text-gray-400">
        비밀번호 찾기가 정상적으로 진행되지 않을 경우 관리자(
        <a href="mailto:caucsedongne@gmail.com" className="text-gray-500 underline">
          caucsedongne@gmail.com
        </a>
        )에게 문의해 주시기 바랍니다.
      </p>
    </div>
  );
};

export default FindPasswordForm;
