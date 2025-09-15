export const contactQueryKey = {
  all: ['contacts'] as const,
  lists: () => [...contactQueryKey.all, 'list'] as const,
  list: (keyword?: string) => [...contactQueryKey.lists(), { keyword: keyword || '' }] as const,
  details: () => [...contactQueryKey.all, 'detail'] as const,
  detail: (id: string) => [...contactQueryKey.details(), id] as const,
  me: () => [...contactQueryKey.all, 'me'] as const,
};
