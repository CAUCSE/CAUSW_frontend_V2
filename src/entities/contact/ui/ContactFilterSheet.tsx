'use client';

import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/shadcn/components/ui/sheet';
import { Button } from '@/shadcn/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/shadcn/components/ui/toggle-group';

interface ContactFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialFilters: Contact.ContactFilters;
  onApply: (filters: Contact.ContactFilters) => void;
}

export const ContactFilterSheet = ({ open, onOpenChange, initialFilters, onApply }: ContactFilterSheetProps) => {
  const [tempFilters, setTempFilters] = useState<Contact.ContactFilters>(initialFilters);
  const [openSelect, setOpenSelect] = useState<'start' | 'end' | null>(null);

  useEffect(() => {
    if (open) {
      setTempFilters(initialFilters);
    }
  }, [open, initialFilters]);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1995 + 1 }, (_, i) => currentYear - i);

  const handleApply = () => {
    onApply(tempFilters);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto w-full max-w-5xl rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>필터</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 py-6 sm:flex-row">
          <div className="flex-1">
            <label className="text-sm font-medium">학번</label>
            <div className="mt-2 flex items-center gap-2">
              <Select
                open={openSelect === 'start'}
                onOpenChange={(isOpen) => setOpenSelect(isOpen ? 'start' : null)}
                value={tempFilters.admissionYearStart?.toString()}
                onValueChange={(v) => setTempFilters((p) => ({ ...p, admissionYearStart: Number(v) }))}
              >
                <SelectTrigger><SelectValue placeholder="시작" /></SelectTrigger>
                <SelectContent className="h-60">{yearOptions.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
              </Select>
              <span>~</span>
              <Select
                open={openSelect === 'end'}
                onOpenChange={(isOpen) => setOpenSelect(isOpen ? 'end' : null)}
                value={tempFilters.admissionYearEnd?.toString()}
                onValueChange={(v) => setTempFilters((p) => ({ ...p, admissionYearEnd: Number(v) }))}
              >
                <SelectTrigger><SelectValue placeholder="종료" /></SelectTrigger>
                <SelectContent className="h-60">{yearOptions.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium">학적상태</label>
            <ToggleGroup
              type="multiple"
              className="mt-2 grid grid-cols-3"
              value={tempFilters.academicStatus || []}
              onValueChange={(values: ('ENROLLED' | 'LEAVE_OF_ABSENCE' | 'GRADUATED')[]) => {
                setTempFilters((p) => ({ ...p, academicStatus: values }));
              }}
            >
              <ToggleGroupItem value="ENROLLED">재학생</ToggleGroupItem>
              <ToggleGroupItem value="LEAVE_OF_ABSENCE">휴학생</ToggleGroupItem>
              <ToggleGroupItem value="GRADUATED">졸업생</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <SheetFooter>
          <Button className="w-full" onClick={handleApply}>
            적용하기
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
