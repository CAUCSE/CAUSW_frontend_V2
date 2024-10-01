import axios, { AxiosResponse } from "axios";
import { BASEURL, setRscHeader } from "@/shared";

export const AcademicRecordRscService = () => {

    const postAcademicRecord = async (
        attachImageList: FileList // FileList 타입 사용
      ): Promise<any> => {
        const URI = `${BASEURL}/api/v1/users/academic-record/application/create`;
        try {
          const formData = new FormData();
          formData.append(
            "createUserAcademicRecordApplicationRequestDto",
            new Blob(
              [
                JSON.stringify({
                  targetAcademicStatus: "ENROLLED",
                  targetCompletedSemester: 5,
                  graduationYear: 2026,
                  graduationType: 0,
                  note: "s",
                }),
              ],
              { type: "application/json" }
            )
          );
    
          // FileList를 배열로 변환하여 forEach 사용
          Array.from(attachImageList).forEach((file) => {
            formData.append(
                'imageFileList',
                new Blob(
                  [file],
                  {type: file.type}
                ),
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
    
          console.log(response)
    
          console.log("게시글 생성 완료:", response.data);
          return response;
        } catch (error) {
          console.error("Error creating post:", error);
          throw error;
        }
      };


  const updateAcademicRecord = async (
    attachImageList: FileList // FileList 타입 사용
  ): Promise<any> => {
    const URI = `${BASEURL}/api/v1/users/academic-record/application/update`;
    try {
      const formData = new FormData();
      formData.append(
        "createUserAcademicRecordApplicationRequestDto",
        new Blob(
          [
            JSON.stringify({
              targetAcademicStatus: "ENROLLED",
              targetCompletedSemester: 5,
              graduationYear: null,
              graduationType: null,
              note: "s",
            }),
          ],
          { type: "application/json" }
        )
      );

      // FileList를 배열로 변환하여 forEach 사용
      Array.from(attachImageList).forEach((file) => {
        formData.append(
            'imageFileList',
            new Blob(
              [file],
              {type: file.type}
            ),
            file.name,
          ); 
        });

      const headers = await setRscHeader();
      const response: AxiosResponse<any> = await axios.put(URI, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response)

      console.log("재학 증빙 서류 작성 완료:", response.data);
      return response;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };
  return { postAcademicRecord, updateAcademicRecord };
};
