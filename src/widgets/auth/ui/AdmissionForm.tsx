import React from 'react';

import {
  admissionValidationRules,
  AuthFormSubmitButton,
  FixedInput,
  InfoTextArea,
  useAdmissionForm,
} from '@/entities/auth';

import { ImageUploadField, MESSAGES, PreviousButton } from '@/shared';

export const AdmissionForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    onInvalid,
    setValue,
    email,
  } = useAdmissionForm();

  setValue('email', email);
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="items-left justify-left bg-board-page-background flex h-full min-h-screen flex-col gap-y-4 p-8 sm:p-16"
    >
      <PreviousButton></PreviousButton>
      <h1 className="mt-8 text-2xl font-bold sm:mt-4">가입 신청서 작성</h1>
      <FixedInput
        register={register}
        name="email"
        label="이메일"
        value={email}
      />
      <InfoTextArea
        register={register}
        name="description"
        label="유저 작성 특이사항 (선택사항)"
        placeholder="특이사항을 작성해주세요. (500자 이내)"
        rules={admissionValidationRules.description}
        errorMessage={errors.description?.message}
      />
      <ImageUploadField
        setValue={setValue}
        name="attachImage"
        label="증빙 서류 업로드"
        errorMessage={errors.attachImage?.message}
        maxFiles={1}
      >
        <p className="text-md text-error mt-1">
          mportal &gt; 내 정보수정 &gt; 등록현황 캡처본을 첨부해주세요.
        </p>
        <p className="text-sm text-gray-500">
          졸업생의 경우 졸업증명서, 학생증 등 중앙대학교 소프트웨어대학 출신임을
          증명할 자료를 첨부해주세요.
        </p>
        <p className="mb-2 text-sm text-gray-400">{MESSAGES.FILE_TYPE_INFO}</p>
      </ImageUploadField>
      <AuthFormSubmitButton content="제출" />
    </form>
  );
};
