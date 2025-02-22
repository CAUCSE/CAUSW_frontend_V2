export const formQueryKey = {
  all: ["form"] as const,
  detail: (formId: string) => [...formQueryKey.all, "detail", formId] as const,
  canReply: (formId: string) =>
    [...formQueryKey.all, "canReply", formId] as const,
};
