export const LOCKER_CONSTANT = () => {
  const floor = {
    SECOND: "2층",
    THIRD: "3층",
    FOURTH: "4층",
  } as const;

  return { floor };
};
