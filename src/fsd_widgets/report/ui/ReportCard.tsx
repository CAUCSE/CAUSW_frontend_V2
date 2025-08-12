import { ReportedItem } from '@/fsd_entities/report';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });

export function ReportCard({ item }: { item: ReportedItem }) {
  const leftTop = item.kind === 'post' ? item.title : item.content;
  const rightTop = item.kind === 'post' ? item.boardName : item.parentPostTitle;

  return (
    <div className="mx-4 my-3 rounded-2xl bg-white p-5 shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-lg font-semibold">{leftTop}</div>
          <div className="mt-1 text-sm text-gray-600">{item.offenderName}</div>
        </div>
        <div className="shrink-0 text-right text-gray-500">{rightTop}</div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">사유</span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">{item.reason}</span>
        </div>
        <div className="text-gray-500">{formatDate(item.createdAt)}</div>
      </div>
    </div>
  );
}
