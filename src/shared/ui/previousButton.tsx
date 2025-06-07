'use client';

import { useRouter } from 'next/navigation';

export const PreviousButton = ({ routeCallback, variant }: { routeCallback?: () => void; variant?: string }) => {
  const router = useRouter();
  const color = variant === '' ? 'boardPageBackground' : `${variant}`;
  return (
    <div className={`absolute top-0 left-0 m-4 bg-${color}`}>
      <button type="button" onClick={() => (routeCallback ? routeCallback() : router.back())}>
        <div className="flex items-center">
          <span className="pr-4 text-2xl">{'<'}</span>이전
        </div>
      </button>
    </div>
  );
};
