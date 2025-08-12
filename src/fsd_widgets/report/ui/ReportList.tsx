'use client';

import { useSearchParams } from 'next/navigation';

import { useReportedList } from '@/fsd_entities/report';

import { ReportCard } from './ReportCard';

export function ReportList() {
  const type = (useSearchParams().get('type') ?? 'post') as 'post' | 'comment';
  const { data, isLoading, isError } = useReportedList(type);

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
