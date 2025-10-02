export const homeQueryKey = {
  all: ['home'] as const,
  events: () => [...homeQueryKey.all, 'events'] as const,
  calendars: (year: number) => [...homeQueryKey.all, 'calendars', year] as const,
  homePosts: () => [...homeQueryKey.all, 'homePosts'] as const,
  graduateHomePosts: () => [...homeQueryKey.all, 'graduateHomePosts'] as const,
};
