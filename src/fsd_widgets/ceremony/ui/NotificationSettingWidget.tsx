'use client';

import { AdmissionYearInput, AdmissionYearList, AllYearToggle, useCeremonySettingForm } from '@/fsd_entities/ceremony';

import { Button } from '@/fsd_shared';

export const NotificationSettingWidget = () => {
  const { years, setAll, setAllYearsSelected, addYear, removeYear, onSubmit } = useCeremonySettingForm();

  return (
    <div className="flex flex-col items-center gap-16">
      <div className="flex flex-col items-center md:flex-row md:items-start">
        <div className="mb-10 text-center md:mr-10 md:mb-0 md:text-left">
          <p className="mb-3 text-xl font-semibold">경조사 알림을 받을 학번 설정</p>
          <div className="mb-2">
            <AdmissionYearInput onAdd={addYear} disabled={setAll} isSettingPage={true} />
          </div>
          <p className="mb-2 text-sm text-gray-400">학번 입력 후 추가 버튼을 눌러주세요.</p>
          <AllYearToggle checked={setAll} onChange={setAllYearsSelected} isSettingPage={true} />
        </div>
        <AdmissionYearList years={years} onRemove={removeYear} isAllSelected={setAll} isSettingPage={true} />
      </div>
      <Button variant="BLUE" action={onSubmit} className="px-20 py-1 text-lg font-bold">
        저장
      </Button>
    </div>
  );
};
