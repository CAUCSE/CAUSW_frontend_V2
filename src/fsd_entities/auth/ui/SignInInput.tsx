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
    id={name}
    className="peer focus:border-focus mb-1 w-full border-2 border-[#e9ebeb] bg-white px-6 py-3 text-start text-xs placeholder:text-[#999] autofill:text-black autofill:shadow-none"
  />
);
