'use client';

import { useState } from 'react';

import { Button } from '@/fsd_shared/ui/Button';

interface Props {
  onAdd: (year: number) => void;
  disabled: boolean;
}

export const AdmissionYearInput = ({ onAdd, disabled }: Props) => {
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
        onChange={e => setYear(e.target.value)}
        className="w-10 border-b border-b-black bg-transparent px-1"
        disabled={disabled}
      />
      <span className="text-2xl mr-14">학번</span>
      <Button
        variant="BLUE"
        action={handleAdd}
        className="text-sm px-4 py-1"
        disabled={disabled || isNaN(parseInt(year))}
      >
        추가
      </Button>
    </div>
  );
};
