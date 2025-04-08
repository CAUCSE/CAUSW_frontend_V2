import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const OccasionSubmitButton = ({ label, onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className="rounded-lg bg-focus px-10 py-1 py-2 text-lg font-bold text-black hover:bg-blue-400 md:px-16 md:text-xl"
  >
    {label}
  </button>
);
