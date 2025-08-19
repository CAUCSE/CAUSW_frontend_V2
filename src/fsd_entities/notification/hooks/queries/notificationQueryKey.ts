export const notificationQueryKey = {
  all: ['notifications'] as const,
  lists: () => [...notificationQueryKey.all, 'lists'] as const,
  general: () => [...notificationQueryKey.lists(), 'general'] as const,
  ceremony: () => [...notificationQueryKey.lists(), 'ceremony'] as const,
  count: () => [...notificationQueryKey.all, 'count'] as const,
  // top4 전용 쿼리키
  top4: {
    all: () => [...notificationQueryKey.all, 'top4'] as const,
    general: () => [...notificationQueryKey.top4.all(), 'general'] as const,
    ceremony: () => [...notificationQueryKey.top4.all(), 'ceremony'] as const,
  },
};