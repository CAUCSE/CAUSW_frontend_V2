'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/shadcn/lib/utils';
import { Button } from '@/shadcn/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shadcn/components/ui/dialog';
import { MonthGridView } from './MonthGridView';

interface MonthPickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const stringToDate = (value: string): Date | undefined => {
  if (!value || value.length !== 6) return undefined;
  const year = parseInt(value.substring(0, 4), 10);
  const month = parseInt(value.substring(4, 6), 10) - 1;
  return new Date(year, month);
};

const dateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}${month}`;
};

export function MonthPicker({ value, onChange, placeholder }: MonthPickerProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [positionStyle, setPositionStyle] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const popoverHeight = 220;

      const topPosition =
        spaceBelow < popoverHeight + 8
          ? rect.top - popoverHeight - 8
          : rect.bottom + 8;

      setPositionStyle({
        top: `${topPosition}px`,
        left: `${rect.left}px`,
        minWidth: `${rect.width}px`,
      });
    }
  }, [open]);

  const handleMonthSelect = (date: Date) => {
    onChange(dateToString(date));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div style={{ position: 'relative' }}>
        <DialogTrigger asChild>
          <Button
            ref={triggerRef}
            type="button"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal text-xs sm:text-sm',
              !value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {value && stringToDate(value)
              ? format(stringToDate(value)!, 'yyyy-MM')
              : <span>{placeholder || '날짜 선택'}</span>}
          </Button>
        </DialogTrigger>
        {open && (
          <DialogContent className="p-0" positionStyle={positionStyle}>
            <MonthGridView
              selectedDate={stringToDate(value)}
              onSelectMonth={handleMonthSelect}
            />
          </DialogContent>
        )}
      </div>
    </Dialog>
  );
}
