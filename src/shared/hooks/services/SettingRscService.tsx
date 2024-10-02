import { BASEURL, setRscHeader } from "@/shared";
import { Setting } from "@/shared/@types/setting";

//페이징 적용시, 한 페이지 정도 (현재 미적용)
const SIZE = 300;

//함수 생성자
const useGetMethod = (endpoint: string) => {
  return async (page: number = 0, size: number = SIZE) => {
    try {
      const headers = await setRscHeader();

      const response = await fetch(
        `${BASEURL}/api/v1/${endpoint}?page=${page}&size=${size}`,
        {
          headers: headers,
        },
      ).then((res) => res.json());

      if (response.errorCode) throw new Error(response.errorCode);

      return response.content;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export const SettingRscService = () => {
  const URI = BASEURL + "/api/v1/users";

  //유저 상태 조회
  const getByState = async (
    state: User.UserDto["state"],
    name: string | null,
    page: number,
  ) => {
    try {
      const headers = await setRscHeader();

      const response = name
        ? ((await fetch(`${URI}/state/${state}?name=${name}&pageNum=${page}`, {
            headers: headers,
          }).then((res) => res.json())) as Setting.GetByStateResponseDto)
        : ((await fetch(`${URI}/state/${state}?pageNum=${page}`, {
            headers: headers,
          }).then((res) => res.json())) as Setting.GetByStateResponseDto);

      if (response.errorCode) throw new Error(response.errorCode);

      return response.content;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //특수 권한 조회
  const getPrivilegedUsers = async () => {
    try {
      const headers = await setRscHeader();

      const response = (await fetch(`${URI}/privileged`, {
        headers: headers,
      }).then((res) => res.json())) as Setting.GetPrivilegedUsersResponseDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //가입 대기 유저 조회
  const getAllAdmissions = async (name: string | null, page: number) => {
    try {
      const headers = await setRscHeader();

      const response = name
        ? ((await fetch(`${URI}/admissions?name=${name}&pageNum=${page}`, {
            headers: headers,
          }).then((res) => res.json())) as Setting.GetAllAdmissionsResponseDto)
        : ((await fetch(`${URI}/admissions?pageNum=${page}`, {
            headers: headers,
          }).then((res) => res.json())) as Setting.GetAllAdmissionsResponseDto);

      if (response.errorCode) throw new Error(response.errorCode);

      return response.content;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getAdmission = async (userId: string) => {
    const header = await setRscHeader();
    const response = await fetch(`${URI}/admissions/${userId}`, {
      method: "GET",
      headers: header,
    });

    const data = (await response.json()) as Setting.GetAdmissionResponseDto;
    console.log(data);
    if (!response.ok) throw new Error(response.statusText);
    return data;
  };

  //납부자 조회
  const getPayers = useGetMethod("user-council-fee/list") as (
    page?: number,
    size?: number,
  ) => Promise<Setting.Payer[]>;

  //학적 인증 전체 조회
  const getAllAttendanceUsers = useGetMethod(
    "users/academic-record/list/active-users",
  ) as (page?: number, size?: number) => Promise<Setting.UserElement[]>;

  //학적 인증 요청 사용자 조회
  const getWaitingUsers = useGetMethod("users/academic-record/list/await") as (
    page?: number,
    size?: number,
  ) => Promise<Setting.WaitingUsers[]>;

  const acceptAdmission = async (admissionId: string) => {
    const headers = await setRscHeader();
    const response = await fetch(`${URI}/admissions/${admissionId}/accept`, {
      method: "PUT",
      headers: headers,
    });

    if (!response.ok) throw new Error(response.statusText);
    return true;
  };

  return {
    getByState,
    getAllAdmissions,
    getAdmission,
    getPayers,
    getAllAttendanceUsers,
    getPrivilegedUsers,
    acceptAdmission,
  };
};
