import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { exportExcel } from '../../api';

export const useExportExcelFile = () => {
  return useMutation({
    mutationFn: async ({ formId }: { formId: string }) => {
      const data = await exportExcel(formId);
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `form-${formId}-result.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    },
    onError: () => {
      toast.error('엑셀 다운로드 실패');
    },
  });
};
