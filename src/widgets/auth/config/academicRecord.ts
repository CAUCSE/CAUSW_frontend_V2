export const STATUS_OPTIONS = [
  { value: 'ENROLLED', label: '재학' },
  { value: 'LEAVE_OF_ABSENCE', label: '휴학' },
  { value: 'GRADUATED', label: '졸업' },
];

export const SEMESTER_OPTIONS = [
  { value: '1', label: '1차 학기' },
  { value: '2', label: '2차 학기' },
  { value: '3', label: '3차 학기' },
  { value: '4', label: '4차 학기' },
  { value: '5', label: '5차 학기' },
  { value: '6', label: '6차 학기' },
  { value: '7', label: '7차 학기' },
  { value: '8', label: '8차 학기' },
  { value: '9', label: '9차 학기 이상' },
];

export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 1971 }, (_, i) => ({
    value: `${currentYear - i}`,
    label: `${currentYear - i}년`,
  }));
};

export const MONTH_OPTIONS = [
  { value: 'FEBRUARY', label: '2월' },
  { value: 'AUGUST', label: '8월' },
];
