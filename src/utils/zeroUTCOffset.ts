// When you create a date with new Date(str) it creates a date object with a time zone. toISOString() makes it zero UTC offset, as denoted by the suffix "Z".
export const zeroUTCOffset = (SD: Date) => {
  const date = new Date(SD);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
};
