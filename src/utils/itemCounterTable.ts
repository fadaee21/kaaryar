export const itemCounterTable = (page: number, pageSize: number, i: number) =>
  (page - 1) * pageSize + i + 1;
