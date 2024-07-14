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
    className="w-80 h-10 border-2 border-focus rounded-xl bg-black opacity-60 text-sm text-white text-center placeholder:text-center placeholder:text-sm"
  />
);

export const FormSubmitButton = () => (
  <button
    type="submit"
    className="w-80 h-10 flex flex-row justify-center items-center border-2 border-focus rounded-xl bg-zinc-800 text-sm text-focus text-center"
  >
    Enter
    <span className="icon-[iconamoon--arrow-right-2-fill] text-3xl"></span>
  </button>
);
