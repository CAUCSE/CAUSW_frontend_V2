'use client';

import { useFormContext } from 'react-hook-form';

import { PostSchema } from '@/fsd_entities/post';
import { VoteOptionInput } from '@/fsd_entities/vote';

import PlusIcon from '../../../../../public/icons/add_icon.svg';

export const VoteOptionList = () => {
  const { setValue, watch } = useFormContext<PostSchema>();

  const optionList = watch('voteCreateRequestDto.options');

  const addVoteOption = () => {
    const newOptionList = [...optionList, ''];
    setValue('voteCreateRequestDto.options', newOptionList);
  };
  return (
    <div className="mb-4 grid max-h-80 grid-cols-2 gap-4 overflow-x-hidden overflow-y-scroll pr-2 pt-2">
      {optionList?.map((option, index) => <VoteOptionInput key={index} index={index} option={option} />)}
      <button
        className="flex h-14 items-center justify-center rounded border-2 border-gray-300 text-center text-black"
        onClick={addVoteOption}
      >
        <PlusIcon width={24} height={24} />
      </button>
    </div>
  );
};
