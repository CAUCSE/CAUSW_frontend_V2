import { CommentActionDropdown, CommentInfoSection } from '@/fsd_entities/comment';

interface CommentCardHeaderProps {
  comment: Pick<
    Comment.CommentDto,
    | 'id'
    | 'writerProfileImage'
    | 'displayWriterNickname'
    | 'writerNickname'
    | 'isAnonymous'
    | 'createdAt'
    | 'isOwner'
    | 'isCommentSubscribed'
    | 'isDeleted'
    | 'isBlocked'
  >;
}

export const CommentCardHeader = ({ comment }: CommentCardHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      {/* ✅ 차단된 경우: 프로필/닉네임 대신 차단 안내만 */}
      {comment.isBlocked ? (
        <span className="text-sm text-gray-400">차단된 사용자</span>
      ) : (
        <CommentInfoSection
          writerProfileImage={comment.writerProfileImage}
          writerNickname={
            comment.displayWriterNickname
              ? comment.displayWriterNickname
              : comment.isAnonymous
                ? '익명'
                : comment.writerNickname
          }
          isAnonymous={comment.isAnonymous}
          createdAt={comment.createdAt}
        />
      )}

      {/* ✅ 삭제/차단된 경우는 액션 드롭다운 숨김 */}
      {!comment.isDeleted && !comment.isBlocked && (
        <CommentActionDropdown
          commentId={comment.id}
          isOwner={comment.isOwner}
          isCommentSubscribed={comment.isCommentSubscribed}
        />
      )}
    </header>
  );
};
