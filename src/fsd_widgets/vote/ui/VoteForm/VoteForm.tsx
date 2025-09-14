'use client';

import { notFound, useParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { postQueryKey } from '@/entities/post';
import { VoteOptionSelector } from '@/entities/vote';
import { useSubmitVote } from '@/entities/vote/model/queries';

import { Button } from '@/shadcn/components/ui';

import { voteFormSchema, type VoteFormSchema } from '../../config';

interface VoteFormProps {
  voteData: Vote.VoteResponseDto;
}

export const VoteForm = ({ voteData }: VoteFormProps) => {
  const methods = useForm<VoteFormSchema>({
    resolver: zodResolver(voteFormSchema),
    defaultValues: {},
  });
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const { mutate } = useSubmitVote();

  if (!postId) {
    return notFound();
  }

  const handleSubmit = methods.handleSubmit((data) => {
    const sanitizedData = Object.entries(data)
      .filter(([, value]) => value)
      .map(([optionId]) => optionId);

    mutate(
      {
        dto: {
          voteOptionIdList: sanitizedData,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: postQueryKey.detail({ postId: postId as string }) });
        },
        onError: () => {
          toast.error('투표 제출에 실패했습니다.');
        },
      },
    );
  });

  const canSubmit = methods.formState.isValid;
  const allOptionIds = voteData.options.map((option) => option.id);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          {voteData.options.map((option) => (
            <VoteOptionSelector
              key={option.id}
              option={option}
              allowMultiple={voteData.allowMultiple}
              allOptionIds={allOptionIds}
            />
          ))}
        </div>
        <Button
          className="bg-vote-theme hover:bg-vote-theme w-full cursor-pointer rounded-lg py-3 text-base text-white"
          disabled={!canSubmit}
        >
          투표하기
        </Button>
      </form>
    </FormProvider>
  );
};
