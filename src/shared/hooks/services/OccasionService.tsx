"use client";

import { BASEURL, setRscHeader } from "@/shared";
import axios, { AxiosResponse } from "axios";
import { createFormData } from "@/utils/formDataUtil"; // 유틸 함수 가져오기

export const OccasionService = () => {
  const registerOccasion = async (
    data: Occasion.CreateCeremonyRequestDto,
    files: File[]
  ): Promise<any> => {
    const URI = `${BASEURL}/api/v1/ceremony`;
    try {
      const formData = createFormData(
        {
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
          category: data.category,
        },
        "createCeremonyRequestDTO", // JSON 데이터 키
        files,
        "imageFileList" // 이미지 리스트 키
      );

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

  return { registerOccasion };
};
