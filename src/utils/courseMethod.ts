import { Instructor } from "../model";
type Module = [
  "core" | "general",
  (
    | "unassigned"
    | "workshop"
    | "english_module"
    | "vocational_skills"
    | "interpersonal_skills"
  )
];
//instructors is array but i need to convert it to string and send to child components
export const convertArrToStr = (arr: Array<Instructor>): string => {
  return arr
    .map(({ firstName, family }) => firstName + " " + family)
    .join("، ");
};
// this func help to extract of type and subType from string like "moduleType=general&moduleSubType=interpersonal_skills"
export const getTypeAndSubtype = (val: string) => {
  const keyValuePairs = val.split("&");
  const result = [];
  for (const pair of keyValuePairs) {
    const [key, value] = pair.split("=");
    if (key === "moduleType" || key === "moduleSubType") {
      result.push(value);
    }
  }
  return result as Module;
};
//this func help to extract name and id of course from string like "68 + کارگاه آشنایی با گیت (Git) "
export const getNameAndId = (value: string): string[] => {
  const tt = value ? value.split("+") : [""];
  return tt;
};

export const getTitle = (val: string | undefined): string => {
  if (!val) {
    return "";
  }
  const changer = {
    workshop: "کارگاه جانبی",
    english_module: "زبان انگلیسی",
    interpersonal_skills: "مهارت‌های ارتباطی",
    vocational_skills: "مهارت‌های حرفه‌ای",
  } as { [key: string]: string };
  return changer[val] || "";
};
