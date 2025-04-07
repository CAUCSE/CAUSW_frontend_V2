'use client';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { useFindAccountStore } from '@/shared';

import { useFindPassword } from './useFindPassword';

interface FormData {
  name: string;
  studentId: string;
  email: string;
}

export const useFindPasswordForm = () => {
  const router = useRouter();
  const { studentId, name, email, resetFindAccountStore } = useFindAccountStore(
    useShallow(state => ({
      studentId: state.studentId,
      name: state.name,
      email: state.email,
      resetFindAccountStore: state.resetFindAccountStore,
    })),
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      studentId,
      name,
      email,
    },
  });

  const { isSuccess, mutate: findpassword } = useFindPassword();

  const onSubmit = async (data: FormData) => {
    findpassword({
      name: data.name,
      studentId: data.studentId,
      email: data.email,
    });
  };

  const handleRouterToSignIn = () => {
    router.push('/auth/signin');
    resetFindAccountStore();
  };
  return { register, handleSubmit, formState: { errors }, onSubmit, handleRouterToSignIn, isSuccess };
};
