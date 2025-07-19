import { useMyInfoStore } from "@/fsd_entities/user";
import { useRouter } from "next/navigation";
import { usePushNotification } from "@/fsd_entities/notification";
import { removeRccAccess, removeRccRefresh, removeRscAccess, removeRscRefresh } from "@/fsd_shared";

export const useAuthHandler = () => {
  const router = useRouter();
  const { resetFCMToken } = usePushNotification();


  
  const hasAuth = () => {
  const userRole = useMyInfoStore((state) => state.roles);
  const hasAuth = userRole.includes('ADMIN') || userRole.includes('PRESIDENT') || userRole.includes('VICE_PRESIDENT');
  return hasAuth;
};



  const redirectToLogin = async () => {
    await signout();
  router.push('/auth/signin');
  };

  const signout = async () => {
      await Promise.all([
        removeRccRefresh(),
        removeRccAccess(),
        removeRscRefresh(),
        removeRscAccess(),
        resetFCMToken()
      ]);
    };

  
  return { hasAuth, redirectToLogin };
};