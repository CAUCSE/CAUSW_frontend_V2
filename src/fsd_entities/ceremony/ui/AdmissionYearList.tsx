'use client';

export const AdmissionYearList = ({ years, onRemove, isAllSelected }: Ceremony.AdmissionYearListProps) => {
  return (
    <div
      className={`h-72 w-72 overflow-y-auto rounded-xl border border-black p-5 ${
        isAllSelected ? 'bg-gray-200' : 'bg-white'
      }`}
    >
      {years.map((year) => (
        <div
          key={year}
          onClick={() => onRemove(year)}
          className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100"
        >
          <span>{year}학번</span>
          <div className="h-0.5 w-4 scale-150 transform rounded-2xl bg-black"></div>
        </div>
      ))}
    </div>
  );
};
