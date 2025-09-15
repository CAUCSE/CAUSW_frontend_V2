import { useQuery } from '@tanstack/react-query';
import { formQueryKey } from '@/entities/form/config';
import { getFormSummary } from '../../api';

export const useGetFormSummaryResult = (formId: string) => {
  return useQuery({
    queryKey: formQueryKey.summaryResult(formId),
    queryFn: () => getFormSummary(formId),
  });
};