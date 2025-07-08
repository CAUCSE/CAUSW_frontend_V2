import { PreviousButton } from '@/fsd_shared';

interface MyPageHeaderProps {
  pageName: string;
}

export const MyPageHeader = ({ pageName }: MyPageHeaderProps) => {
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
