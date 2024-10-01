import { setRscHeader } from "@/shared/configs/fetch";
import { BASEURL } from "@/shared/configs/url";

export const FormRscService = () => {
  const getFormData = async (formId: string | string[]) => {
    const URI = `${BASEURL}/api/v1/forms/${formId}`;
    try {
      const headers = await setRscHeader();
      const response = await fetch(URI, { headers: headers });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const submitFormReply = async (
    formId: string | string[],
    formData: Form.QuestionReplyRequestDtoList,
  ) => {
    const URI = `${BASEURL}/api/v1/forms/${formId}`;
    try {
      const headers = await setRscHeader();
      const response = await fetch(URI, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  };
  return { getFormData, submitFormReply };
};
