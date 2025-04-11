'use client';

interface Props {
  years: number[];
  onRemove: (year: number) => void;
  isAllSelected?: boolean;
}

export const AdmissionYearList = ({ years, onRemove, isAllSelected }: Props) => {
  return (
    <div
      className={`w-72 h-72 overflow-y-auto border border-black rounded-xl p-5 ${
        isAllSelected ? 'bg-gray-200' : 'bg-white'
      }`}
    >
      {years.map(year => (
        <div key={year} className="flex justify-between items-center mb-2">
          <span
            onClick={() => onRemove(year)}
            className="cursor-pointer"
          >
            {year}학번
          </span>
          <button onClick={() => onRemove(year)} className="w-4 h-0.5 rounded-2xl bg-black transform scale-150"></button>
        </div>
      ))}
    </div>
  );
};
