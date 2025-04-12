'use client';

interface AllYearToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
}

export const AllYearToggle = ({ checked, onChange }: AllYearToggleProps) => {
  return (
    <label className="flex items-center gap-2">
      <span className="text-lg">모든 학번의 경조사 알림 받기</span>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="w-5 h-5" />
    </label>
  );
};
