export const notificationQueryKey = {
  all: ['notifications'] as const,
  lists: () => [...notificationQueryKey.all, 'lists'] as const,
  general: () => [...notificationQueryKey.lists(), 'general'] as const,
  ceremony: () => [...notificationQueryKey.lists(), 'ceremony'] as const,
};