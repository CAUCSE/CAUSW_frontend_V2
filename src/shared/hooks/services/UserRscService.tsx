import { BASEURL, setRscHeader } from "@/shared";

export const UserRscService = () => {
  const URI = BASEURL + "/api/v1/users";

  const getUser = async (id: string) => {
    try {
      const headers = await setRscHeader();
      const response = (await fetch(`${URI}/${id}`, { headers: headers }).then(
        (res) => res.json(),
      )) as User.UserDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const findByState = async (
    state: User.UserDto["state"],
    name: string | null,
    page: number,
  ) => {
    try {
      const headers = await setRscHeader();

      const response = name
        ? ((await fetch(`${URI}/state/${state}?name=${name}&pageNum=${page}`, {
            headers: headers,
          }).then((res) => res.json())) as User.FindByStateResponseDto)
        : ((await fetch(`${URI}/state/${state}?pageNum=${page}`, {
            headers: headers,
          }).then((res) => res.json())) as User.FindByStateResponseDto);

      if (response.errorCode) throw new Error(response.errorCode);

      return response.content;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const findAllAdmissions = async (name: string | null, page: number) => {
    try {
      const headers = await setRscHeader();

      const response = name
        ? ((await fetch(`${URI}/admissions?name=${name}&pageNum=${page}`, {
            headers: headers,
          }).then((res) => res.json())) as User.FindAllAdmissionsResponseDto)
        : ((await fetch(`${URI}/admissions?pageNum=${page}`, {
            headers: headers,
          }).then((res) => res.json())) as User.FindAllAdmissionsResponseDto);

      if (response.errorCode) throw new Error(response.errorCode);

      return response.content;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { getUser, findByState, findAllAdmissions };
};
