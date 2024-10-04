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
    data: User.userUpdateDto, // FileList 타입 사용
  ): Promise<any> => {
    const URI = `${BASEURL}/api/v1/users`;
    try {
      const formData = new FormData();
      formData.append(
        "userUpdateDto",
        new Blob(
          [
            JSON.stringify({
              nickname: data.nickname,
              phoneNumber: "01011111111",
            }),
          ],
          { type: "application/json" },
        ),
      );

      // attachImageList가 단일 파일인 경우
      const file = data.profileImage;

      if (file !== null) {
        formData.append("profileImage", file, file.name);
      } else {
        formData.append("profileImage", "");
      }

      const headers = await setRscHeader();
      const response: AxiosResponse<any> = await axios.put(URI, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const submitAdmissionsApplication = async (
    data: User.AdmissionCreateRequestDto, // FileList 타입 사용
  ): Promise<any> => {
    const URI = `${BASEURL}/api/v1/users/admissions/apply`;
    try {
      const formData = new FormData();
      formData.append(
        "userAdmissionCreateRequestDto ",
        new Blob(
          [
            JSON.stringify({
              email: data.email,
              description: data.description,
            }),
          ],
          { type: "application/json" },
        ),
      );

      // FileList를 배열로 변환하여 forEach 사용
      Array.from(data.images).forEach((file) => {
        formData.append(
          "userAdmissionAttachImageList ",
          new Blob([file], { type: file.type }),
          file.name,
        );
      });

      const headers = await setRscHeader();
      const response: AxiosResponse<any> = await axios.post(URI, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    getMe,
    getUser,
    getMyCircles,
    updateInfo,
    submitAdmissionsApplication,
  };
};
