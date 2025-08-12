import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { createReport } from '../../api/post';
import { CreateReportReq } from '../../config';

export const useReportMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReportReq) => createReport(payload),
    onSuccess: (data) => {
      toast.success(data?.message ?? '신고가 접수되었습니다.');
      // 필요 시 무효화(관리자 신고목록 등)
      qc.invalidateQueries({ queryKey: ['reports', 'lists'] });
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.response?.data?.error || '신고 처리 중 오류가 발생했습니다.';
      toast.error(msg);
    },
  });
};
