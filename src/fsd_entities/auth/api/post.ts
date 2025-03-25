"use client";

import {
  API,
} from "@/shared";
import axios from "axios";

const URI = "/api/v1/users";

export const signup = async (selectedData: User.SignUpFormPost) => {
try {
    const response = await API.post(`${URI}/sign-up`, selectedData);
    return response.data; // 서버에서 받은 데이터를 리턴
} catch (error) {
    if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage); // 에러 메시지를 던져서 onSubmit에서 처리할 수 있게 함
    } else {
    throw new Error("알 수 없는 오류가 발생했습니다.");
    }}
};


