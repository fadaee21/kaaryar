export const counterPagination = (num) => {
  if (num % 10 === 0) {
    const gg = num / 10;
    return gg;
  } else {
    const tt = Math.floor(num / 10) + 1;
    return tt;
  }
};
