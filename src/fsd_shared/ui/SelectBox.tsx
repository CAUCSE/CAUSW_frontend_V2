'use client';

import React from 'react';

interface SelectBoxProps {
  width?: string;
  height?: string;
  options: { label: string; value: string }[];
  hint?: string;
  value: string;
  onChange: (value: string) => void;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
  width = 'w-full',
  height = 'h-10',
  options,
  hint = '선택해 주세요',
  value,
  onChange,
}) => {
  const textColorClass = value === '' ? 'text-gray-500' : 'text-black';

  return (
    <div className={`relative ${width} ${height}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none rounded-[10px] border border-[#BABABA] bg-white pr-10 pl-3 ${width} ${height} ${textColorClass}`}
      >
        <option value="" disabled>
          {hint}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform">
        <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};
