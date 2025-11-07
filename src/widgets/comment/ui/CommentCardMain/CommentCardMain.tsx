import { CommentContentSection } from '@/entities/comment';

interface CommentCardMainProps {
  content: Comment.CommentDto['content'];
  isDeleted: Comment.CommentDto['isDeleted'];
}

export const CommentCardMain = ({
  content,
  isDeleted,
}: CommentCardMainProps) => {
  return (
    <main>
      <CommentContentSection content={content} isDeleted={isDeleted} />
    </main>
  );
};
