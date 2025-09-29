'use client';

import { AuthFormSubmitButton, AuthInput } from '@/entities/auth';
import { useFindEmailForm } from '@/entities/auth';

const formatPhoneNumber = (value: string) => {
  if (!value) return '';
  return value.replace(/[^0-9]/g, '').replace(/(^\d{3})(\d{3,4})(\d{4}$)/, '$1-$2-$3');
};

export const FindEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
  } = useFindEmailForm();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 block text-lg font-bold text-gray-700 sm:text-xl">아이디(이메일)를 찾고 싶으신가요?</h2>
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
          name="name"
          type="text"
          label="이름을 입력해주세요."
          placeholder="한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가)"
          register={register}
          rules={{ required: '이름을 입력해주세요.' }}
          errorMessage={errors.name?.message}
        />

        <AuthFormSubmitButton content="확인" />
      </form>
      <p className="mt-4 text-center text-sm text-gray-400">
        아이디 찾기가 정상적으로 진행되지 않을 경우 관리자(
        <a href="mailto:caucsedongne@gmail.com" className="text-gray-500 underline">
          caucsedongne@gmail.com
        </a>
        )에게 문의해 주시기 바랍니다.
      </p>
    </>
  );
};
