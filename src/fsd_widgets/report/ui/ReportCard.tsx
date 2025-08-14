import { useRouter } from 'next/navigation';

import { ReportedItem } from '@/fsd_entities/report';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });

export function ReportCard({ item }: { item: ReportedItem }) {
  const router = useRouter();
  const leftTop = item.kind === 'post' ? item.title : item.content;
  const rightTop = item.kind === 'post' ? item.boardName : item.parentPostTitle;

  return (
    <div
      onClick={() => router.push(item.url)}
      className="mb-3 w-full rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold md:text-lg">{leftTop}</div>
          <div className="mt-1 text-xs text-gray-600 md:text-sm">{item.offenderName}</div>
        </div>
        <div className="shrink-0 text-right text-xs text-gray-500">{rightTop}</div>
      </div>

      <div className="mt-2 flex items-center justify-between md:mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">사유</span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold md:text-sm">{item.reason}</span>
        </div>
        <div className="ml-4 text-xs text-gray-500">{formatDate(item.createdAt)}</div>
      </div>
    </div>
  );
}
