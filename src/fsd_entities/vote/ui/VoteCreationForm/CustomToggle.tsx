import clsx from 'clsx';

interface CustomToggleProps {
  isChecked: boolean;
  onCheckChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
}

export const CustomToggle = ({ isChecked, onCheckChanged, text }: CustomToggleProps) => {
  return (
    <div className="flex w-[120px] items-center justify-center space-x-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onCheckChanged}
        className={clsx(
          'h-[1.125rem] w-[1.125rem] cursor-pointer appearance-none rounded-full border-2 border-solid checked:bg-red-500',
          isChecked ? 'border-red-500' : 'border-[#8C8C8C]',
        )}
      />
      <p className={clsx('text-base', isChecked ? 'text-checked-text' : 'text-[#8C8C8C]')}>{text}</p>
    </div>
  );
};
