'use client';

import { NotificationSettingWidget } from '@/fsd_widgets/ceremony';
import { PreviousButton } from '@/fsd_shared';

export default function NotificationSettingPage() {
  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] pb-12 md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <PreviousButton className="mb-8" />
      <div className="mb-14 text-center text-2xl font-medium md:text-3xl">
        경조사 알림 설정
      </div>
      <NotificationSettingWidget />
    </div>
  );
}
