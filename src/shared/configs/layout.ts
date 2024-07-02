export const breakpoint = { sm: 576, md: 768, lg: 992, xl: 1200 };

export const media = Object.fromEntries(
  Object.entries(breakpoint).map(([key, value]) => [
    key,
    `@media (max-width: ${value}px)`,
  ])
) as { sm: string; md: string; lg: string; xl: string };
