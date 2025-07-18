import { ChildCommentActionDropdown, CommentInfoSection } from '@/fsd_entities/comment';

interface ChildCommentCardHeaderProps {
  childComment: Pick<
    ChildComment.ChildCommentDto,
    'writerProfileImage' | 'writerNickname' | 'createdAt' | 'isAnonymous' | 'id' | 'isOwner' | 'isDeleted'
  >;
}

export const ChildCommentCardHeader = ({ childComment }: ChildCommentCardHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <CommentInfoSection
        writerProfileImage={childComment.writerProfileImage}
        writerNickname={childComment.writerNickname}
        createdAt={childComment.createdAt}
        isAnonymous={childComment.isAnonymous}
      />
      {!childComment.isDeleted && (
        <ChildCommentActionDropdown commentId={childComment.id} isOwner={childComment.isOwner} />
      )}
    </header>
  );
};
