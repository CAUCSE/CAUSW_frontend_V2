"use client";

import { useCreateVoteStore } from "@/shared";
import { useState } from "react";

interface VotingFormProps {
  voteTitle: string;
  options: string[];
  isMultipleChoice: boolean;
  allowAnonymous: boolean;
  onVoteTitleChange: (title: string) => void;
  onAddOption: () => void;
  onChangeOption: (index: number, value: string) => void;
  onRemoveOption: (index: number) => void;
  onSelectMultiple: () => void;
  onAllowAnonymous: () => void;
}

export const VotingForm = ({
  voteTitle,
  options,
  isMultipleChoice,
  allowAnonymous,
  onVoteTitleChange,
  onChangeOption,
  onAddOption,
  onRemoveOption,
  onSelectMultiple,
  onAllowAnonymous,
}: VotingFormProps) => {
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  const handleOptionChange = (index: number, value: string) => {
    const isDuplicate = options.some(
      (option, i) => option === value && i !== index,
    );

    if (isDuplicate) {
      setDuplicateError(`"${value}"는 이미 추가된 항목입니다.`);
    } else {
      setDuplicateError(null);
    }

    onChangeOption(index, value);
  };

  const handleRemoveOption = (index: number) => {
    onRemoveOption(index);

    const { options: updatedOptions } = useCreateVoteStore.getState();
    const uniqueOptions = new Set(updatedOptions);
    setDuplicateError(
      uniqueOptions.size !== options.length ? null : duplicateError,
    );
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex w-full items-center lg:space-x-4">
          <div className="mt-4 w-full">
            <input
              type="text"
              placeholder="투표 이름"
              value={voteTitle}
              onChange={(e) => onVoteTitleChange(e.target.value)}
              className="w-full border-b-post-title-input border-black bg-transparent p-1 text-[24px] placeholder:text-create-post-text focus:outline-none lg:p-2"
            />
          </div>
          <div className="mt-4 flex items-center lg:space-x-4">
            <label
              className="flex w-[120px] items-center justify-center space-x-3"
              onClick={onSelectMultiple}
            >
              <span
                className={`h-5 w-5 rounded-full ${isMultipleChoice ? "bg-red-500" : "bg-gray-400"}`}
              ></span>
              <span className="text-gray-700">복수 선택</span>
            </label>
            <label
              className="flex w-[120px] items-center justify-center space-x-3"
              onClick={onAllowAnonymous}
            >
              <span
                className={`h-5 w-5 rounded-full ${allowAnonymous ? "bg-red-500" : "bg-gray-400"}`}
              ></span>
              <span className="text-gray-700">익명 투표</span>
            </label>
          </div>
        </div>
      </div>
      {duplicateError && (
        <div className="text-sm text-red-500">{duplicateError}</div>
      )}
      <div className="mb-4 grid max-h-80 grid-cols-2 gap-4 overflow-x-hidden overflow-y-scroll pr-2 pt-2">
        {options.map((option, index) => (
          <div key={index} className="relative">
            <input
              type="text"
              placeholder="항목 입력"
              className="h-14 w-full rounded border-2 border-gray-300 pl-3 focus:border-gray-600 focus:outline-none"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            <button
              onClick={() => handleRemoveOption(index)}
              className="absolute right-0 top-0 -mr-2 -mt-2 h-5 w-5 rounded-full bg-red-500 text-white"
            >
              -
            </button>
          </div>
        ))}

        <div
          className="flex h-14 justify-center rounded border-2 border-gray-300"
          onClick={onAddOption}
        >
          <button className="text-[16pt]">+</button>
        </div>
      </div>
    </div>
  );
};

export default VotingForm;

/*
 */
