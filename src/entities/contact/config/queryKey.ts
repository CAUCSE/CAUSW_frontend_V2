export const contactQueryKey = {
  all: ['contacts'] as const,
  lists: () => [...contactQueryKey.all, 'list'] as const,
  list: (filters: Contact.ContactFilters) =>
    [...contactQueryKey.lists(), filters] as const,
  details: () => [...contactQueryKey.all, 'detail'] as const,
  detail: (id: string) => [...contactQueryKey.details(), id] as const,
  me: () => [...contactQueryKey.all, 'me'] as const,
};
