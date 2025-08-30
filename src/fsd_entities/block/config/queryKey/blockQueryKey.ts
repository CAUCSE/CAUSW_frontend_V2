export const blockQueryKey = {
  root: ['block'] as const,
  byPost: (postId: string) => [...blockQueryKey.root, 'by-post', postId] as const,
  byComment: (commentId: string) => [...blockQueryKey.root, 'by-comment', commentId] as const,
  byChildComment: (childCommentId: string) => [...blockQueryKey.root, 'by-child-comment', childCommentId] as const,
};
