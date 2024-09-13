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
      const response = (await fetch(`${URI}/${id}`, { headers: headers }).then(
        (res) => res.json(),
      )) as Circle.CircleRequestDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  //TODO: API 검증 필요
  const getCircleUsers = async (id: string, state: Circle.JoinStatus) => {
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

  //TODO: 이미지 DTO 개발 지연으로 인한 미완성
  const editCircle = async (id: string) => {
    try {
      const headers = await setRscHeader();
      const response = (await fetch(`${URI}/${id}`, { headers: headers }).then(
        (res) => res.json(),
      )) as Circle.CircleRequestDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  return { getCircles, getCircle, getCircleUsers };
};
