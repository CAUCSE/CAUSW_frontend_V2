'use client';

export const NotificationYearListBox = ({
  years,
  isSetAll,
}: Ceremony.NotificationYearListBoxProps) => {
  return (
    <div className="h-40 w-full overflow-y-auto rounded-xl border border-black bg-white p-5 sm:max-w-85">
      {isSetAll ? (
        <span className="text-xl">전체 학번</span>
      ) : years.length > 0 ? (
        years.map((year) => (
          <button
            key={year}
            type="button"
            className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-left text-xl hover:bg-gray-100"
          >
            <span>{year}학번</span>
          </button>
        ))
      ) : null}
    </div>
  );
};
