'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { EllipsisVertical } from 'lucide-react';
import toast from 'react-hot-toast';

import { postQueryKey } from '@/entities/post';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui';
import { buttonVariants } from '@/shadcn/components/ui/button';

import { useEndVote, useRestartVote } from '../../model';

interface VoteActionDropdownProps {
  voteId: Vote.VoteResponseDto['voteId'];
  isEnd: boolean;
}

export const VoteActionDropdown = ({
  voteId,
  isEnd,
}: VoteActionDropdownProps) => {
  const queryClient = useQueryClient();

  const { mutate: restartVote } = useRestartVote();
  const { mutate: endVote } = useEndVote();

  const router = useRouter();
  const path = usePathname();
  const { postId } = useParams() as { postId: string };

  const handleViewResult = () => {
    router.push(`${path}/result/${voteId}`);
  };

  const inProgressVoteDropdownItemMetaData: {
    label: string;
    onClick: () => void;
  }[] = [
    {
      label: '투표 결과 보기',
      onClick: handleViewResult,
    },
    {
      label: '투표 종료',
      onClick: () => {
        endVote(
          { param: { voteId } },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: postQueryKey.detail({ postId }),
              });
            },
            onError: () => {
              toast.error('투표 종료에 실패했습니다.');
            },
          },
        );
      },
    },
  ];

  const endVoteDropdownItemMetaData: { label: string; onClick: () => void }[] =
    [
      {
        label: '투표 현황 보기',
        onClick: handleViewResult,
      },
      {
        label: '투표 재시작',
        onClick: () => {
          restartVote(
            { param: { voteId } },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: postQueryKey.detail({ postId }),
                });
              },
              onError: () => {
                toast.error('투표 재시작에 실패했습니다.');
              },
            },
          );
        },
      },
    ];

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
        {(isEnd
          ? endVoteDropdownItemMetaData
          : inProgressVoteDropdownItemMetaData
        ).map((item) => (
          <DropdownMenuItem key={item.label} onClick={item.onClick}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
