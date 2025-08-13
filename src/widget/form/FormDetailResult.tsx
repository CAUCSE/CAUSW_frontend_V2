'use client';

import { DetailFormResultHeader } from '@/entities';
import { LoadingComponent } from '@/fsd_shared';
import { useFormDetailResult } from '@/shared';
import { EmptyResponseResult, FormRespondentInfo, FormResponseResult } from '@/widget';

export const FormDetailResult = () => {
  const {
    isPending,
    isFetchingNextPage,
    totalDetailPage,
    hasNextPage,
    fetchNextPage,
    responseUserInfos,
    totalFormResult,
  } = useFormDetailResult();

  if (isPending || isFetchingNextPage) {
    return <LoadingComponent />;
  }

  if (totalFormResult && totalFormResult[0].replyResponseDtoPage.content.length === 0) {
    return <EmptyResponseResult />;
  }

  return (
    <>
      <DetailFormResultHeader
        totalDetailPage={totalDetailPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
      <div className="flex w-full flex-col items-center gap-8 overflow-y-auto">
        <FormRespondentInfo responseUserInfos={responseUserInfos} />
        <FormResponseResult totalFormResult={totalFormResult} />
      </div>
    </>
  );
};
