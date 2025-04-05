export const lockerQueryKey = {
  all: ['locker'] as const,
  locations: () => [...lockerQueryKey.all, 'locations'] as const,
  list: (locationId: string) => [...lockerQueryKey.all, 'list', locationId] as const,
};
