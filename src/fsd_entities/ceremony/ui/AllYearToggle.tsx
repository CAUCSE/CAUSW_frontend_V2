'use client';

export const AllYearToggle = ({ checked, onChange }: Ceremony.AllYearToggleProps) => {
  return (
    <label className="flex items-center gap-2">
      <span className="text-lg">모든 학번의 경조사 알림 받기</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5" />
    </label>
  );
};
