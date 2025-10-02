import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions<T>;
  errorMessage?: string;
  maxLength?: number;
}

export const InfoTextArea = <T extends FieldValues>({
  register,
  name,
  label,
  placeholder,
  rules,
  errorMessage,
  maxLength = 500,
}: Props<T>) => {
  return (
    <div className="mx-auto mb-6 flex w-full flex-col">
      {label && (
        <label htmlFor={name} className="mb-2 text-lg font-semibold">
          {label}
        </label>
      )}
      <textarea
        {...register(name, rules)}
        id={name}
        placeholder={placeholder}
        maxLength={maxLength}
        className="mb-1 w-full rounded-md border border-gray-300 p-2"
      />
      {errorMessage && <span className="text-error">{errorMessage}</span>}
    </div>
  );
};
