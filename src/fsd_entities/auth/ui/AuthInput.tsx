'use client';

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
  formatter?: (value: string) => string;
}

export const AuthInput = <T extends FieldValues>({
  register,
  name,
  rules,
  label,
  errorMessage,
  formatter,
  type = 'text',
  ...rest
}: InputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const { onChange: formOnChange, ...restOfRegister } = register(name, rules);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formatter) {
      const originalValue = e.target.value;
      const formattedValue = formatter(originalValue);
      e.target.value = formattedValue;
    }
    formOnChange(e);
  };

  return (
    <div className="mx-auto mb-6 flex w-full max-w-md flex-col">
      {label && (
        <label htmlFor={rest.id || name} className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          {...restOfRegister} // name, onBlur, ref 등 나머지 속성 적용
          {...rest}
          onChange={handleChange}
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
            {showPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
          </button>
        )}
      </div>

      {errorMessage && <span className="text-error">{errorMessage}</span>}
    </div>
  );
};
