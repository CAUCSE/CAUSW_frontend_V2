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

export const SignUpSelect = <T extends FieldValues>({
  register,
  name,
  label,
  rules,
  errorMessage,
  options,
}: Props<T>) => {
  return (
    <div className="flex flex-col w-full max-w-md mx-auto mb-6">
      {label && (
        <label htmlFor={name} className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
          {label}
        </label>
      )}
      <select
        {...register(name, rules)}
        id={name}
        className="relative mr-8 rounded-md border border-gray-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
