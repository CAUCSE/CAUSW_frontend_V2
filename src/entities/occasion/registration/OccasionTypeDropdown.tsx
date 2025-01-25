import React from "react";

interface OccasionDropdownProps {
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}

export const OccasionTypeDropdown = ({ options, placeholder, onChange }: OccasionDropdownProps) => (
  <select
    onChange={(e) => onChange(e.target.value)}
    className="w-full md:w-1/2 block rounded-lg border border-gray-300 p-2 text-base mt-4"
  >
    <option value="">{placeholder}</option>
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
);
