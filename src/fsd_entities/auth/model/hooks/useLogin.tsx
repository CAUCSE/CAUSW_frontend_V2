import { useRouter } from "next/navigation";
import { signin } from "@/fsd_entities/auth/api/post";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getMyInfo } from "@/fsd_entities/user/api/get";
import { setRccToken, setRscToken } from "@/fsd_shared";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signin,
    onSuccess: async (data: { accessToken: string; refreshToken: string }, body: User.SignInRequestDto) => {
        const { accessToken, refreshToken } = data;
        await setRscToken(accessToken, refreshToken);
        await setRccToken(accessToken, refreshToken);

        const AdmissionResponse = await getMyInfo();
    
        if (AdmissionResponse.data.state === 'AWAIT') {
          router.push('/auth/authorization');
        } else {
          if (AdmissionResponse.data.academicStatus == 'UNDETERMINED') {
            router.push('/auth/authorization');
          } else {
            router.push('/home');
          }
        }
        toast.success('로그인 성공!');
        },
    onError: () => {
      toast.error('로그인 정보가 일치하지 않습니다!');
    },
  });
  
};
