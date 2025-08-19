import axios from 'axios';

/**
 * Axios 에러에서 사용자에게 표시할 메시지를 추출합니다.
 * @param error - 에러 객체
 * @param defaultMessage - 기본 에러 메시지
 * @returns 파싱된 에러 메시지
 */
export const parseErrorMessage = (error: unknown, defaultMessage: string = '오류가 발생했습니다.'): string => {
  // Axios 에러인 경우
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    console.error('Axios Error:', error);
    if (message) return message;

    return error.message;
  }

  // 일반 에러인 경우
  if (error instanceof Error) {
    console.error('gen Error:', error);
    return error.message;
  }

  return defaultMessage;
};
