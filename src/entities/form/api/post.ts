import { API } from '@/shared';

export const submitFormReply = async (formId: string, formData: Form.QuestionReplyRequestDtoList) => {
  await API.post(`/api/v1/forms/${formId}`, JSON.stringify(formData));
};
