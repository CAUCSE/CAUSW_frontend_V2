export const CustomCheckBox: React.FC<Form.ICustomCheckBox> = ({ colSize, value, name, register }) => (
  <div className={`${colSpan[colSize]} flex items-center gap-2`}>
    <input
      type="checkbox"
      {...(value ? { value } : {})}
      {...register}
      className="h-4 w-4 cursor-pointer appearance-none rounded-sm border-2 border-solid border-black bg-[length:100%_100%] bg-center bg-no-repeat checked:bg-[url('/icons/checked_icon.png')]"
    />
    <p className="text-sm">{name}</p>
  </div>
);

const colSpan: { [key in 1 | 2 | 3 | 4 | 5]: string } = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
};
