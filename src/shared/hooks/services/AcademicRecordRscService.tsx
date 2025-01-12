import axios, { AxiosResponse } from "axios";
import { BASEURL, setRscHeader } from "@/shared";

export const AcademicRecordRscService = () => {
  const postAcademicRecord = async (
    data: User.CreateUserAcademicRecordApplicationRequestDto, // FileList 타입 사용
  ): Promise<any> => {
    const URI = `${BASEURL}/api/v1/users/academic-record/application/create`;
    try {
      const formData = new FormData();
      formData.append(
        "createUserAcademicRecordApplicationRequestDto",
        new Blob(
          [
            JSON.stringify({
              targetAcademicStatus: data.targetAcademicStatus,
              targetCompletedSemester: data.targetCompletedSemester,
              graduationYear: data.graduationYear,
              graduationType: data.graduationType,
              note: data.note,
            }),
          ],
          { type: "application/json" },
        ),
      );

      // FileList를 배열로 변환하여 forEach 사용
      if (data.images !== null) {
        Array.from(data.images).forEach((file) => {
          formData.append(
            "imageFileList",
            new Blob([file], { type: file.type }),
            file.name,
          );
        });
      } else {
        formData.append("imageFileList", "");
      }

      const headers = await setRscHeader();
      const response: AxiosResponse<any> = await axios.post(URI, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const updateAcademicRecord = async (
    data: User.CreateUserAcademicRecordApplicationRequestDto, // FileList 타입 사용
  ): Promise<any> => {
    const URI = `${BASEURL}/api/v1/users/academic-record/application/update`;
    try {
      const formData = new FormData();
      formData.append(
        "createUserAcademicRecordApplicationRequestDto",
        new Blob(
          [
            JSON.stringify({
              targetAcademicStatus: data.targetAcademicStatus,
              targetCompletedSemester: data.targetCompletedSemester,
              graduationYear: data.graduationYear,
              graduationType: data.graduationType,
              note: data.note,
            }),
          ],
          { type: "application/json" },
        ),
      );
      // FileList를 배열로 변환하여 forEach 사용
      if (data.images !== null) {
        Array.from(data.images).forEach((file) => {
          formData.append(
            "imageFileList",
            new Blob([file], { type: file.type }),
            file.name,
          );
        });
      } else {
        formData.append("imageFileList", "");
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
      console.error("Error creating post:", error);
      throw error;
    }
  };
  return { postAcademicRecord, updateAcademicRecord };
};
