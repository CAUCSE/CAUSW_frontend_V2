import { BASEURL, setRscHeader } from "@/shared";

export const CircleRscService = () => {
  const URI = BASEURL + "/api/v1/circles";

  const getCircles = async () => {
    try {
      const headers = await setRscHeader();
      const response = (await fetch(URI, { headers: headers }).then((res) =>
        res.json(),
      )) as Circle.CirclesRequestDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  const getCircle = async (id: string) => {
    try {
      const headers = await setRscHeader();
      const response = (await fetch(`${URI}/${id}`, {
        headers: headers,
        cache: "no-store",
      }).then((res) => res.json())) as Circle.CircleRequestDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  const getCircleBoards = async (id: string) => {
    try {
      const headers = await setRscHeader();
      const response = (await fetch(`${URI}/${id}/boards`, {
        headers: headers,
      }).then((res) => res.json())) as Circle.GetCircleBoardsResponseDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  const getCircleMembers = async (id: string) => {
    try {
      const headers = await setRscHeader();
      const response = (await fetch(`${URI}/${id}/memberList`, {
        headers: headers,
      }).then((res) => res.json())) as Circle.GetCircleMembersResponseDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  const getCircleUsersByState = async (
    id: string,
    state: Circle.JoinStatus,
  ) => {
    try {
      const headers = await setRscHeader();
      const response = (await fetch(
        `${URI}/${id}/users?circleMemberStatus=${state}`,
        { headers: headers },
      ).then((res) => res.json())) as Circle.GetUserListResponseDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  const getCircleUserByStateAndId = async (
    id: string,
    state: Circle.JoinStatus,
    userId: string,
  ) => {
    try {
      const headers = await setRscHeader();
      const response = await fetch(
        `${URI}/${id}/users?circleMemberStatus=${state}`,
        { headers: headers },
      );

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const res: Circle.CircleUser[] = await response.json();
      console.log(res);
      const data = res.filter((memberInfo) => memberInfo.user.id === userId)[0];
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    getCircles,
    getCircle,
    getCircleMembers,
    getCircleBoards,
    getCircleUsersByState,
    getCircleUserByStateAndId,
  };
};
