import * as Sentry from '@sentry/nextjs';
import { AxiosError } from 'axios';

type CaptureSentryError = Error | AxiosError | unknown;

interface SentryExtra {
  errorCode?: string;
  [key: string]: unknown;
}

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
