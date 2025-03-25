// src/widgets/sign-up-form/ui/SignUpForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { SignUpFormFields } from "./SignUpFormFields";
import { SignUpFormSubmitButton } from "@/fsd_entities/auth/ui/SignUpSubmitButton";
import { PreviousButton } from "@/shared";
import { SignUpHeader } from "./SignUpHeader";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User.SignUpForm>({mode: "onBlur"});

  const onSubmit = (data: User.SignUpForm) => {
    console.log("회원가입 데이터:", data);
    // TODO: API 요청 연동
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-y-4">
      <PreviousButton variant="white"></PreviousButton>
      <SignUpHeader></SignUpHeader>
      <SignUpFormFields register={register} errors={errors} watch={watch} />
      <SignUpFormSubmitButton/>
    </form>
  );
};

export default SignUpForm;
