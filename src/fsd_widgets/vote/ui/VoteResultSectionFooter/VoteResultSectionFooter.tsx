import { VoteResultButton } from '@/fsd_entities/vote';

interface VoteResultSectionFooterProps {
  voteId: string;
}

export const VoteResultSectionFooter = ({ voteId }: VoteResultSectionFooterProps) => {
  return (
    <footer className="flex h-fit justify-end">
      <VoteResultButton voteId={voteId} />
    </footer>
  );
};
