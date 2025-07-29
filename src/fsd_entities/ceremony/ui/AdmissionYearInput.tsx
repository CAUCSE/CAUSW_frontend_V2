'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { Button } from '@/fsd_shared';

export const AdmissionYearInput = ({ onAdd, disabled, isSettingPage = false }: Ceremony.AdmissionYearInputProps) => {
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
        className={clsx(
          'border-b border-b-black bg-transparent px-1',
          isSettingPage ? 'w-10 border-b border-b-black bg-transparent px-1' : 'w-13 text-2xl',
        )}
        disabled={disabled}
      />
      <span className={clsx(isSettingPage ? 'mr-14 text-2xl' : 'mr-9 text-xl')}>학번</span>
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
