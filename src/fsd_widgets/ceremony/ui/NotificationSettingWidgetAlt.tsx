'use client';

import { AdmissionYearInput, AdmissionYearList, AllYearToggle, useCeremonySettingForm } from '@/fsd_entities/ceremony';

import { Button } from '@/fsd_shared';

interface NotificationSettingWidgetAltProps {
  view?: boolean;
}
export const NotificationSettingWidgetAlt = ({ view = false }: NotificationSettingWidgetAltProps) => {
  const { years, setAll, setAllYearsSelected, addYear, removeYear, onSubmit } = useCeremonySettingForm();

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col items-start sm:flex-row sm:items-start">
        <div className="mb-2 text-center max-sm:w-full sm:mr-10 sm:mb-10 sm:text-left">
          <div className="mb-2">
            <AdmissionYearInput onAdd={addYear} disabled={setAll} />
          </div>
          <p className="mb-2 text-start text-sm text-gray-400">학번 입력 후 추가 버튼을 눌러주세요.</p>
          <AllYearToggle checked={setAll} onChange={setAllYearsSelected} />
        </div>
        <AdmissionYearList years={years} onRemove={removeYear} isAllSelected={setAll} />
      </div>
    </div>
  );
};
