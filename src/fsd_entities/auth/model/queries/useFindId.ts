import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { findId } from '../../api/post';
import { useFindAccountStore } from '../stores';

export const useFindId = () => {
  const { setEmail, resetFindAccountStore } = useFindAccountStore(
    useShallow((state) => ({
      setEmail: state.setEmail,
      resetFindAccountStore: state.resetFindAccountStore,
    })),
  );
  return useMutation({
    mutationFn: async ({ phoneNumber, name }: { phoneNumber: string; name: string }) => {
      const { email } = await findId({ phoneNumber, name });
      return email;
    },
    onSuccess: (data) => {
      setEmail(data);
    },
    onError: () => {
      toast.error('사용자를 찾을 수 없습니다.');
      resetFindAccountStore();
    },
  });
};
