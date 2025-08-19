import { Check } from 'lucide-react';

const VoteOptionPercentageBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="relative h-2 w-full rounded-sm bg-gray-300">
      <div className="bg-vote-theme absolute top-0 left-0 h-full rounded-sm" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

interface VoteOptionResultProps {
  totalVoteCount: Vote.VoteResponseDto['totalVoteCount'];
  votedMostOptions: Vote.VoteOption['id'][];
  option: Vote.VoteOption;
}

export const VoteOptionResult = ({ votedMostOptions, option, totalVoteCount }: VoteOptionResultProps) => {
  const percentage = (option.voteCount / totalVoteCount) * 100;

  return (
    <div className="flex flex-col">
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
};
