export const addComma = (str: string | undefined) => {
  let arr = str?.split("  ");
  if (arr?.length === 1) return str;
  return arr?.join("، ").slice(0, -2) as string;
};
