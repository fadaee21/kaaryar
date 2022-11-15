export const counterPagination = (total , perPage) => {
  if (total % perPage === 0) {
    const gg = total / perPage;
    return gg;
  } else {
    const tt = Math.floor(total / perPage) + 1;
    return tt;
  }
};
