export const commentQueryKey = {
  all: ['comment'] as const,
  list: ({ postId }: { postId: Post.PostDto['id'] }) => [...commentQueryKey.all, 'list', postId] as const,
};
