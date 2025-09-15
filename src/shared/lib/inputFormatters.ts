// yyyy-mm-dd 형식
export const formatDateInput = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  const match = digits.match(/^(\d{0,4})(\d{0,2})(\d{0,2})$/);
  if (!match) return '';
  return [match[1], match[2], match[3]].filter(Boolean).join('-');
};
