import { FORMAPI } from "@/shared";
import { createFormData } from "@/utils";

export const AcademicRecordService = () => {
  const postAcademicRecord = async (
    data: User.CreateUserAcademicRecordApplicationRequestDto,
  ): Promise<any> => {
    try {
      const payload = {
        ...data, // 기존 데이터 복사
        images: undefined, // images는 따로 처리하므로 제거
      };

      const formData = createFormData(
        payload,
        "createUserAcademicRecordApplicationRequestDto", 
        data.images ? Array.from(data.images) : [], 
        "imageFileList" 
      );
  
      const response = await FORMAPI.post(
        "/api/v1/users/academic-record/application/create",
        formData,
      );
  
      return response.data; //
    } catch (error) {
      throw error;
    }
  };
  

  const updateAcademicRecord = async (
    data: User.CreateUserAcademicRecordApplicationRequestDto, // FileList 타입 사용
  ): Promise<any> => {
    try {
      const payload = {
        ...data,
        images: undefined, 
      };

      const formData = createFormData(
        payload,
        "createUserAcademicRecordApplicationRequestDto", 
        data.images ? Array.from(data.images) : [], 
        "imageFileList" 
      );
  
      const response = await FORMAPI.put(
        "/api/v1/users/academic-record/application/update",
        formData,
      );
  
      return response.data; //
    } catch (error) {
      throw error;
    }};
  return { postAcademicRecord, updateAcademicRecord };
};
