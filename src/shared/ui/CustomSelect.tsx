'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/components/ui';

interface CustomSelectProps {
  value: number;
  onChange: (value: number) => void;
  itemList: number[];
  suffix: string;
  placeholder: string;
  widthClass?: string; // 너비 클래스를 prop으로 받도록 추가
}

export const CustomSelect = ({
  value,
  onChange,
  itemList,
  suffix,
  placeholder,
  widthClass = 'w-28',
}: CustomSelectProps) => {
  const handleValueChange = (stringValue: string) => {
    onChange(Number(stringValue));
  };

  return (
    <Select onValueChange={handleValueChange} value={String(value)}>
      <SelectTrigger className={widthClass}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-56 min-w-[var(--radix-select-trigger-width)]">
        {itemList.map((item) => (
          <SelectItem key={item} value={String(item)}>
            {item}
            {suffix}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
