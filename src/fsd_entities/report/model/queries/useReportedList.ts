import { useQuery } from '@tanstack/react-query';

import { ReportedItem, ReportType } from '@/fsd_entities/report';

import { adaptComment, adaptPost, getReportedComments, getReportedPosts } from '../../api/get';
import { reportQueryKey } from '../../config/queryKey';

export const useReportedList = (type: ReportType) =>
  useQuery<ReportedItem[]>({
    queryKey: reportQueryKey.list(type),
    queryFn: async ({ signal }) => {
      if (type === 'post') {
        const page = await getReportedPosts({ pageNum: 0, signal }); // ✅ 객체 인자
        return page.content.map(adaptPost); // ✅ Page → UI 변환
      }
      const page = await getReportedComments({ pageNum: 0, signal }); // ✅ 객체 인자
      return page.content.map(adaptComment); // ✅ Page → UI 변환
    },
    staleTime: 30_000,
  });
