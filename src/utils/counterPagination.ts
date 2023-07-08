export const counterPagination = (total: any, perPage: number): number => {
  if (!total) {
    return 0;
  }
  return Math.floor(total / perPage) + (total % perPage === 0 ? 0 : 1);
};
