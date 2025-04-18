import clsx from 'clsx';

interface CustomToggleProps {
  isActive: boolean;
  onClick: () => void;
  text: string;
}

export const CustomToggle = ({ isActive, onClick, text }: CustomToggleProps) => {
  return (
    <div className="flex w-[120px] items-center justify-center space-x-3">
      <button
        className={clsx('h-5 w-5 rounded-full', isActive ? 'bg-red-500' : 'bg-gray-400')}
        onClick={onClick}
      ></button>
      <span className="text-gray-700">{text}</span>
    </div>
  );
};
