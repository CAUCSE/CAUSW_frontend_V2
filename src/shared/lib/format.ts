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

// yyyy.mm.dd 형식
export const formatDateToYyyyMmDd = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
