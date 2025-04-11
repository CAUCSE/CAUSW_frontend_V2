'use client';

import { PreviousButton } from '@/fsd_shared/ui/previousButton';
import NotificationSettingWidget from '@/fsd_widgets/notification/ui/NotificationSettingWidget';

export default function NotificationSettingPage() {
  return (
    <div className="">
      <PreviousButton />
      <div className="p-12">
        <h1 className="text-3xl font-semibold mb-14 text-center">경조사 알림 설정</h1>
        <NotificationSettingWidget />
      </div>
    </div>
  );
}
