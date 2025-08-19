import { useRouter } from "next/navigation";
import { signin } from "@/fsd_entities/auth/api/post";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getMyInfo } from "@/fsd_entities/user/api/get";
import { parseErrorMessage, setRccToken, setRscToken } from "@/fsd_shared";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signin,
    onSuccess: async (data: { accessToken: string; refreshToken: string }, body: User.SignInRequestDto) => {
        const { accessToken, refreshToken } = data;
        await setRscToken(accessToken, refreshToken);
        await setRccToken(accessToken, refreshToken);

        const response = await getMyInfo();
    
        if (response.state === 'AWAIT') {
          await router.push('/auth/authorization');
        } else {
          if (response.academicStatus == 'UNDETERMINED') {
            await router.push('/auth/authorization');
          } else {
            await router.push('/home');
          }
        }
        toast.success('로그인 성공!');
        },
    onError: (error: Error.ApiErrorResponse) => {
      toast.error(parseErrorMessage(error, '로그인 정보가 일치하지 않습니다!'));
    },
  });
  
};
