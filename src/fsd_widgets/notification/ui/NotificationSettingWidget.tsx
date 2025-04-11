'use client';

import { useNotificationSettingForm } from '@/fsd_entities/notification/model/useNotificationSettingForm';
import { AdmissionYearInput } from '@/fsd_entities/notification/ui/AdmissionYearInput';
import { AdmissionYearList } from '@/fsd_entities/notification/ui/AdmissionYearList';
import { AllYearToggle } from '@/fsd_entities/notification/ui/AllYearToggle';

import { Button } from '@/fsd_shared/ui/Button';

const NotificationSettingWidget = () => {
  const { years, setAll, setSetAll, addYear, removeYear, onSubmit } = useNotificationSettingForm();

  return (
    <div className="flex flex-col items-center gap-16">
      <div className="flex">
        <div className="mr-10">
          <p className="text-xl font-semibold mb-3">경조사 알림을 받을 학번 설정</p>
          <div className="mb-2">
            <AdmissionYearInput onAdd={addYear} disabled={setAll} />
          </div>
          <p className="text-sm text-gray-400 mb-2">학번 입력 후 추가 버튼을 눌러주세요.</p>
          <AllYearToggle checked={setAll} onChange={setSetAll} />
        </div>
        <AdmissionYearList years={years} onRemove={removeYear} isAllSelected={setAll} />
      </div>
      <Button variant="BLUE" action={onSubmit} className="text-lg font-bold px-20 py-1">
        저장
      </Button>
    </div>
  );
};

export default NotificationSettingWidget;
