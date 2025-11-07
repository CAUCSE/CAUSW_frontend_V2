import { API } from '@/shared';

export const updateFormClosedStatus = async (
  formId: string,
  isClosed: boolean,
) => {
  await API.put(
    `/api/v1/forms/${formId}/set-closed`,
    {},
    {
      headers: {
        ...API.defaults.headers.common,
        targetIsClosed: `${!isClosed}`,
      },
    },
  );
};
