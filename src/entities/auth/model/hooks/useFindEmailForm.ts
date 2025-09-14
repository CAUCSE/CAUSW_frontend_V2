import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { useFindId } from '../queries';
import { useFindAccountStore } from '../stores';

interface FormData {
  phoneNumber: string;
  name: string;
}

export const useFindEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { setName, setPhoneNumber } = useFindAccountStore(
    useShallow((state) => ({
      setName: state.setName,
      setPhoneNumber: state.setPhoneNumber,
    })),
  );

  const { mutate: findId } = useFindId();
  const onSubmit = async (data: FormData) => {
    setPhoneNumber(data.phoneNumber);
    setName(data.name);

    findId({
      phoneNumber: data.phoneNumber,
      name: data.name,
    });
  };

  return { register, handleSubmit, formState: { errors }, onSubmit };
};
