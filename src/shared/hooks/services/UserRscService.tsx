import { BASEURL, setRscHeader } from "@/shared";

export const UserRscService = () => {
  const URI = BASEURL + "/api/v1/users";

  const getUser = async (id: string) => {
    try {
      const headers = await setRscHeader();
      const response = (await fetch(`${URI}/${id}`, { headers: headers }).then(
        (res) => res.json()
      )) as User.UserDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  return { getUser };
};
