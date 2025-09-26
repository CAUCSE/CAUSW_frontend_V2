export const postQueryKey = {
  all: ['post'] as const,
  list: (boardId: string, keyword?: string) => [...postQueryKey.all, 'list', boardId, keyword] as const,
  searchResult: (boardId: string, keyword?: string) => [...postQueryKey.all, 'searchList', boardId, keyword] as const,
  detail: ({ postId }: { postId: Post.PostDto['id'] }) => [...postQueryKey.all, 'detail', postId] as const,
};
