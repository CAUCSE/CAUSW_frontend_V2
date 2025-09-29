import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateFormClosedStatus } from '../../api';
import { useFormResultStore } from '../stores';

export const useUpdateFormClosedStatus = () => {
  const { formData, setFormClosedStatus } = useFormResultStore();

  return useMutation({
    mutationFn: async ({ formId }: { formId: string }) => {
      return updateFormClosedStatus(formId, formData?.isClosed || false);
    },
    onSuccess: () => {
      toast.success('신청서 마감 상태 변경 완료');
      setFormClosedStatus(!formData?.isClosed);
    },
    onError: () => {
      toast.error('신청서 마감 상태 변경 실패');
    },
  });
};
