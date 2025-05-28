import React from 'react';

interface TextAreaProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const OccasionTextArea = ({ placeholder, value, onChange }: TextAreaProps) => (
  <textarea
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="h-64 w-full rounded-2xl border border-gray-300 p-2"
  />
);
