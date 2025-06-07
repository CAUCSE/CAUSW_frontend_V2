'use client';

import { useState } from 'react';

import { Button } from '@/fsd_shared/ui/Button';

interface AdmissionYearInputProps {
  onAdd: (year: number) => void;
  disabled: boolean;
}

export const AdmissionYearInput = ({ onAdd, disabled }: AdmissionYearInputProps) => {
  const [year, setYear] = useState('');

  const handleAdd = () => {
    const parsed = parseInt(year);
    if (!isNaN(parsed)) {
      onAdd(parsed);
      setYear('');
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-10 border-b border-b-black bg-transparent px-1"
        disabled={disabled}
      />
      <span className="mr-14 text-2xl">학번</span>
      <Button
        variant="BLUE"
        action={handleAdd}
        className="px-4 py-1 text-sm"
        disabled={disabled || isNaN(parseInt(year))}
      >
        추가
      </Button>
    </div>
  );
};
