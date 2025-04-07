'use client';

import { AuthFormSubmitButton, useSignUpForm } from '@/fsd_entities/auth';

import { Header } from '@/fsd_shared';
import { PreviousButton } from '@/shared';

import { SignUpFormFields } from './SignUpFormFields';

export const SignUpForm = () => {
  const { register, handleSubmit, watch, errors, onSubmit, onInvalid } = useSignUpForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="flex flex-col items-center justify-center gap-y-4 mt-8"
    >
      <PreviousButton variant="white"></PreviousButton>
      <Header bold>회원가입</Header>
      <SignUpFormFields register={register} errors={errors} watch={watch} />
      <AuthFormSubmitButton content="회원가입" />
    </form>
  );
};

export default SignUpForm;
