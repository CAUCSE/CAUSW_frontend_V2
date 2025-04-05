import { admissionValidationRules, AuthFormSubmitButton, FixedInput, InfoTextArea, useAdmissionForm } from "@/fsd_entities/auth";
import { ImageUploadField, PreviousButton } from "@/fsd_shared";
import React from "react";



export const AdmissionForm = () => {
  const { register, handleSubmit, errors, onSubmit, onInvalid, setValue, email } = useAdmissionForm();

  setValue("email", email);
  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="min-h-screen h-full bg-boardPageBackground flex flex-col items-left justify-left gap-y-4 p-8 sm:p-16">
    <PreviousButton></PreviousButton>
    <h1 className="text-2xl font-bold mt-8 sm:mt-4">가입 신청서 작성</h1>
    <FixedInput
    register={register}
    name = "email"
    label = "이메일"
    value = {email}/>
    <InfoTextArea
    register={register}
    name="description"
    label="유저 작성 특이사항"
    placeholder="특이사항을 작성해주세요. (500자 이내)"
    rules={admissionValidationRules.description}
    errorMessage={errors.description?.message}
    />
  <ImageUploadField
    setValue={setValue}
    name="attachImage"
    label="증빙 서류 업로드"
    errorMessage={errors.attachImage?.message}
  >          
  <p className="text-md text-error mt-1">
  mportal &gt; 내 정보수정 &gt; 등록현황 캡처본을 첨부해주세요. 
  </p></ImageUploadField>
  <AuthFormSubmitButton content="제출"/>
  </form>
);};