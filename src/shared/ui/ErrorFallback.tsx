import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';
interface ErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorFallback = ({
  message = '데이터를 불러오는 중 문제가 발생했습니다.',
  onRetry = () => window.location.reload()
}: ErrorFallbackProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <AlertTriangle />
        <p className="text-xl font-semibold text-gray-800">{message}</p>
        <p className="text-sm text-gray-500">잠시 후 다시 시도해주세요.</p>
      </div>
      <Button onClick={onRetry} variant="BLUE" className="px-8 py-2">
        다시 시도
      </Button>
    </div>
  );
};