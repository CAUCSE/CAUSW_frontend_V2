'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@/fsd_shared';

interface AdmissionYearInputProps {
  onAdd: (year: string) => void;
  disabled?: boolean;
  isSettingPage?: boolean;
}

export const AdmissionYearInput = ({
                                     onAdd,
                                     disabled = false,
                                     isSettingPage = false,
                                   }: AdmissionYearInputProps) => {
  const [year, setYear] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    setYear(value);
  };

  const handleAdd = () => {
    const parsed = parseInt(year);
    if (!isNaN(parsed)) {
      const formattedYear = String(parsed).padStart(2, '0');
      onAdd(formattedYear);
      setYear('');
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={year}
        onChange={handleChange}
        className={clsx(
          'border-b border-b-black bg-transparent px-1',
          isSettingPage ? 'w-10' : 'w-13 text-2xl',
        )}
        disabled={disabled}
      />
      <span className={clsx(isSettingPage ? 'mr-14 text-2xl' : 'mr-9 text-xl')}>
        학번
      </span>
      <Button
        variant="BLUE"
        action={handleAdd}
        className="px-4 py-1 text-sm"
        disabled={disabled || year.length === 0 || isNaN(parseInt(year))}
      >
        추가
      </Button>
    </div>
  );
};
