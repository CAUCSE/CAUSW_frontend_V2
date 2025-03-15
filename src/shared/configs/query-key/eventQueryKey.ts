export const eventQueryKey = {
  all: ["event"] as const,
  list: () => [...eventQueryKey.all, "list"] as const,
};
