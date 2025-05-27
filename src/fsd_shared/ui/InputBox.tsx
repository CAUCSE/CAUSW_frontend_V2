'use client';

import React from 'react';

interface InputBoxProps {
  width?: string; // 예: 'w-64'
  height?: string; // 예: 'h-10'
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  inputType?: 'single-line' | 'multi-line';
  type?: string;
}

export const InputBox: React.FC<InputBoxProps> = ({
  width = 'w-full',
  height = 'h-10',
  hint = '',
  value,
  onChange,
  inputType = 'single-line',
  type = 'text',
}) => {
  const baseStyle = `appearance-none pr-3 pl-3 bg-white border border-[#BABABA] rounded-[10px] text-black ${width} ${height}`;

  if (inputType === 'multi-line') {
    return (
      <textarea
        placeholder={hint}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${baseStyle} resize-none py-2`}
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={hint}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={baseStyle}
    />
  );
};
