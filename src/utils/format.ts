export function formatDateString(dateString: string): string {
  const date = new Date(dateString);

  // 연, 월, 일을 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

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
    // 오늘 작성된 경우: "HH:mm" 형식
    const hours = String(createdTime.getHours()).padStart(2, '0');
    const minutes = String(createdTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  if (now.getFullYear() === createdTime.getFullYear()) {
    // 올해 작성된 경우: "mm/dd" 형식으로 수정
    const month = String(createdTime.getMonth() + 1).padStart(2, '0');
    const day = String(createdTime.getDate()).padStart(2, '0');
    return `${month}/${day}`;
  }
  // 작년 또는 그 이전에 작성된 경우
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

// yyyy.mm.dd 형식
export const formatDateToYyyyMmDd = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
