'use client';

import clsx from 'clsx';

export const AdmissionYearList = ({
  years,
  onRemove,
  isAllSelected,
  isSettingPage = false,
}: Ceremony.AdmissionYearListProps) => {
  return (
    <div
      className={clsx(
        'overflow-y-auto rounded-xl border border-black p-5',
        isAllSelected ? 'bg-gray-200' : 'bg-white',
        isSettingPage ? 'h-72 w-72' : 'h-40 w-full sm:max-w-85',
      )}
    >
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onRemove(year)}
          type="button"
          className={clsx(
            'flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-gray-100',
            isSettingPage ? '' : 'text-xl',
          )}
        >
          <span>{year}학번</span>
          <div className="h-0.5 w-4 scale-150 transform rounded-2xl bg-black"></div>
        </button>
      ))}
    </div>
  );
};
