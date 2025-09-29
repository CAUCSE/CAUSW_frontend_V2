export const userQueryKey = {
  all: ['user'] as const,
  detail: (id: string) => [...userQueryKey.all, id] as const,
};
