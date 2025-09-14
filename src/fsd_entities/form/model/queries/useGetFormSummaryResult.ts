import { useQuery } from '@tanstack/react-query';
import { formQueryKey } from '@/shared/configs/query-key/formQueryKey';
import { getFormSummary } from '../../api';

export const useGetFormSummaryResult = (formId: string) => {
  return useQuery({
    queryKey: formQueryKey.summaryResult(formId),
    queryFn: () => getFormSummary(formId),
  });
};