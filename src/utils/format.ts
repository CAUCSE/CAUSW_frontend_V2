export function formatDateString(dateString: string): string {
  const date = new Date(dateString);

  // 연, 월, 일을 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0"); // 날짜를 2자리로 맞춤

  // 원하는 형식으로 반환
  return `${year} / ${month} / ${day}`;
}
