import { useState } from 'react';

import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import { UseTerms } from '@/shared';

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label?: string;
  rules?: RegisterOptions<T>;
  errorMessage?: string;
}
export const SignUpCheckbox = <T extends FieldValues>({
  register,
  name,
  label,
  rules,
  errorMessage,
}: Props<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="checkbox"
          id={name}
          {...register(name, rules)}
          className="h-4 w-4"
        />
        <label
          className="text-sm text-gray-700 underline"
          onClick={() => setIsModalOpen(true)}
        >
          {label}
        </label>
      </div>
      {errorMessage && (
        <span className="text-error text-sm">{errorMessage}</span>
      )}
      {isModalOpen && (
        <div>
          <UseTerms
            closeModal={() => {
              setIsModalOpen(false);
            }}
          ></UseTerms>
        </div>
      )}
    </div>
  );
};
