'use client';

import { useParams } from 'next/navigation';

import { useVoteDetail } from '@/shared/hooks/stores/post/useVoteDetail';

import { LoadingComponent } from '@/entities';
import { PreviousButton } from '@/fsd_shared';
import { useVoteStore } from '@/shared';

const VoteStatusPage = () => {
  const { vote } = useVoteStore();
  const { voteId } = useParams() as { voteId: string };

  const { loading } = useVoteDetail(voteId);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="h-full w-full">
      <div className="w-full flex-col items-center py-2">
        <PreviousButton />
      </div>
      <div className="flex h-full flex-col p-5">
        <h1 className="mb-3 text-[32px]">투표 현황</h1>
        {vote.options.map((option, index) => (
          <div key={index} className="mb-3">
            <h2 className="border-b-comment-bw border-black pb-3 text-[28px]">
              {`${option.optionName} - ${option.voteCount}명`}
            </h2>
            {!vote.allowAnonymous && (
              <div className="border-b-comment-bw grid grid-cols-4 gap-2 border-dashed border-black py-2">
                {option.voteUsers.length == 0 ? <div className="h-[50px]"></div> : ''}
                {option.voteUsers.map((voter, voterIndex) => (
                  <span key={voterIndex} className="flex flex-row text-[20px]">
                    {`${voter.name}(${voter.studentId})`}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoteStatusPage;
