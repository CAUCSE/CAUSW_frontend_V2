import { API } from '@/shared';

export const getFormResponseDto = async (formId: string) => {
  const { data }: { data: Post.FormResponseDto } = await API.get(`/api/v1/forms/${formId}`);
  return data;
};

export const getCanReply = async (formId: string) => {
  const { data }: { data: boolean } = await API.get(`/api/v1/forms/${formId}/can-reply`);
  return data;
};

export const getFormSummary = async (formId: string) => {
  const { data }: { data: Form.QuestionSummaryResponseDto[] } = await API.get(`/api/v1/forms/${formId}/summary`);
  return data;
};

export const getFormResults = async (formId: string, page: number, size: number) => {
  const { data }: { data: Form.ReplyPageResponseDto } = await API.get(
    `/api/v1/forms/${formId}/results?page=${page}&size=${size}`,
  );
  return data;
};

export const exportExcel = async (formId: string) => {
  const response = await API.get(`/api/v1/forms/${formId}/export`, {
    responseType: 'blob',
  });
  return response.data;
};