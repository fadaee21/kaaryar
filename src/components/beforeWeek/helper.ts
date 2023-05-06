import { SelectChangeEvent } from "@mui/material";
import { BeforeWeekType } from "../../model";

export interface ExamStudent {
  student: BeforeWeekType | null;
  handleChange: (
    e:
      | SelectChangeEvent<string | boolean>
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}
export interface PropEditString {
  placeholder: string;
  identifier: string;
  value: string;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}
export interface PropEditBool {
  placeholder: string;
  identifier: string;
  value: any;
  handleChange: (e: SelectChangeEvent<string | boolean>) => void;
}
export interface PropEditCombo {
  placeholder: string;
  identifier: string;
  value: any;
  options: {
    value: any;
    label: string;
  }[];
  handleChange: (e: SelectChangeEvent<string>) => void;
}

enum Level {
  None = 1,
  Beginner,
  Intermediate,
  Advanced,
  Teacher,
}

export function getMath(mathCode: number | undefined): string | undefined {
  switch (mathCode) {
    case Level.None:
      return "اصلا آشنایی ندارم";
    case Level.Beginner:
      return "کمی آشنایی دارم";
    case Level.Intermediate:
      return "تا اندازه‌ای بلد هستم";
    case Level.Advanced:
      return "به خوبی بلد هستم";
    case Level.Teacher:
      return "میتوانم آموزش دهم";
    default:
      return undefined;
  }
}

export function getEng(engCode: number | undefined): string | undefined {
  switch (engCode) {
    case Level.None:
      return "1 (در حد دبیرستان)";
    case Level.Beginner:
      return "2";
    case Level.Intermediate:
      return "3";
    case Level.Advanced:
      return "4";
    case Level.Teacher:
      return "5 (در حد آیلتس یا تافل)";
    default:
      return undefined;
  }
}

export const instituteTypeOpt = [
  { value: "دبیرستان / پیش‌دانشگاهی", label: "دبیرستان / پیش‌دانشگاهی" },
  {
    value: "هنرستان (فنی حرفه‌ای/کاردانش)",
    label: "هنرستان (فنی حرفه‌ای/کاردانش)",
  },
  { value: "دانشگاه آزاد", label: "دانشگاه آزاد" },
  { value: "دانشگاه دولتی", label: "دانشگاه دولتی" },
  {
    value: "موسسه آموزش عالی فنی حرفه ای",
    label: "موسسه آموزش عالی فنی حرفه ای",
  },
  {
    value: "دانشگاه پیام‌نور یا غیرانتفاعی یا پردیس",
    label: "دانشگاه پیام‌نور یا غیرانتفاعی یا پردیس",
  },
];
export const instituteTypeCurrentOpt = [
  { value: "دبیرستان / پیش‌دانشگاهی", label: "دبیرستان / پیش‌دانشگاهی" },
  {
    value: "هنرستان (فنی حرفه ای/کاردانش)",
    label: "هنرستان (فنی حرفه ای/کاردانش)",
  },
  { value: "دانشگاه آزاد", label: "دانشگاه آزاد" },
  { value: "دانشگاه دولتی", label: "دانشگاه دولتی" },
  {
    value: "موسسه آموزش عالی فنی حرفه ای",
    label: "موسسه آموزش عالی فنی حرفه ای",
  },
  {
    value: "دانشگاه پیام‌نور یا غیرانتفاعی یا پردیس",
    label: "دانشگاه پیام‌نور یا غیرانتفاعی یا پردیس",
  },
  {
    value: "در حال حاضر مشغول به تحصیل نیستم",
    label: "در حال حاضر مشغول به تحصیل نیستم",
  },
];

export const jobStatusOpt = [
  {
    value: true,
    label: "مشغول کار منجر به درآمد هستم",
  },
  {
    value: false,
    label: "مشغول کار منجر به درآمد نیستم",
  },
];

export const avgSalaryOpt = [
  {
    value: "کمتر از دو میلیون تومان",
    label: "کمتر از دو میلیون تومان",
  },
  {
    value: "بین دو تا پنج میلیون تومان",
    label: "بین دو تا پنج میلیون تومان",
  },
  {
    value: "بیشتر از پنج میلیون تومان",
    label: "بیشتر از پنج میلیون تومان",
  },
];

export const accessTimeOpt = [
  {
    value: "-2",
    label: "کمتر از دو ساعت",
  },
  {
    value: "1-3",
    label: "بین یک تا سه ساعت",
  },
  {
    value: "3-5",
    label: "بین سه تا پنج ساعت",
  },
  {
    value: "5-7",
    label: "بین پنج تا هفت ساعت",
  },
  {
    value: "+7",
    label: "بیشتر از هفت ساعت",
  },
];

export const freeDailyTimeOpt = [
  { value: "کمتراز۲ساعت", label: "کمتر از دو ساعت" },
  { value: "بین۱تا۳ساعت", label: "بین یک تا سه ساعت" },
  { value: "بین۳تا۵ساعت", label: "بین سه تا پنج ساعت" },
  { value: "بین۵تا۷ساعت", label: "بین پنج تا هفت ساعت" },
  { value: "بیشتراز۷ساعت", label: "بیشتر از هفت ساعت" },
];
export const computerAccessOpt = [
  {
    value: "دسترسی در مکان عمومی (کافی نت/سایت دانشگاه)",
    label: "دسترسی در مکان عمومی (کافی نت/سایت دانشگاه)",
  },
  {
    value: "دسترسی اشتراکی (با اعضای خانواده/دوستان)",
    label: "دسترسی اشتراکی (با اعضای خانواده/دوستان)",
  },
  {
    value: "کامپیوتر شخصی (تمام وقت)",
    label: "کامپیوتر شخصی (تمام وقت)",
  },
  {
    value: "دسترسی ندارم",
    label: "دسترسی ندارم",
  },
];

export const limitTimeOpt = [
  {
    value: "بله محدودیت دارم",
    label: "بله محدودیت دارم",
  },
  {
    value: "خیر محدودیت ندارم",
    label: "خیر محدودیت ندارم",
  },
  {
    value: "بله محدودیت دارم ولی می توانم آن را مدیریت کنم",
    label: "بله محدودیت دارم ولی می توانم آن را مدیریت کنم",
  },
];

export const motivationOpt = [
  {
    value: "کسب آمادگی برای ورود به بازار کار",
    label: "کسب آمادگی برای ورود به بازار کار",
  },
  {
    value: "ارتقاء شغلی",
    label: "ارتقاء شغلی",
  },
  {
    value: "افزایش دانش",
    label: "افزایش دانش",
  },
  {
    value: "سایر",
    label: "سایر",
  },
];

export const computerFamiliarityOpt = [
  {
    value: "turn-on-off",
    label:
      "هر کامپیوتر یا لپتاپ جدیدی را می توانم روشن کنم و با آن شروع به کار کنم.",
  },
  {
    value: "copy-paste",
    label:
      "می توانم در ویندوز، پوشه (Folder) جدید ایجاد کنم و فایل های خودم را در آن کپی (Copy-Paste) کنم.",
  },
  {
    value: "usb",
    label:
      "می توانم اطلاعات را با استفاده از فلش (USB Flash Disk) از یک کامپیوتر به کامپیوتر دیگر انتقال دهم.",
  },
  {
    value: "office",
    label:
      "می توانم از نرم افزار Word برای تایپ نامه، از Powerpoint برای تهیه ارائه ها و از Excel برای حسابداری شخصی استفاده کنم",
  },
  {
    value: "google",
    label:
      "از برنامه های Skype، Zoom یا Google Meet برای تماس های تصویری استفاده  می کنم.",
  },
  {
    value: "screen-share",
    label:
      "می توانم حین یک تماس تصویری، صفحه نمایش کامپیوترم را به طور زنده با دیگران به اشتراک بگذارم.",
  },
  {
    value: "all-of-them",
    label: "همه موارد",
  },
];

export const questionCityOpt = [
  {
    value: "الف",
    label: "به منطقه الف برود",
  },
  {
    value: "ب",
    label: "به منطقه ب بروند",
  },
  {
    value: "ج",
    label: "به منطقه ج برود",
  },
  {
    value: "آتش سوزی نیست",
    label: "در هیچ منطقه آتش سوزی رخ نداده است.",
  },
];
export const questionNumbersOpt = [
  {
    value: "110",
    label: "۱۱۰",
  },
  {
    value: "115",
    label: "۱۱۵",
  },
  {
    value: "118",
    label: "۱۱۸",
  },
  {
    value: "120",
    label: "۱۲۰",
  },
];
export const questionMultiplicationOpt = [
  {
    value: "9",
    label: "۹",
  },
  {
    value: "10",
    label: "۱۰",
  },
  {
    value: "11",
    label: "۱۱",
  },
  {
    value: "12",
    label: "۱۲",
  },
];
export const questionStudentsOpt = [
  {
    value: "90",
    label: "۹۰%",
  },
  {
    value: "80",
    label: "۸۰%",
  },
  {
    value: "75",
    label: "۷۵%",
  },
  {
    value: "60",
    label: "۶۰%",
  },
];
export const questionDiametersOpt = [
  {
    value: "7",
    label: "هفت قطر",
  },
  {
    value: "12",
    label: "دوزاده قطر",
  },
  {
    value: "14",
    label: "چهارده قطر",
  },
  {
    value: "28",
    label: "بیست و هشت قطر",
  },
];
export const questionWordsOpt = [
  {
    value: "E",
    label: "E",
  },
  {
    value: "F",
    label: "F",
  },
  {
    value: "H",
    label: "H",
  },
  {
    value: "N",
    label: "N",
  },
];

export const internetAccessOpt = [
  {
    value: "با موبایل",
    label: "با موبایل",
  },
  {
    value: "با کامپیوتر",
    label: "با کامپیوتر",
  },
  {
    value: "با موبایل و کامپیوتر هردو",
    label: "با موبایل و کامپیوتر هردو",
  },
  {
    value: "دسترسی ندارم",
    label: "دسترسی ندارم",
  },
];

export const cgpaOpt = [
  {
    value: "۱۸ تا ۲۰",
    label: "۱۸ تا ۲۰",
  },
  {
    value: "۱۵ تا ۱۷",
    label: "۱۵ تا ۱۷",
  },
  {
    value: "۱۲ تا ۱۵",
    label: "۱۲ تا ۱۵",
  },
  {
    value: "زیر ۱۲",
    label: "زیر ۱۲",
  },
];
export const questionEnglishFamiliarityOpt = [
  {
    value: 1,
    label: "1 (در حد دبیرستان)",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5 (در حد آیلتس یا تافل)",
  },
];
export const mathOpt = [
  {
    value: 1,
    label: "اصلا آشنایی ندارم",
  },
  {
    value: 2,
    label: "کمی آشنایی دارم",
  },
  {
    value: 3,
    label: "تا اندازه‌ای بلد هستم",
  },
  {
    value: 4,
    label: "به خوبی بلد هستم",
  },
  {
    value: 5,
    label: "میتوانم آموزش دهم",
  },
];
