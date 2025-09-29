interface VoteInfoSectionProps {
  showResult: boolean;
  voteData: Pick<Vote.VoteResponseDto, 'title' | 'allowAnonymous' | 'allowMultiple' | 'totalVoteCount'>;
}

export const VoteInfoSection = ({ showResult, voteData }: VoteInfoSectionProps) => {
  const voteCountUnit = voteData.allowMultiple ? '표' : '명';
  const totalVoteCountText = `총 ${voteData.totalVoteCount}${voteCountUnit}`;
  const votingConditionText = (() => {
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
  })();

  return (
    <section className="grid grid-cols-[1fr_minmax(0,300px)_1fr]">
      <div className="flex items-center">
        {showResult && <div className="w-20 text-center text-sm">{totalVoteCountText}</div>}
      </div>
      <div className="w-max-[300px] bg-vote-title w-full px-4 py-3 text-center text-sm font-semibold text-red-500">
        {voteData.title}
      </div>
      <div className="flex items-center">
        {votingConditionText && <div className="w-20 text-center text-sm text-gray-500">{votingConditionText}</div>}
      </div>
    </section>
  );
};
