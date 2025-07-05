import { CommentActionDropdown, CommentInfoSection } from '@/fsd_entities/comment';

interface CommentCardHeaderProps {
  comment: Pick<
    Comment.CommentDto,
    | 'id'
    | 'writerProfileImage'
    | 'writerNickname'
    | 'isAnonymous'
    | 'createdAt'
    | 'isOwner'
    | 'isCommentSubscribed'
    | 'isDeleted'
  >;
}

export const CommentCardHeader = ({ comment }: CommentCardHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <CommentInfoSection
        writerProfileImage={comment.writerProfileImage}
        writerNickname={comment.writerNickname}
        isAnonymous={comment.isAnonymous}
        createdAt={comment.createdAt}
      />
      {!comment.isDeleted && (
        <CommentActionDropdown
          commentId={comment.id}
          isOwner={comment.isOwner}
          isCommentSubscribed={comment.isCommentSubscribed}
        />
      )}
    </header>
  );
};
