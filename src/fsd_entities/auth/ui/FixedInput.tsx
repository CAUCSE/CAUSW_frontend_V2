import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label?: string;
  value?: string;
}

export const FixedInput = <T extends FieldValues>({
  register,
  name,
  label,
  value,
}: InputProps<T>) => {

  return (
    <>
    <label className="text-lg font-semibold">{label}</label>
          <input
            {...register(name)}
            className="p-2 border border-gray-300 w-full sm:w-1/3 rounded-md mb-1"
            defaultValue={value} 
            readOnly={!!value} 
          >
          </input>
    </>
);
};
