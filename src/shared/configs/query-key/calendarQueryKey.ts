export const calendarQueryKey = {
  all: ["calendar"] as const,
  year: (year: number) => [...calendarQueryKey.all, year] as const,
};
