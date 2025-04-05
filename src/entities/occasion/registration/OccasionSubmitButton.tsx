import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const OccasionSubmitButton = ({ label, onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className="rounded-lg px-10 py-1 text-lg font-bold md:px-16 md:text-xl bg-focus py-2 text-black hover:bg-blue-400"
  >
    {label}
  </button>
);
