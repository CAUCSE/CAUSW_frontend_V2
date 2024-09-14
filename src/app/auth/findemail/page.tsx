"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormSubmitButton } from '../../../../src/entities/input/FormInput';
import FormErrorMessage from '../../../../src/entities/layout/FormErrorMessage';
import axios from 'axios';
import { BASEURL } from '@/shared';

interface FormData {
  studentId: string;
  name: string;
  phoneNumber: string;
}

const FindEmailPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>();
  const [email, setEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    // 전화번호의 '-'를 제거
    const cleanedPhoneNumber = data.phoneNumber.replace(/-/g, '');
    // 추가적인 유효성 검사를 통해 데이터가 올바른지 확인
    if (cleanedPhoneNumber.length < 10 || cleanedPhoneNumber.length > 11) {
      setError('phoneNumber', {
        type: 'manual',
        message: '연락처는 10자리 또는 11자리여야 합니다.',
      });
      return;
    }

    try {
      const response = await axios.post(`${BASEURL}/api/v1/users/user-id/find`, {
        studentId: data.studentId,
        name: data.name,
        phoneNumber: cleanedPhoneNumber // phoneNumber에서 "-" 제거된 값을 사용
      });

      if (response.status === 200) {
        console.log("API Response Data: ", response.data);
        setEmail(response.data.email); // 이메일 업데이트
        setErrorMessage(null);
      } else {
        console.log("API Error: ", response.data);
        setErrorMessage(response.data.message || '사용자를 찾을 수 없습니다.');
        setEmail(null);
      }
    } catch (error: any) {
      // 서버에서 발생한 오류 메시지를 반영하여 출력
      const errorMsg = error.response?.data?.message || '서버와 통신하는 도중 오류가 발생했습니다.';
      console.error("Fetch Error: ", error);
      setErrorMessage(errorMsg);
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
            rules={{ required: '학번을 입력해주세요.', pattern: { value: /^\d{8}$/, message: '학번은 8자리 숫자여야 합니다.' } }}
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
            rules={{
              required: '연락처를 입력해주세요.',
              pattern: { value: /^01[016789][0-9]{7,8}$/, message: '올바른 연락처를 입력해주세요.' },
            }}
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
