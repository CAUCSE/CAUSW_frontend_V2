/**
 * MyRecordHeader.tsx
 * - "환경설정"-"기록"-이하 페이지 헤더
 */
import { PreviousButton } from '@/fsd_shared';

interface MyRecordHeaderProps {
  pageName: string;
}

export const MyRecordHeader = ({ pageName }: MyRecordHeaderProps) => {
  return (
    <div className="flex h-24 w-full flex-col">
      <div className="flex items-center py-2">
        <PreviousButton />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="truncate pr-4 text-xl font-bold lg:text-3xl">{pageName}</div>
      </div>
    </div>
  );
};
