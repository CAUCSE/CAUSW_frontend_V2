import { BASEURL, setRscHeader } from "@/shared";
import axios, { AxiosResponse } from "axios";
export const UserRscService = () => {
  const URI = BASEURL + "/api/v1/users";

  const getMe = async () => {
    try {
      const headers = await setRscHeader();
      const response = (await fetch(`${URI}/me`, { headers: headers }).then(
        (res) => res.json(),
      )) as User.UserDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

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

  const getMyCircles = async () => {
    try {
      const headers = await setRscHeader();

      const response = (await fetch(`${URI}/circles`, {
        headers: headers,
      }).then((res) => res.json())) as Circle.CirclesRequestDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateInfo = async (
    data: User.userUpdateDto // FileList 타입 사용
  ): Promise<string> => {
    const URI = `${BASEURL}/api/v1/users`;
    try {
      const formData = new FormData();
      formData.append(
        "userUpdateDto",
        new Blob(
          [
            JSON.stringify({
              name: data.name,
              studentId: data.studentId,
              admissionYear: data.admissionYear,
              nickname: data.nickname,
              major: data.major,
              academicStatus: data.academicStatus,
              currentCompletedSemester: data.currentCompletedSemester,
              graduationYear: data.graduationYear,
              graduationMonth: data.graduationMonth,
              phoneNumber: "01011111111"
            }),
          ],
          { type: "application/json" }
        )
      );

      // attachImageList가 단일 파일인 경우
      const file = data.profileImage;

      // if (file !== null) {
      //   formData.append("profileImage", file, file.name);
      // }

      const headers = await setRscHeader();
      const response: AxiosResponse<any> = await axios.put(URI, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("게시글 생성 완료:", response.data);
      return response.data.id;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };
  return { getMe, getUser, findByState, findAllAdmissions, getMyCircles, updateInfo };
};
