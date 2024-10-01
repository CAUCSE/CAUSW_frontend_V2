import { FORMAPI } from "@/shared";

export const CircleService = () => {
  const URI = "/api/v1/circles";

  //TODO: 이미지 DTO 개발 지연으로 인한 미완성
  const editCircle = async (id: string, body: FormData) => {
    await FORMAPI.put(`${URI}/${id}`, body);
  };

  return { editCircle };
};
