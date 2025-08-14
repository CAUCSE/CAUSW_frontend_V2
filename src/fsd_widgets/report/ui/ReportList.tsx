'use client';

import { ReportCard } from './ReportCard';

type ReportListProps = {
  data: any[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

export function ReportList({ data, isLoading, isError }: ReportListProps) {
  if (isLoading) return <div className="px-6 py-8 text-gray-500">불러오는 중…</div>;
  if (isError) return <div className="px-6 py-8 text-red-500">목록을 불러오지 못했습니다.</div>;
  if (!data || data.length === 0) return <div className="px-6 py-8 text-gray-400">신고된 항목이 없습니다.</div>;

  return (
    <div className="pb-28">
      {data.map((item) => (
        <ReportCard key={item.id} item={item} />
      ))}
    </div>
  );
}
