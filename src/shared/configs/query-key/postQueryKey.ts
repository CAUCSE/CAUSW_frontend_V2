export const postQueryKey = {
  all: ["post"] as const,
  list: (boardId: string) => [...postQueryKey.all, "list", boardId] as const,
};
