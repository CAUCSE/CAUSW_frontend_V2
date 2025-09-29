export type PostCommentRequestDto = {
  content: string;
  isAnonymous: boolean;
  postId: Post.PostDto['id'];
};
