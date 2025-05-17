import clsx from 'clsx';
import type { ControllerRenderProps } from 'react-hook-form';

import CheckBoxIcon from '../../../../../public/images/post/checked-checkbox.svg';
import NonCheckBoxIcon from '../../../../../public/images/post/non-checked-checkbox.svg';

interface CustomToggleProps {
  isChecked: boolean;
  onCheckedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
}

export const CustomToggle = ({ isChecked, onCheckedChange, text }: CustomToggleProps) => {
  return (
    <div className="flex w-[85px] items-center space-x-2">
      <input
        type="checkbox"
        onChange={onCheckedChange}
        className={clsx(
          'h-[1.125rem] w-[1.125rem] cursor-pointer appearance-none rounded-sm border-2 border-solid checked:bg-red-500',
          isChecked ? 'border-red-500' : 'border-[#8C8C8C]',
        )}
      />
      <span className={`text-base ${isChecked ? 'text-checked-text' : 'text-[#8C8C8C]'} text-nowrap`}>{text}</span>
    </div>
  );
};
