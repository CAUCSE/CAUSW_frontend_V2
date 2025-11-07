'use client';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { useFindPassword } from '../queries';
import { useFindAccountStore } from '../stores';

interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
}

export const useFindPasswordForm = () => {
  const router = useRouter();
  const { phoneNumber, name, email, resetFindAccountStore } =
    useFindAccountStore(
      useShallow((state) => ({
        phoneNumber: state.phoneNumber,
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
      phoneNumber,
      name,
      email,
    },
  });

  const { isSuccess, mutate: findpassword } = useFindPassword();

  const onSubmit = async (data: FormData) => {
    findpassword({
      name: data.name,
      phoneNumber: data.phoneNumber,
      email: data.email,
    });
  };

  const handleRouterToSignIn = () => {
    router.push('/auth/signin');
    resetFindAccountStore();
  };
  return {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    handleRouterToSignIn,
    isSuccess,
  };
};
