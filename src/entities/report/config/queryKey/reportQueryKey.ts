export const reportQueryKey = {
  all: ['report'] as const,

  // 게시글/댓글 리스트
  list: (type: 'post' | 'comment', pageNum: number) =>
    [...reportQueryKey.all, 'list', type, pageNum] as const,

  // 신고된 유저 목록
  users: (pageNum: number) =>
    [...reportQueryKey.all, 'users', pageNum] as const,

  // 특정 유저의 신고 게시글
  userPosts: (userId: string, pageNum: number) =>
    [...reportQueryKey.all, 'users', userId, 'posts', pageNum] as const,

  // 특정 유저의 신고 댓글
  userComments: (userId: string, pageNum: number) =>
    [...reportQueryKey.all, 'users', userId, 'comments', pageNum] as const,
};
