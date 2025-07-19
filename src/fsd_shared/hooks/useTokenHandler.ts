import { useAuthHandler } from "./useAuthHandler";
import { BASEURL, setRccToken, setRscToken } from "../configs";

export const useTokenHandler = () => {
  const { redirectToLogin } = useAuthHandler();

  const URI = BASEURL + '/api/v1/users';

  const updateAccess = async (refresh: string) => {
    try {
      const response = (await fetch(`${URI}/token/update`, {
        body: JSON.stringify({ refreshToken: refresh ?? '' }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }).then((res) => res.json())) as User.UpdateAccessTokenRequestDto;

      if (response.errorCode) throw new Error(response.errorCode);

      await setRscToken(response.accessToken, refresh);
      setRccToken(response.accessToken, refresh);

      return response.accessToken;
    } catch (error) {
      redirectToLogin();
    }
  };

  return { updateAccess };
}