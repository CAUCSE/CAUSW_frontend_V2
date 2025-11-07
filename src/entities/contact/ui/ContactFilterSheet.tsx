'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/shadcn/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/ui/select';
import { Sheet, SheetContent, SheetFooter } from '@/shadcn/components/ui/sheet';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shadcn/components/ui/toggle-group';

interface ContactFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialFilters: Contact.ContactFilters;
  onApply: (filters: Contact.ContactFilters) => void;
}

export const ContactFilterSheet = ({
  open,
  onOpenChange,
  initialFilters,
  onApply,
}: ContactFilterSheetProps) => {
  const currentYear = new Date().getFullYear();
  const defaultFilters = {
    admissionYearStart: 1972,
    admissionYearEnd: currentYear,
    academicStatus: [],
  };

  const [tempFilters, setTempFilters] = useState<Contact.ContactFilters>({
    ...defaultFilters,
    ...initialFilters,
  });
  const [openSelect, setOpenSelect] = useState<'start' | 'end' | null>(null);

  useEffect(() => {
    if (open) {
      setTempFilters({ ...defaultFilters, ...initialFilters });
    }
  }, [open, initialFilters, currentYear]);

  const yearOptions = Array.from(
    { length: currentYear - 1972 + 1 },
    (_, i) => currentYear - i,
  );

  const handleApply = () => {
    onApply(tempFilters);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="mx-auto w-full max-w-5xl rounded-t-2xl p-6"
        showCloseButton={false}
      >
        <div className="mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-full bg-gray-300 sm:h-[5px] sm:w-[60px]" />

        <div className="flex flex-col gap-6 py-6">
          <div className="flex-1">
            <label className="text-sm">학번</label>
            <div className="mt-2 flex items-center gap-2">
              <Select
                open={openSelect === 'start'}
                onOpenChange={(isOpen) =>
                  setOpenSelect(isOpen ? 'start' : null)
                }
                value={tempFilters.admissionYearStart?.toString()}
                onValueChange={(v) =>
                  setTempFilters((p) => ({
                    ...p,
                    admissionYearStart: Number(v),
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="h-60">
                  {yearOptions.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>~</span>
              <Select
                open={openSelect === 'end'}
                onOpenChange={(isOpen) => setOpenSelect(isOpen ? 'end' : null)}
                value={tempFilters.admissionYearEnd?.toString()}
                onValueChange={(v) =>
                  setTempFilters((p) => ({ ...p, admissionYearEnd: Number(v) }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="h-60">
                  {yearOptions.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1">
            <label className="text-sm">학적상태</label>
            <ToggleGroup
              type="multiple"
              className="mt-2 flex justify-start gap-2"
              value={tempFilters.academicStatus || []}
              onValueChange={(
                values: ('ENROLLED' | 'LEAVE_OF_ABSENCE' | 'GRADUATED')[],
              ) => {
                setTempFilters((p) => ({ ...p, academicStatus: values }));
              }}
            >
              <ToggleGroupItem value="ENROLLED" className="font-normal">
                재학생
              </ToggleGroupItem>
              <ToggleGroupItem value="LEAVE_OF_ABSENCE" className="font-normal">
                휴학생
              </ToggleGroupItem>
              <ToggleGroupItem value="GRADUATED" className="font-normal">
                졸업생
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <SheetFooter className="pb-[37px]">
          <Button className="w-full" onClick={handleApply}>
            적용하기
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
