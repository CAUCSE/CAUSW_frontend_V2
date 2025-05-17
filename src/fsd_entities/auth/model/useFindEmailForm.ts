import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { useFindAccountStore } from '@/shared';

import { useFindId } from './useFindId';

interface FormData {
  studentId: string;
  name: string;
}

export const useFindEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { setName, setStudentId } = useFindAccountStore(
    useShallow((state) => ({
      setName: state.setName,
      setStudentId: state.setStudentId,
    })),
  );

  const { mutate: findId } = useFindId();
  const onSubmit = async (data: FormData) => {
    setStudentId(data.studentId);
    setName(data.name);

    findId({
      studentId: data.studentId,
      name: data.name,
    });
  };

  return { register, handleSubmit, formState: { errors }, onSubmit };
};
