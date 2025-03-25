"use client";
import { API } from "@/fsd_shared";
import axios, { AxiosResponse } from "axios";
const URI = "/api/v1/users";

export const checkEmailDuplicate = async (email: string): Promise<string | boolean> => {
    try {
      const response = (await API.get(`${URI}/${email}/is-duplicated`, {
        params: { email },
      })) as AxiosResponse<any>; // 타입 변경
      if (response.data.result === false) {
        return true;
    }
    else {
        return false;
    }}
    catch (error) {
      if (axios.isAxiosError(error)) {
        return (
          error.response?.data?.message || "이메일 중복검사에 실패했습니다."
        );
      } else {
        return ("알 수 없는 오류가 발생했습니다.");
      }
    }
  };


export const checkNicknameDuplicate = async (nickname: string): Promise<string | boolean> => {
try {
    const response = (await API.get(
    `${URI}/${nickname}/is-duplicated-nickname`,
    {
        params: { nickname },
    },
    )) as AxiosResponse<any>; // 타입 변경
    if (response.data.result === false) {
        return true;
    }
    else {
        return false;
    }
} catch (error) {
    if (axios.isAxiosError(error)) {
    return (
        error.response?.data?.message || "닉네임 중복검사에 실패했습니다."
    );
    } else {
    return ("알 수 없는 오류가 발생했습니다.");
    }
}
};

export const checkStudentIdDuplicate = async (
studentId: string,
): Promise<boolean | string> => {
try {
    const response = (await API.get(
    `${URI}/${studentId}/is-duplicated-student-id`,
    {
        params: { studentId },
    },
    )) as AxiosResponse<any>; // 타입 변경
    if (response.data.result === false) {
        return true;
    }
    else {
        return false;
    }}
    catch (error) {
    if (axios.isAxiosError(error)) {
    return (
        error.response?.data?.message || "학번 중복검사에 실패했습니다."
    );
    } else {
    return ("알 수 없는 오류가 발생했습니다.");
    }
}
};




