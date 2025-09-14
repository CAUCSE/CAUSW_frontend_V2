// 시작 년도부터 현재 년도까지의 숫자 배열을 내림차순으로 생성
export const generateYearList = (startYear: number = 1972): number[] => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let i = currentYear; i >= startYear; i--) {
    years.push(i);
  }
  return years;
};
