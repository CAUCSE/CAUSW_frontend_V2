import {
  ChildCommentActionDropdown,
  CommentInfoSection,
} from '@/entities/comment';

interface ChildCommentCardHeaderProps {
  childComment: Pick<
    ChildComment.ChildCommentDto,
    | 'writerProfileImage'
    | 'writerNickname'
    | 'displayWriterNickname'
    | 'createdAt'
    | 'isAnonymous'
    | 'id'
    | 'isOwner'
    | 'isDeleted'
    | 'isBlocked'
  >;
}

export const ChildCommentCardHeader = ({
  childComment,
}: ChildCommentCardHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      {/* ✅ 차단된 경우 프로필/닉네임 숨기고 안내 문구만 */}
      {childComment.isBlocked ? (
        <span className="text-sm text-gray-400">차단된 사용자</span>
      ) : (
        <CommentInfoSection
          writerProfileImage={childComment.writerProfileImage}
          writerNickname={
            childComment.displayWriterNickname
              ? childComment.displayWriterNickname
              : childComment.isAnonymous
                ? '익명'
                : childComment.writerNickname
          }
          createdAt={childComment.createdAt}
          isAnonymous={childComment.isAnonymous}
        />
      )}

      {/* ✅ 삭제되었거나 차단된 경우는 액션 버튼 숨김 */}
      {!childComment.isDeleted && !childComment.isBlocked && (
        <ChildCommentActionDropdown
          commentId={childComment.id}
          isOwner={childComment.isOwner}
        />
      )}
    </header>
  );
};
