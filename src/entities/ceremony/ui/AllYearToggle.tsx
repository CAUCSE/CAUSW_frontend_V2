'use client';

import clsx from 'clsx';

export const AllYearToggle = ({
  checked,
  onChange,
  isSettingPage,
}: Ceremony.AllYearToggleProps) => {
  return (
    <label
      className={clsx('flex items-center', isSettingPage ? 'gap-2' : 'gap-1')}
    >
      <span className={clsx(isSettingPage ? 'text-lg' : 'ml-auto text-[15px]')}>
        {isSettingPage
          ? '모든 학번의 경조사 알림 받기'
          : '모든 학번에게 알림 전송'}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={clsx(isSettingPage ? 'h-5 w-5' : 'h-4 w-4')}
      />
    </label>
  );
};
