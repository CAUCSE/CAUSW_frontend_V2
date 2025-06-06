import { cn } from '@/shadcn/lib/utils';

interface DividerProps {
  vertical: boolean;
  className?: string;
}

export const Divider = ({ vertical, className }: DividerProps) => {
  return <div className={cn(vertical ? 'h-4 w-0.25' : 'h-0.25 w-full', 'bg-gray-200', className)} />;
};
