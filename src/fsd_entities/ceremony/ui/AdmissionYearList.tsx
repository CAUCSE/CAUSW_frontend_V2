'use client';

export const AdmissionYearList = ({ years, onRemove, isAllSelected }: Ceremony.AdmissionYearListProps) => {
  return (
    <div
      className={`h-72 w-72 overflow-y-auto rounded-xl border border-black p-5 ${
        isAllSelected ? 'bg-gray-200' : 'bg-white'
      }`}
    >
      {years.map((year) => (
        <div key={year} className="mb-2 flex items-center justify-between">
          <span onClick={() => onRemove(year)} className="cursor-pointer">
            {year}학번
          </span>
          <button
            onClick={() => onRemove(year)}
            className="h-0.5 w-4 scale-150 transform rounded-2xl bg-black"
          ></button>
        </div>
      ))}
    </div>
  );
};
