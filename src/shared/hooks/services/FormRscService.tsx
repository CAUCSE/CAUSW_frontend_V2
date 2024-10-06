import { BASEURL } from "@/shared/configs/url";
import { setRscHeader } from "@/shared/configs/fetch";

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

  const getFormResultBySummary = async (formId: string | string[]) => {
    const URI = `${BASEURL}/api/v1/forms/${formId}/summary`;
    try {
      const headers = await setRscHeader();
      const response = await fetch(URI, { headers: headers });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const res = await response.json();
      return res;
    } catch (error) {
      throw error;
    }
  };

  const getTotalFormResult = async (
    formId: string | string[],
    page: number,
    size: number,
  ) => {
    const URI = `${BASEURL}/api/v1/forms/${formId}/results?page=${page}&size=${size}`;
    try {
      const headers = await setRscHeader();
      const response = await fetch(URI, { headers: headers });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const res = await response.json();
      return res;
    } catch (error) {
      throw error;
    }
  };

  const exportExcelFile = async (formId: string | string[]) => {
    const URI = `${BASEURL}/api/v1/forms/${formId}/export`;
    try {
      const headers = await setRscHeader();
      const response = await fetch(URI, { headers: headers });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `form-${formId}-result.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      throw error;
    }
  };

  const setFormFinished = async (
    formId: string | string[],
    targetIsClosed: boolean,
  ) => {
    const URI = `${BASEURL}/api/v1/forms/${formId}/set-closed`;
    try {
      const headers = await setRscHeader();
      const response = await fetch(URI, {
        method: "PUT",
        headers: { ...headers, targetIsClosed: `${targetIsClosed}` },
      });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const getUserCanReply = async (formId: string | string[]) => {
    const URI = `${BASEURL}/api/v1/forms/${formId}/can-reply`;
    try {
      const headers = await setRscHeader();
      const response = await fetch(URI, { headers: headers });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const res = await response.json();
      return res;
    } catch (error) {
      throw error;
    }
  };

  return {
    getFormData,
    submitFormReply,
    getFormResultBySummary,
    getTotalFormResult,
    exportExcelFile,
    setFormFinished,
    getUserCanReply,
  };
};
