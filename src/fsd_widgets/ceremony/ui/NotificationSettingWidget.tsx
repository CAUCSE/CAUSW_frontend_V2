'use client';

import clsx from 'clsx';

import { AdmissionYearInput, AdmissionYearList, AllYearToggle, useCeremonySettingForm } from '@/fsd_entities/ceremony';

import { Button } from '@/fsd_shared';

interface NotificationSettingWidgetProps {
  isSettingPage?: boolean;
  years?: string[];
  setAll?: boolean;
  addYear?: (year: string) => void;
  removeYear?: (year: string) => void;
  setAllYearsSelected?: (value: boolean) => void;
  onSubmit?: () => void;
}
export const NotificationSettingWidget = (props: NotificationSettingWidgetProps) => {
  const {
    years: internalYears,
    setAll: internalSetAll,
    addYear: internalAddYear,
    removeYear: internalRemoveYear,
    setAllYearsSelected: internalSetAllYearsSelected,
    onSubmit: internalOnSubmit,
  } = useCeremonySettingForm();

  const years = props.years ?? internalYears;
  const setAll = props.setAll ?? internalSetAll;
  const addYear = props.addYear ?? internalAddYear;
  const removeYear = props.removeYear ?? internalRemoveYear;
  const setAllYearsSelected = props.setAllYearsSelected ?? internalSetAllYearsSelected;
  const onSubmit = props.onSubmit ?? internalOnSubmit;

  return (
    <div className={clsx('flex flex-col gap-16', props.isSettingPage ? 'items-center' : '')}>
      <div
        className={clsx(
          'flex flex-col',
          props.isSettingPage ? 'items-center md:flex-row md:items-start' : 'items-start sm:flex-row',
        )}
      >
        <div
          className={clsx(
            'text-center',
            props.isSettingPage
              ? 'mb-10 md:mr-10 md:mb-0 md:text-left'
              : 'mb-2 max-sm:w-full sm:mr-10 sm:mb-10 sm:text-left',
          )}
        >
          {props.isSettingPage && <p className="mb-3 text-xl font-semibold">경조사 알림을 받을 학번 설정</p>}
          <div className="mb-2">
            <AdmissionYearInput onAdd={addYear} disabled={setAll} isSettingPage={props.isSettingPage} />
          </div>
          <p className={clsx('mb-2 text-sm text-gray-400', props.isSettingPage ? '' : 'text-start')}>
            학번 입력 후 추가 버튼을 눌러주세요.
          </p>
          <AllYearToggle checked={setAll} onChange={setAllYearsSelected} isSettingPage={props.isSettingPage} />
        </div>
        <AdmissionYearList
          years={years}
          onRemove={removeYear}
          isAllSelected={setAll}
          isSettingPage={props.isSettingPage}
        />
      </div>
      {props.isSettingPage && (
        <Button variant="BLUE" action={onSubmit} className="px-20 py-1 text-lg font-bold">
          저장
        </Button>
      )}
    </div>
  );
};
