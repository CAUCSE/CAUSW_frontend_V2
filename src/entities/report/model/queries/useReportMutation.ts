import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { CreateReportReq } from '@/shared/@types/report-ui';

import { parseErrorMessage } from '@/shared';

import { createReport } from '../../api';

export const useReportMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReportReq) => createReport(payload),
    onSuccess: (data) => {
      toast.success(data?.message ?? '신고가 접수되었습니다.');
      // 필요 시 무효화(관리자 신고목록 등)
      qc.invalidateQueries({ queryKey: ['report'] });
    },
    onError: (err: unknown) => {
      const msg = parseErrorMessage(err, '신고 처리 중 오류가 발생했습니다.');
      toast.error(msg);
    },
  });
};
