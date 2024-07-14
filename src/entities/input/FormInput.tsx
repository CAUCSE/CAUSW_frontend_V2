import {
  UseFormRegister,
  FieldValues,
  RegisterOptions,
  Path,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  rules?: RegisterOptions;
  type?: string;
  id?: string;
  placeholder?: string;
}

export const FormInput = <T extends FieldValues>({
  register,
  name,
  rules,
  ...rest
}: InputProps<T>) => (
  <input
    {...register(name, rules)}
    {...rest}
    className="w-80 h-12 border-2 border-focus rounded-2xl bg-black opacity-70 text-white text-center placeholder:text-center placeholder:text-sm "
  />
);
