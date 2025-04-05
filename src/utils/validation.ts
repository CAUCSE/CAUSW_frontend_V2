import { getTodayDate } from '@/utils/format';

// 날짜 유효성 검사 함수
export const isValidDate = (dateString: string): boolean => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD 형식 체크
  if (!datePattern.test(dateString)) return false;

  const [year, month, day] = dateString.split('-').map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return false; // 숫자인지 체크

  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
};

// 오늘 이전 날짜인지 체크
export const isPastDate = (dateString: string): boolean => {
  return dateString < getTodayDate();
};

// startDate가 endDate보다 앞서는지 확인
export const isStartDateBeforeEndDate = (startDate: string, endDate: string): boolean => {
  return startDate <= endDate;
};
