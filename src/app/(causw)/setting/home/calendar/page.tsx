'use client';

import { CalendarList, CalendarListHeader } from '@/fsd_widgets/calender';

const CalendarSettingPage = () => {
  if (typeof window === 'undefined') {
    return;
  }

  return (
    <div className="flex h-full w-full flex-col lg:p-8">
      <CalendarListHeader />
      <CalendarList />
    </div>
  );
};

export default CalendarSettingPage;
