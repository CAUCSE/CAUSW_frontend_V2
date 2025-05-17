import clsx from 'clsx';

interface CustomCheckBoxProps {
  value: string | number;
  label: string;
  isChecked: boolean;
  onCheckedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const CustomCheckBox = ({ value, label, isChecked, onCheckedChange, className }: CustomCheckBoxProps) => {
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        className="h-4 w-4 cursor-pointer appearance-none rounded-sm border-2 border-solid border-black bg-[length:100%_100%] bg-center bg-no-repeat checked:bg-[url('/icons/checked_icon.png')]"
        onChange={onCheckedChange}
      />
      <p className="text-sm">{label}</p>
    </div>
  );
};
