export const formatCount = (count: number) => {
  return count > 999 ? '999+' : `${count}`;
};
