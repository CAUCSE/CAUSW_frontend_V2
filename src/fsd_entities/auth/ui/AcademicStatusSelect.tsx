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
    <div className="flex flex-col w-full mx-auto mb-6">
      {label && (
        <label htmlFor={name} className="text-lg font-semibold mb-2">
          {label}
        </label>
      )}
      <select
        {...register(name, rules)}
        id={name}
        className="p-2 border border-gray-300 w-full sm:w-96 rounded-md mb-1"
      >
        <option value="">-- 선택해주세요 --</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errorMessage && <span className="text-error">{errorMessage}</span>}
    </div>
  );
};
