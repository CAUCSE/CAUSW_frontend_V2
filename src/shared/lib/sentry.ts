import * as Sentry from '@sentry/nextjs';
import axios, { AxiosError } from 'axios';

type CaptureSentryError = Error | AxiosError | unknown;

type SentryType = 'server_error' | 'unexpected_error' | 'network_error';
type SentryLevel = 'error' | 'warning' | 'fatal';
type SentryExtra = {
  errorCode?: string;
  [key: string]: unknown;
};

type SentryFormat = {
  error: unknown;
  type: SentryType;
  level: SentryLevel;
  extra: SentryExtra;
};

/**
 * Sentry로 에러를 전송하는 유틸 함수입니다.
 * @param error - 에러 객체
 * @param type - 에러 분류를 위한 Sentry 태그 (예: 'server_error')
 * @param extra - 함께 전송할 추가 데이터
 * @param level - 로그 심각도 레벨 ('error' | 'warning' | 'fatal')
 */
export function captureSentry(
  error: CaptureSentryError,
  type: string,
  extra: SentryExtra = {},
  level: 'error' | 'warning' | 'fatal' = 'error',
) {
  try {
    Sentry.captureException(error, (scope) => {
      scope.setTag('type', type);
      Object.entries(extra).forEach(([key, value]) =>
        scope.setExtra(key, value),
      );
      scope.setLevel(level);
      scope.setFingerprint([type, extra.errorCode || 'generic']);
      return scope;
    });
  } catch {
    console.warn('Sentry capture failed');
  }
}

/**
 * Axios 에러를 기반으로 Sentry로 전송할 에러 포맷을 생성합니다.
 * @param {Object} params
 * @param params.error - 에러 객체
 * @param params.url - 요청한 API URL
 * @param params.method - 요청 HTTP 메서드
 * @returns Sentry로 전송할 표준화된 에러 포맷
 */
export function createSentryFormat({
  error,
  url,
  method,
}: {
  error: unknown;
  url: string;
  method;
}): SentryFormat {
  let type: SentryType = 'network_error';
  let extra: SentryExtra = { info: '서버 응답이 없습니다.', url, method };
  let level: SentryLevel = 'error';

  if (!axios.isAxiosError(error) || !error.response) {
    return {
      error,
      type,
      level,
      extra,
    };
  }

  const {
    data: { errorCode },
    status,
  } = error.response;

  if (status >= 500) {
    type = 'server_error';
    level = 'fatal';
    extra = { ...extra, info: '서버 내부 오류 발생', status };
  } else {
    type = 'unexpected_error';
    level = 'warning';
    extra = { ...extra, info: '예상치 못한 오류 발생', errorCode };
  }

  return {
    error,
    type,
    level,
    extra,
  };
}
