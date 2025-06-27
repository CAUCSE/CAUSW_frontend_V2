'use client';

import React, { useMemo, useState } from 'react';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import clsx from 'clsx';
import { Check, EllipsisVertical } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui';
import { buttonVariants } from '@/shadcn/components/ui/button';
import { useVoteStore, VoteRscService } from '@/shared';

interface VotingSectionProps {
  voteData: Vote.VoteResponseDto;
}

export const VoteSection = ({ voteData }: VotingSectionProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { vote, totalVote, voteOptions, votedMostOptions, endVote, restartVote } = useVoteStore();

  const router = useRouter();
  const path = usePathname();

  const isMultiple = vote.allowMultiple;
  const isAnonymous = vote.allowAnonymous;
  const showResult = vote.isEnd || vote.hasVoted;

  const totalVoteCountText = `총 ${voteData.totalVoteCount}`.concat(voteData.allowAnonymous ? '표' : '명');
  const votingConditionText = useMemo(() => {
    if (voteData.allowAnonymous && voteData.allowMultiple) {
      return '익명, 복수';
    }
    if (voteData.allowAnonymous) {
      return '익명';
    }
    if (voteData.allowMultiple) {
      return '복수';
    }
    return '';
  }, [voteData.allowAnonymous, voteData.allowMultiple]);

  const handleChange = (option: string) => {
    if (isMultiple) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((o) => o !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleViewResult = () => {
    router.push(`${path}/result`);
  };

  const inProgressVoteDropdownItemMetaData: { label: string; onClick: () => void }[] = [
    {
      label: '투표 결과 보기',
      onClick: () => {},
    },
    {
      label: '투표 재시작',
      onClick: () => {},
    },
  ];

  const endVoteDropdownItemMetaData: { label: string; onClick: () => void }[] = [
    {
      label: '투표 현황 보기',
      onClick: () => {},
    },
    {
      label: '투표 종료',
      onClick: () => {},
    },
  ];

  const VoteOptionDropdown = ({ isEnd }: { isEnd: boolean }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className: 'h-4 w-4 cursor-pointer hover:bg-transparent',
            })}
          >
            <EllipsisVertical className="size-4 text-[#B4B1B1]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {(isEnd ? endVoteDropdownItemMetaData : inProgressVoteDropdownItemMetaData).map((item) => (
            <DropdownMenuItem key={item.label} onClick={item.onClick}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const VoteOptionPercentageBar = ({ percentage }: { percentage: number }) => {
    return (
      <div className="relative h-2 w-full rounded-sm bg-gray-300">
        <div
          className="bg-vote-theme absolute top-0 left-0 h-full rounded-sm"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="mb-6 w-full">
      <div className="grid grid-cols-[1fr_minmax(0,300px)_1fr]">
        <div className="flex items-center">
          {showResult && <div className="w-20 text-center text-sm">{totalVoteCountText}</div>}
        </div>
        <div className="w-max-[300px] bg-vote-title w-full px-4 py-3 text-center text-sm font-semibold text-red-500">
          {voteData.title}
        </div>
        <div className="flex items-center">
          {votingConditionText && <div className="w-20 text-center text-sm text-gray-500">{votingConditionText}</div>}
        </div>
      </div>

      {showResult ? (
        <div className="border-comment-bw flex flex-col gap-2 rounded-lg border-black bg-white p-3">
          <div className="flex h-fit justify-end">
            {voteData.isOwner && <VoteOptionDropdown isEnd={voteData.isEnd} />}
          </div>
          <div className="flex flex-col gap-2">
            {voteOptions!.map((option) => {
              const percentage = (option.voteCount / totalVote) * 100;
              return (
                <div key={option.id} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {votedMostOptions.includes(option.id) ? (
                        <Check className="size-5 text-black" />
                      ) : (
                        <div className="h-5 w-5"></div>
                      )}
                      <span className="text-base">{option.optionName}</span>
                    </span>
                    <span className="text-sm">{option.voteCount}명</span>
                  </div>
                  <VoteOptionPercentageBar percentage={percentage} />
                </div>
              );
            })}
          </div>
          {!isAnonymous && (
            <div className="flex h-fit justify-end">
              <Button
                variant="link"
                onClick={handleViewResult}
                className="border-b-comment-bw border-normal-board-role-text text-normal-board-role-text h-fit cursor-pointer p-0 focus:outline-hidden"
              >
                <span className="underline hover:no-underline">투표 결과 확인하기</span>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="border-comment-bw flex flex-col gap-2 rounded-lg border-black bg-white p-3">
          <div className="flex h-fit justify-end">
            {voteData.isOwner && <VoteOptionDropdown isEnd={voteData.isEnd} />}
          </div>
          <div className="flex flex-col gap-2">
            {voteOptions.map((option) => (
              <label key={option.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="vote"
                  value={option.optionName}
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => handleChange(option.id)}
                  className="hidden"
                />
                <span
                  className={clsx(
                    'border-comment-bw inline-block h-5 w-5 border-black transition-all duration-200',
                    selectedOptions.includes(option.id) && 'bg-vote-theme shadow-vote-option',
                    voteData.allowMultiple ? 'rounded-none' : 'rounded-full',
                  )}
                />
                <span className="text-[16px]">{option.optionName}</span>
              </label>
            ))}
          </div>
          <Button className="bg-vote-theme hover:bg-vote-theme w-full cursor-pointer rounded-lg py-3 text-base text-white">
            투표하기
          </Button>
        </div>
      )}
    </div>
  );
};
