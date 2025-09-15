'use client';

import { useParams } from 'next/navigation';

import { useGetFormTotalResult } from '@/entities/form/model';

export const useFormDetailResult = () => {
  const params = useParams();
  const { formId } = params;
  const USER_INFO_PER_PAGE = 20;

  const {
    data: totalFormResult,
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetchingNextPage,
  } = useGetFormTotalResult(formId as string, USER_INFO_PER_PAGE);

  const responseUserInfos: Form.ReplyResponseDto[] = [];
  let totalDetailPage = 0;

  if (totalFormResult) {
    responseUserInfos.push(...totalFormResult.map((result) => result.replyResponseDtoPage.content).flat());
    totalDetailPage = totalFormResult.reduce((acc, result) => acc + result.replyResponseDtoPage.content.length, 0);
  }

  return {
    totalFormResult,
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetchingNextPage,
    responseUserInfos,
    totalDetailPage,
  };
};
