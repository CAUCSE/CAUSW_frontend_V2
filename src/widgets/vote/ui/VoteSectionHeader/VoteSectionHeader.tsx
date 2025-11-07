import { VoteActionDropdown } from '@/entities/vote';

interface VoteSectionHeaderProps {
  voteData: Pick<Vote.VoteResponseDto, 'isOwner' | 'voteId' | 'isEnd'>;
}

export const VoteSectionHeader = ({ voteData }: VoteSectionHeaderProps) => {
  return (
    <header className="flex h-fit justify-end">
      {voteData.isOwner && (
        <VoteActionDropdown voteId={voteData.voteId} isEnd={voteData.isEnd} />
      )}
    </header>
  );
};
