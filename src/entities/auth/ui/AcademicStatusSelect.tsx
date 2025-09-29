import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions<T>;
  errorMessage?: string;
  options: { value: string; label: string }[];
}

export const AcademicStatusSelect = <T extends FieldValues>({
  register,
  name,
  label,
  rules,
  errorMessage,
  options,
}: Props<T>) => {
  return (
    <div className="mx-auto mb-6 flex w-full flex-col">
      {label && (
        <label htmlFor={name} className="mb-2 text-lg font-semibold">
          {label}
        </label>
      )}
      <select
        {...register(name, rules)}
        id={name}
        className="mb-1 w-full rounded-md border border-gray-300 p-2 sm:w-96"
      >
        <option value="">-- 선택해주세요 --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errorMessage && <span className="text-error">{errorMessage}</span>}
    </div>
  );
};
