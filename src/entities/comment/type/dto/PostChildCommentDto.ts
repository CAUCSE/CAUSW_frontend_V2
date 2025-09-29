export type PostChildCommentRequestDto = {
  content: string;
  isAnonymous: boolean;
  parentCommentId: Comment.CommentDto['id'];
};
