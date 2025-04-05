import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  rules?: RegisterOptions<T>;
  type?: string;
  id?: string;
  placeholder?: string;
}

export const SignInInput = <T extends FieldValues>({ register, name, rules, ...rest }: InputProps<T>) => (
  <input
    {...register(name, rules)}
    {...rest}
    id="specificInput"
    className="peer mt-1 h-10 w-56 rounded-xl border-2 border-focus bg-black text-center text-sm text-white opacity-60 placeholder:text-center placeholder:text-xs autofill:bg-black autofill:text-white autofill:shadow-none sm:w-80 sm:placeholder:text-sm"
  />
);
