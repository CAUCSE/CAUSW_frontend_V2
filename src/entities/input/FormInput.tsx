import React from 'react';
import { Path, UseFormRegister, RegisterOptions, FieldValues } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  rules?: RegisterOptions<T>;
  type?: string;
  id?: string;
  placeholder?: string;
}

export const FormInput = <T extends FieldValues>({
  register,
  name,
  rules,
  type,
  placeholder
}: InputProps<T>) => (
  <input
    {...register(name, rules)}
    type={type}
    placeholder={placeholder}
    className="w-full h-10 mb-4 p-2 border border-gray-300 rounded-lg text-base"
  />
);

export const FormSubmitButton = () => (
  <button
    type="submit"
    className="w-full h-10 flex justify-center items-center bg-blue-500 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold"
  >
    확인
  </button>
);
