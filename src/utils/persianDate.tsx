export const persianDate = (date: string | undefined) => {
  if (!!date) {
    return new Intl.DateTimeFormat("fa-IR").format(new Date(date));
  }
  return "-";
};
