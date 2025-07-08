import { useState } from 'react';

import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  rules?: RegisterOptions<T>;
  type?: string;
  id?: string;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
}

export const AuthInput = <T extends FieldValues>({
  register,
  name,
  rules,
  label,
  errorMessage,
  type = 'text',
  ...rest
}: InputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="mx-auto mb-6 flex w-full max-w-md flex-col">
      {label && (
        <label htmlFor={rest.id || name} className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
          {label}
        </label>
      )}

      <div className="relative mr-8">
        <input
          {...register(name, rules)}
          {...rest}
          type={isPassword && showPassword ? 'text' : type}
          id={rest.id || name}
          className={`w-full rounded-md border border-gray-300 bg-white p-2 pr-10 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-700 hover:text-black focus:outline-hidden"
          >
            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        )}
      </div>

      {errorMessage && <span className="text-error">{errorMessage}</span>}
    </div>
  );
};
