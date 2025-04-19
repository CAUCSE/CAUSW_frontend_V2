import CheckBoxIcon from '../../../../../public/images/post/checked-checkbox.svg';
import NonCheckBoxIcon from '../../../../../public/images/post/non-checked-checkbox.svg';

interface CustomToggleProps {
  isChecked: boolean;
  onClick: () => void;
  text: string;
}

export const CustomToggle = ({ isChecked, onClick, text }: CustomToggleProps) => {
  return (
    <div className="flex w-[85px] items-center space-x-2">
      <span onClick={onClick}>
        {isChecked ? <CheckBoxIcon width={18} height={18} /> : <NonCheckBoxIcon width={18} height={18} />}
      </span>
      <span className={`text-base ${isChecked ? 'text-checked-text' : 'text-non-checked-text'} text-nowrap`}>
        {text}
      </span>
    </div>
  );
};
