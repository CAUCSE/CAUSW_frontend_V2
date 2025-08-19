'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shadcn/components/ui/button';
import { cn } from '@/shadcn/lib/utils';

interface MonthGridViewProps {
  selectedDate: Date | undefined;
  onSelectMonth: (date: Date) => void;
}

export function MonthGridView({ selectedDate, onSelectMonth }: MonthGridViewProps) {
  const [displayYear, setDisplayYear] = React.useState(selectedDate?.getFullYear() || new Date().getFullYear());

  const months = Array.from({ length: 12 }, (_, i) => i); // 0 to 11

  return (
    <div className="p-3">
      <div className="relative flex items-center justify-center pt-1">
        <h2 className="text-sm font-semibold">{displayYear}</h2>
        <div className="absolute flex w-full justify-between px-2">
          <Button variant="ghost" size="icon" onClick={() => setDisplayYear(displayYear - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDisplayYear(displayYear + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {months.map((month) => {
          const isSelected =
            selectedDate &&
            selectedDate.getFullYear() === displayYear &&
            selectedDate.getMonth() === month;

          return (
            <Button
              key={month}
              variant={isSelected ? 'default' : 'ghost'}
              className={cn('h-auto p-2 text-sm', isSelected && 'font-bold')}
              onClick={() => onSelectMonth(new Date(displayYear, month))}
            >
              {month + 1}월
            </Button>
          );
        })}
      </div>
    </div>
  );
}
