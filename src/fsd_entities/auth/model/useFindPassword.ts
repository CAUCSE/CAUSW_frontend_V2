import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { findPassword } from '../api/post';

export const useFindPassword = () => {
  return useMutation({
    mutationFn: async ({ name, studentId, email }: User.FindPasswordRequest) => {
      await findPassword({ name, studentId, email });
    },
    onMutate: () => {
      toast.loading('비밀번호 찾는 중...');
    },
    onSuccess: () => {
      toast.success('비밀번호 재설정 이메일이 전송되었습니다.');
    },
    onError: () => {
      toast.error('사용자를 찾을 수 없습니다.');
    },
  });
};
