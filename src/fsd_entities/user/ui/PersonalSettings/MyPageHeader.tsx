/**
 * MyPageHeader.tsx
 * - "환경설정"-"기록"-이하 페이지 헤더
 */
import { PreviousButton } from '@/fsd_shared';

interface MyPageHeaderProps {
  pageName: string;
}

export const MyPageHeader = ({ pageName }: MyPageHeaderProps) => {
  return (
    <div className="flex h-24 w-full items-end px-5 sm:px-10">
      <PreviousButton />
      <div className="z-10 flex w-full items-center justify-between">
        <div className="truncate pr-4 text-xl font-bold lg:text-3xl">{pageName}</div>
      </div>
    </div>
  );
};
