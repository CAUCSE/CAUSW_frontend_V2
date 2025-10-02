import clsx from 'clsx';

interface CustomToggleProps {
  isChecked: boolean;
  onCheckedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
}

export const CustomToggle = ({
  isChecked,
  onCheckedChange,
  text,
}: CustomToggleProps) => {
  return (
    <div className="flex w-[85px] items-center space-x-2">
      <input
        type="checkbox"
        onChange={onCheckedChange}
        className={clsx(
          'h-4.5 w-4.5 cursor-pointer appearance-none rounded-xs border-2 border-solid checked:bg-red-500',
          isChecked ? 'border-red-500' : 'border-[#8C8C8C]',
        )}
      />
      <span
        className={`text-base ${isChecked ? 'text-checked-text' : 'text-[#8C8C8C]'} text-nowrap`}
      >
        {text}
      </span>
    </div>
  );
};
