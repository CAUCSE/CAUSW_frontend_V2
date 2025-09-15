import { Label } from '@/shadcn/components/ui/label';

interface FormFieldProps {
  label: string;
  hint?: string;
  errorMessage?: string;
  children: React.ReactNode;
}

export const FormField = ({ label, hint, errorMessage, children }: FormFieldProps) => {
  return (
    <div className="grid w-full items-center gap-2">

      <Label htmlFor={label}>{label}</Label>
      {children}
      {errorMessage ? (
        <p className="text-sm text-red-500">{errorMessage}</p>
      ) : (
        hint && <p className="text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
};
