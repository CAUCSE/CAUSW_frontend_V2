export const reportQueryKey = {
  all: ['report'] as const,
  list: (type: 'post' | 'comment') => [...reportQueryKey.all, 'list', type] as const,
};
