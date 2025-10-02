interface CommentContentSectionProps {
  content: Comment.CommentDto['content'];
  isDeleted: Comment.CommentDto['isDeleted'];
}

export const CommentContentSection = ({
  content,
  isDeleted,
}: CommentContentSectionProps) => {
  return (
    <section className="text-base">
      <p className="break-all">{isDeleted ? '삭제된 댓글입니다.' : content}</p>
    </section>
  );
};
