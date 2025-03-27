"use client";
import { PreviousButton } from "@/shared";
import {  SignUpSubmitButton, useSignUpForm } from "@/fsd_entities/auth";
import { SignUpHeader } from "./SignUpHeader";
import { SignUpFormFields } from "./SignUpFormFields";


export const SignUpForm = () => {

  const { register, handleSubmit, watch, errors, onSubmit, onInvalid } = useSignUpForm();

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col items-center justify-center gap-y-4">
      <PreviousButton variant="white"></PreviousButton>
      <SignUpHeader></SignUpHeader>
      <SignUpFormFields register={register} errors={errors} watch={watch} />
      <SignUpSubmitButton/>
    </form>
  );
};

export default SignUpForm;
