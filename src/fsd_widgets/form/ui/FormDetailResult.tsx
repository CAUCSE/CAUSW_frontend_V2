'use client';

import { DetailFormResultHeader } from '@/entities/form/ui';
import { LoadingComponent } from '@/fsd_shared';
import { useFormDetailResult } from '@/entities/form/model/hooks';
import { EmptyResponseResult } from './EmptyResponseResult';
import { FormRespondentInfo } from './FormRespondentInfo';
import { FormResponseResult } from './FormResponseResult';

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
