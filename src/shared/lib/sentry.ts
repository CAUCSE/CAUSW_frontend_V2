import * as Sentry from '@sentry/nextjs';
import { AxiosError } from 'axios';

type CaptureSentryError = Error | AxiosError | unknown;

interface SentryExtra {
  errorCode?: string;
  [key: string]: unknown;
}

/**
 * Sentry로 에러를 전송하는 유틸 함수입니다.
 * @param error - 에러 객체
 * @param type - 에러 분류를 위한 Sentry 태그 (예: 'server_error')
 * @param extra - 함께 전송할 추가 데이터
 * @param level - 로그 심각도 레벨 ('error' | 'warning' | 'fatal')
 */
export const captureSentry = (
  error: CaptureSentryError,
  type: string,
  extra: SentryExtra = {},
  level: 'error' | 'warning' | 'fatal' = 'error',
) => {
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
};
