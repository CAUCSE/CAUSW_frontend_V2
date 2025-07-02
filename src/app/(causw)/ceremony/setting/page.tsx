'use client';

import { NotificationSettingWidget } from '@/fsd_widgets/ceremony';

import { PreviousButton } from '@/fsd_shared';

export default function NotificationSettingPage() {
  return (
    <>
      <PreviousButton />
      <div className="p-12">
        <h1 className="mb-14 text-center text-3xl font-semibold">경조사 알림 설정</h1>
        <NotificationSettingWidget />
      </div>
    </>
  );
}
