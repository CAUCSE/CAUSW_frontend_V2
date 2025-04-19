'use client';

import { useRouter } from 'next/navigation';

import PreviousIcon from '../../../public/icons/previous_icon.svg';

export const PreviousButton = ({ routeCallback }: { routeCallback?: () => void }) => {
  const router = useRouter();
  return (
    <div className="absolute left-0 top-0 m-4">
      <button type="button" onClick={() => (routeCallback ? routeCallback() : router.back())} className="w-full">
        <div className="flex items-center gap-3">
          <PreviousIcon className="h-8 w-8" />
          <p className="text-lg">이전</p>
        </div>
      </button>
    </div>
  );
};
