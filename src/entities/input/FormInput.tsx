import React from 'react';

import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  rules?: RegisterOptions<T>;
  type?: string;
  id?: string;
  placeholder?: string;
}

export const FormInput = <T extends FieldValues>({ register, name, rules, type, placeholder }: InputProps<T>) => (
  <input
    {...register(name, rules)}
    type={type}
    placeholder={placeholder}
    className="mb-4 h-10 w-full rounded-lg border border-gray-300 p-2 text-base"
  />
);

export const FormSubmitButton = () => (
  <button
    type="submit"
    className="flex h-10 w-full items-center justify-center rounded-lg bg-blue-500 text-sm font-semibold text-white hover:bg-blue-700"
  >
    확인
  </button>
);

export const SignInInput = <T extends FieldValues>({ register, name, rules, ...rest }: InputProps<T>) => (
  <input
    {...register(name, rules)}
    {...rest}
    id="specificInput"
    className="peer border-focus mt-1 h-10 w-56 rounded-xl border-2 bg-black text-center text-sm text-white opacity-60 placeholder:text-center placeholder:text-xs autofill:bg-black autofill:text-white autofill:shadow-none sm:w-80 sm:placeholder:text-sm"
  />
);

export const SignInSubmitButton = () => (
  <button
    type="submit"
    className="text-mb border-focus text-focus mt-3 flex h-10 w-56 flex-row items-center justify-center rounded-xl border-2 bg-zinc-800 pl-2 text-center sm:w-80"
  >
    로그인
    <span className="icon-[iconamoon--arrow-right-2-fill] text-3xl"></span>
  </button>
);
