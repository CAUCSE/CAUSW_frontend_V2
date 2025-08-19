'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/shadcn/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
      <Input
        type="search"
        placeholder={placeholder || "이름, 직업, 커리어(회사명)로 검색해 보세요."}
        className="w-full bg-gray-100 py-2 pl-10 pr-10 [&::-webkit-search-cancel-button]:hidden"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};
