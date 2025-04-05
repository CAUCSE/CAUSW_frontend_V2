import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

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
    <div className="flex flex-col w-full mx-auto mb-6">
      {label && (
        <label htmlFor={name} className="text-lg font-semibold mb-2">
          {label}
        </label>
      )}
      <textarea
        {...register(name, rules)}
        id={name}
        placeholder={placeholder}
        maxLength={maxLength}
        className="p-2 border border-gray-300 w-full rounded-md mb-1"
      />
      {errorMessage && (
        <span className="text-error">{errorMessage}</span>
      )}
    </div>
  );
};
