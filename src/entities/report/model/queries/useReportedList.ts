import { useQuery } from '@tanstack/react-query';

import { adaptComment, adaptPost } from '@/fsd_shared/@types/report-adapters';
import { ReportedItem, ReportType } from '@/fsd_shared/@types/report-ui';

import { getReportedComments, getReportedPosts } from '../../api/get';
import { reportQueryKey } from '../../config/queryKey';

export const useReportedList = (type: ReportType, pageNum: number) =>
  useQuery<ReportedItem[]>({
    queryKey: reportQueryKey.list(type, pageNum),
    queryFn: async ({ signal }) => {
      const data =
        type === 'post'
          ? await getReportedPosts({ pageNum, signal }).then((res) => res.content.map(adaptPost))
          : await getReportedComments({ pageNum, signal }).then((res) => res.content.map(adaptComment));

      return data; // ReportedItem[] 반환
    },
    staleTime: 30_000,
  });
