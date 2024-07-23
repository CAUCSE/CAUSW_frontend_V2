"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../../../src/entities/input/FormInput';
import FormErrorMessage from '../../../../src/entities/layout/FormErrorMessage';

interface FormData {
  name: string;
  studentId: string;
  contact: string;
  email: string;
}

const FindPasswordPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // 이 부분에 비밀번호 찾기 로직 구현 필요.
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">이름</h2>
        <FormInput
          name="name"
          type="text"
          placeholder="이름을 입력해주세요"
          register={register}
          rules={{ required: '이름을 입력해주세요.' }}
        />
        <FormErrorMessage message={errors.name?.message} />

        <h2 className="text-xl font-semibold mt-4 mb-4">학번</h2>
        <FormInput
          name="studentId"
          type="text"
          placeholder="학번을 입력해주세요"
          register={register}
          rules={{ required: '학번을 입력해주세요.' }}
        />
        <FormErrorMessage message={errors.studentId?.message} />

        <h2 className="text-xl font-semibold mt-4 mb-4">연락처</h2>
        <FormInput
          name="contact"
          type="text"
          placeholder="연락처를 입력해주세요"
          register={register}
          rules={{ required: '연락처를 입력해주세요.' }}
        />
        <FormErrorMessage message={errors.contact?.message} />

        <h2 className="text-xl font-semibold mt-4 mb-4">아이디 (이메일)</h2>
        <FormInput
          name="email"
          type="email"
          placeholder="아이디를 입력해주세요"
          register={register}
          rules={{ required: '아이디를 입력해주세요.' }}
        />
        <FormErrorMessage message={errors.email?.message} />

        <button type="submit" className="w-full mt-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
          확인
        </button>
      </form>
    </div>
  );
};

export default FindPasswordPage;
