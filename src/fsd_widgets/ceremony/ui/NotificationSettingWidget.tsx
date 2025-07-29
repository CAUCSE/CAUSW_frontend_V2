'use client';

import clsx from 'clsx';

import { AdmissionYearInput, AdmissionYearList, AllYearToggle, useCeremonySettingForm } from '@/fsd_entities/ceremony';

import { Button } from '@/fsd_shared';

interface NotificationSettingWidgetProps {
  isSettingPage?: boolean;
}
export const NotificationSettingWidget = ({ isSettingPage = false }: NotificationSettingWidgetProps) => {
  const { years, setAll, setAllYearsSelected, addYear, removeYear, onSubmit } = useCeremonySettingForm();

  return (
    <div className={clsx('flex flex-col gap-16', isSettingPage ? 'items-center' : '')}>
      <div
        className={clsx(
          'flex flex-col',
          isSettingPage ? 'items-center md:flex-row md:items-start' : 'items-start sm:flex-row',
        )}
      >
        <div
          className={clsx(
            'text-center',
            isSettingPage ? 'mb-10 md:mr-10 md:mb-0 md:text-left' : 'mb-2 max-sm:w-full sm:mr-10 sm:mb-10 sm:text-left',
          )}
        >
          {isSettingPage && <p className="mb-3 text-xl font-semibold">경조사 알림을 받을 학번 설정</p>}
          <div className="mb-2">
            <AdmissionYearInput onAdd={addYear} disabled={setAll} isSettingPage={isSettingPage} />
          </div>
          <p className={clsx('mb-2 text-sm text-gray-400', isSettingPage ? '' : 'text-start')}>
            학번 입력 후 추가 버튼을 눌러주세요.
          </p>
          <AllYearToggle checked={setAll} onChange={setAllYearsSelected} isSettingPage={isSettingPage} />
        </div>
        <AdmissionYearList years={years} onRemove={removeYear} isAllSelected={setAll} isSettingPage={isSettingPage} />
      </div>
      {isSettingPage && (
        <Button variant="BLUE" action={onSubmit} className="px-20 py-1 text-lg font-bold">
          저장
        </Button>
      )}
    </div>
  );
};
