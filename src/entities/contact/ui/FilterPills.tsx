'use client';
import { X } from 'lucide-react';

interface FilterPillsProps {
  filters: Contact.ContactFilters;
  onFilterChange: (filters: Contact.ContactFilters) => void;
}

const ACADEMIC_STATUS_MAP = {
  ENROLLED: '재학생',
  LEAVE_OF_ABSENCE: '휴학생',
  GRADUATED: '졸업생',
};

export const FilterPills = ({ filters, onFilterChange }: FilterPillsProps) => {
  const { admissionYearStart, admissionYearEnd, academicStatus } = filters;
  const hasFilters = admissionYearStart || admissionYearEnd || (academicStatus && academicStatus.length > 0);

  if (!hasFilters) return null;

  const removeYearFilter = () => {
    const { admissionYearStart, admissionYearEnd, ...rest } = filters;
    onFilterChange(rest);
  };

  const removeStatusFilter = () => {
    const { academicStatus, ...rest } = filters;
    onFilterChange(rest);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {(admissionYearStart || admissionYearEnd) && (
        <button
          onClick={removeYearFilter}
          className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 transition-opacity hover:opacity-80"
        >
          <span>학번: {admissionYearStart ?? ''} ~ {admissionYearEnd ?? ''}</span>
          <X size={16} />
        </button>
      )}
      {academicStatus && academicStatus.length > 0 && (
        <button
          onClick={removeStatusFilter}
          className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 transition-opacity hover:opacity-80"
        >
          <span>
            재학상태:
            <span className="ml-1 font-medium">
              {academicStatus.map((status) => ACADEMIC_STATUS_MAP[status]).join(', ')}
            </span>
          </span>
          <X size={16} />
        </button>
      )}
    </div>
  );
};