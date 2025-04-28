import React from 'react';

interface OccasionDropdownProps {
  options: string[];
  placeholder: string;
  onChange: (value: 'MARRIAGE' | 'FUNERAL' | 'ETC') => void;
}

const keyMapping = {
  MARRIAGE: '결혼',
  FUNERAL: '장례식',
  ETC: '기타',
};

export const OccasionTypeDropdown = ({ options, placeholder, onChange }: OccasionDropdownProps) => (
  <select
    onChange={e => onChange(e.target.value as 'MARRIAGE' | 'FUNERAL' | 'ETC')}
    className="mt-4 block w-full rounded-lg border border-gray-300 p-2 text-base md:w-1/2"
  >
    {options.map((option, index) => (
      <option key={index} value={option}>
        {keyMapping[option]}
      </option>
    ))}
  </select>
);
