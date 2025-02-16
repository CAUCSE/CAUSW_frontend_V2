export const boardQueryKey = {
  all: ["board"] as const,
  name: (boardId: string) => [...boardQueryKey.all, "name", boardId] as const,
};
