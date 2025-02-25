export const postQueryKey = {
  all: ["post"] as const,
  list: (boardId: string) => [...postQueryKey.all, "list", boardId] as const,
  searchResult: (boardId: string, keyword: string) =>
    [...postQueryKey.all, "searchList", boardId, keyword] as const,
};
