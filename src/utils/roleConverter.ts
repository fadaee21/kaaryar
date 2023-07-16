export const roleConverter = (role: string | undefined): string => {
    if (!role) {
      return "";
    }
    const changer = {
      ta: "مربی حل تمرین",
      mentor: "منتور",
    } as { [key: string]: string };
    return changer[role] || "";
  };