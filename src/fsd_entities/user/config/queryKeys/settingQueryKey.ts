export const settingQueryKey = {
  all: ['setting'] as const,
  myPost: () => [...settingQueryKey.all, 'myPost'] as const,
  myCommentPost: () => [...settingQueryKey.all, 'myCommentPost'] as const,
  myFavoritePost: () => [...settingQueryKey.all, 'myFavoritePost'] as const,
};
