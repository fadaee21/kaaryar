const familiarity = (refer: any, fam: any) => {
  if (refer === "موسسات نیکوکاری" || fam === "موسسات نیکوکاری") return fam;
  return "-";
};
export default familiarity;
