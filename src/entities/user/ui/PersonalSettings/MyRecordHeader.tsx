/**
 * MyRecordHeader.tsx
 * - "환경설정"-"기록"-이하 페이지 헤더
 */
import dynamic from 'next/dynamic';

interface MyRecordHeaderProps {
  pageName: string;
}

const PreviousButton = dynamic(() => import('@/shared').then((mod) => mod.PreviousButton), {
  ssr: false,
});

export const MyRecordHeader = ({ pageName }: MyRecordHeaderProps) => {
  return (
    <div className="flex h-24 w-full flex-col">
      <div className="flex items-center py-2">
        <PreviousButton />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="truncate pt-2 pr-4 pl-5 text-xl font-bold lg:text-3xl">{pageName}</div>
      </div>
    </div>
  );
};
