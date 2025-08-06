import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { useFindAccountStore } from '../stores';

import { findId } from '../../api/post';

export const useFindId = () => {
  const { setEmail, resetFindAccountStore } = useFindAccountStore(
    useShallow((state) => ({
      setEmail: state.setEmail,
      resetFindAccountStore: state.resetFindAccountStore,
    })),
  );
  return useMutation({
    mutationFn: async ({ studentId, name }: { studentId: string; name: string }) => {
      const { email } = await findId({ studentId, name });
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
