'use client';

import { VoteForm } from '../VoteForm';
import { VoteInfoSection } from '../VoteInfoSection';
import { VoteResultSectionFooter } from '../VoteResultSectionFooter';
import { VoteResultSectionMain } from '../VoteResultSectionMain';
import { VoteSectionHeader } from '../VoteSectionHeader';

interface VotingSectionProps {
  voteData: Vote.VoteResponseDto;
}

export const VoteSection = ({ voteData }: VotingSectionProps) => {
  const isAnonymous = voteData.allowAnonymous;
  const showResult = voteData.isEnd || voteData.hasVoted;

  return (
    <div className="mb-6 w-full">
      <VoteInfoSection showResult={showResult} voteData={voteData} />

      {showResult ? (
        <div className="border-comment-bw flex flex-col gap-2 rounded-lg border-black bg-white p-3">
          <VoteSectionHeader voteData={voteData} />
          <VoteResultSectionMain voteOptions={voteData.options} totalVote={voteData.totalVoteCount} />
          {!isAnonymous && <VoteResultSectionFooter voteId={voteData.voteId} />}
        </div>
      ) : (
        <div className="border-comment-bw flex flex-col gap-2 rounded-lg border-black bg-white p-3">
          <VoteSectionHeader voteData={voteData} />
          <VoteForm voteData={voteData} />
        </div>
      )}
    </div>
  );
};
