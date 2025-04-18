'use client';

import { useShallow } from 'zustand/react/shallow';

import MinusIcon from '../../../../../public/icons/minus_icon.svg';
import { useVoteCreationStore } from '../../model';

interface VoteOptionInputProps {
  index: number;
  option: string;
}

export const VoteOptionInput = ({ index, option }: VoteOptionInputProps) => {
  const { setVoteOption, removeVoteOption } = useVoteCreationStore(
    useShallow(state => ({
      setVoteOption: state.setVoteOption,
      removeVoteOption: state.removeVoteOption,
    })),
  );

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoteOption(index, e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="항목 입력"
        className="h-14 w-full rounded border-2 border-gray-300 pl-3 focus:border-gray-600 focus:outline-none"
        value={option}
        onChange={handleOptionChange}
      />
      <button
        onClick={() => removeVoteOption(index)}
        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
      >
        <MinusIcon width={16} height={16} />
      </button>
    </div>
  );
};
