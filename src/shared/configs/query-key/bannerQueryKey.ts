export const bannerQueryKey = {
  all: ["banner"] as const,
  list: () => [...bannerQueryKey.all, "list"] as const,
};
