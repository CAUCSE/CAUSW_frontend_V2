export function formatDateString(dateString: string): string {
  const date = new Date(dateString);

  // 연, 월, 일을 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0'); // 날짜를 2자리로 맞춤

  // 원하는 형식으로 반환
  return `${year} / ${month} / ${day}`;
}

export const getTimeDifference = (ISOtime: string) => {
  const createdTime = new Date(ISOtime);
  const now = new Date();
  const diffMSec = now.getTime() - createdTime.getTime();
  const diffMin = Math.round(diffMSec / (60 * 1000));

  if (diffMin === 0) {
    return `방금 전`;
  }
  if (diffMin < 60) {
    return `${diffMin}분 전`;
  }
  if (
    now.getFullYear() === createdTime.getFullYear() &&
    now.getMonth() === createdTime.getMonth() &&
    now.getDate() === createdTime.getDate()
  ) {
    return `${createdTime.getHours()}:${createdTime.getMinutes()}`;
  }
  if (now.getFullYear() === createdTime.getFullYear()) {
    return `${createdTime.getMonth() + 1}/${createdTime.getDate()}`;
  }
  return `${now.getFullYear() - createdTime.getFullYear()}년 전`;
};

export async function formatUrlToFile(url: string, fileName: string): Promise<File> {
  const response = await fetch(url);

  // 서버로부터의 응답이 성공적인지 확인
  if (!response.ok) {
    throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
  }

  // Blob 데이터 추출
  const blob = await response.blob();

  // Blob의 MIME 타입 확인 (자동 감지)
  const mimeType = blob.type;

  // Blob 데이터를 File 객체로 변환
  const file = new File([blob], fileName, { type: mimeType });
  return file;
}

export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD 형식 반환
};
