'use client';

import { useRouter } from 'next/navigation';

import { AuthFormSubmitButton, useSignUpForm } from '@/entities/auth';

import { Header } from '@/shared';
import { PreviousButton } from '@/shared';

import { SignUpFormFields } from './SignUpFormFields';

export const SignUpForm = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors, onSubmit, onInvalid } =
    useSignUpForm();

  return (
    <div className="flex h-screen w-full min-w-80 flex-col rounded-md p-2">
      <PreviousButton routeCallback={() => router.back()} />
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="flex w-full min-w-80 flex-col items-center justify-center gap-y-4 rounded-md p-2"
      >
        <Header bold>회원가입</Header>
        <SignUpFormFields register={register} errors={errors} watch={watch} />
        <AuthFormSubmitButton content="회원가입" />
      </form>
    </div>
  );
};

export default SignUpForm;
