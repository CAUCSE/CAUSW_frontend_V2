'use client';

import clsx from 'clsx';
import { Search, X } from 'lucide-react';

import { Input } from '@/shadcn/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  bgColor?: string;
  textSize?: string;
}

export const SearchBar = ({ value, onChange, placeholder, bgColor, textSize }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" size={20} />
      <Input
        type="search"
        placeholder={placeholder || '이름, 직업, 커리어(회사명)로 검색해 보세요.'}
        className={clsx(
          'w-full py-2 pr-10 pl-10 [&::-webkit-search-cancel-button]:hidden',
          bgColor || 'bg-gray-100',
          textSize || '',
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};
