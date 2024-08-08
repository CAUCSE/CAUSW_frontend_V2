"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormSubmitButton } from '../../../../src/entities/input/FormInput';
import FormErrorMessage from '../../../../src/entities/layout/FormErrorMessage';

interface FormData {
  studentId: string;
  name: string;
  phoneNumber: string;
}

const FindEmailPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [email, setEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/findemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setEmail(result.email);
        setErrorMessage(null);
      } else {
        const error = await response.json();
        setErrorMessage(error.message);
        setEmail(null);
      }
    } catch (error) {
      setErrorMessage('서버와 통신하는 도중 오류가 발생했습니다.');
      setEmail(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 sm:px-0">
      {email ? (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">당신의 아이디(이메일)은</h2>
          <p className="text-red-500 text-lg">{email}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">아이디(이메일)를 찾고 싶으신가요?</h2>
          <h2 className="text-xl font-semibold mt-4 mb-4">학번을 입력해주세요.</h2>
          <FormInput
            name="studentId"
            type="text"
            placeholder="현재 학번을 입력해주세요(숫자)"
            register={register}
            rules={{ required: '학번을 입력해주세요.' }}
          />
          <FormErrorMessage message={errors.studentId?.message} />

          <h2 className="text-xl font-semibold mt-4 mb-4">이름을 입력해주세요.</h2>
          <FormInput
            name="name"
            type="text"
            placeholder="한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가)"
            register={register}
            rules={{ required: '이름을 입력해주세요.' }}
          />
          <FormErrorMessage message={errors.name?.message} />

          <h2 className="text-xl font-semibold mt-4 mb-4">연락처를 입력해주세요.</h2>
          <FormInput
            name="phoneNumber"
            type="text"
            placeholder="- 를 빼서 작성해주세요. 예) 01012345678"
            register={register}
            rules={{ required: '연락처를 입력해주세요.' }}
          />
          <FormErrorMessage message={errors.phoneNumber?.message} />

          {errorMessage && <FormErrorMessage message={errorMessage} />}

          <FormSubmitButton />
        </form>
      )}
    </div>
  );
};

export default FindEmailPage;
