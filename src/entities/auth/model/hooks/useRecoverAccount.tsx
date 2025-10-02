import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { getMyInfo } from '@/entities/user/api/get';

import { parseErrorMessage, setRccToken } from '@/shared';
import Cookies from 'js-cookie';

import { recoverAccount } from '../../api/put';

export const useRecoverAccount = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email }: User.RecoverAccountRequestDto) => await recoverAccount({ email }),
    onMutate: () => {
      return toast.loading('로딩 중...');
    },
    onSuccess: async (data: { accessToken: string; refreshToken: string }) => {
      toast.dismiss();
      const { accessToken, refreshToken } = data;
      await setRccToken(accessToken, refreshToken);
      const response = await getMyInfo();

      if (response.state === 'AWAIT') {
        router.push('/auth/authorization');
      } else {
        if (response.academicStatus == 'UNDETERMINED') {
          router.push('/auth/authorization');
        } else {
          router.push('/home');
        }
      }
      toast.success('로그인 성공!');
    },
    onError: (error: Error.ApiErrorResponse) => {
      toast.error(parseErrorMessage(error, '계정 복구에 실패했습니다.'));
    },
  });
};
