import { AxiosResponse } from "axios";

import { API, useUserStore } from "@/shared";

export const UserService = () => {
  const URI = "/api/v1/users";

  const setUserStore = useUserStore((state) => state.setUserStore);

  const getUserInfo = async () => {
    const { data } = (await API.get(
      `${URI}/me`
    )) as AxiosResponse<User.UserDto>;

    setUserStore(data);
  };

  return { getUserInfo };
};
