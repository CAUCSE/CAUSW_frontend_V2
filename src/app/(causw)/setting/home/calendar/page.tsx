import { CalendarList, CalendarListHeader } from "@/widget";

const CalendarSettingPage = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col lg:p-8">
        <CalendarListHeader />
        <CalendarList />
      </div>
    </>
  );
};

export default CalendarSettingPage;
