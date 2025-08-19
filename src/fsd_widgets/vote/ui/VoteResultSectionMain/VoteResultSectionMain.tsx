import { VoteOptionResult } from '@/fsd_entities/vote';

interface VoteResultSectionMainProps {
  voteOptions: Vote.VoteOption[];
  totalVote: number;
}

export const VoteResultSectionMain = ({ voteOptions, totalVote }: VoteResultSectionMainProps) => {
  const maxVoteCount = Math.max(...voteOptions.map((option) => option.voteCount));
  const votedMostOptions = voteOptions.filter((option) => option.voteCount === maxVoteCount).map((option) => option.id);

  return (
    <div className="flex flex-col gap-2">
      {voteOptions.map((option) => {
        return (
          <VoteOptionResult
            key={option.id}
            votedMostOptions={votedMostOptions}
            option={option}
            totalVoteCount={totalVote}
          />
        );
      })}
    </div>
  );
};
