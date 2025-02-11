export const lockerQueryKey = {
  all: ["locker"] as const,
  list: () => [...lockerQueryKey.all, "list"] as const,
};
