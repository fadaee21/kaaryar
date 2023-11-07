import { SelectChangeEvent } from "@mui/material";
import { BeforeWeekType } from "../../model";

export interface ExamStudent {
  student: BeforeWeekType | undefined;
  handleChange: (
    e:
      | SelectChangeEvent<string | boolean>
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  setCompFamCheckBox: React.Dispatch<React.SetStateAction<string[]>>;
  setNoneJobActivationCheckBox: React.Dispatch<React.SetStateAction<string[]>>;
}
interface ObjEnum {
  [key: number]: string;
}

enum Level {
  None = 1,
  Beginner,
  Intermediate,
  Advanced,
  Teacher,
}

export function getMath(mathCode: number | undefined): string {
  const MathLevels: ObjEnum = {
    [Level.None]: "اصلا آشنایی ندارم",
    [Level.Beginner]: "کمی آشنایی دارم",
    [Level.Intermediate]: "تا اندازه‌ای بلد هستم",
    [Level.Advanced]: "به خوبی بلد هستم",
    [Level.Teacher]: "میتوانم آموزش دهم",
  };
  return mathCode !== undefined ? MathLevels[mathCode] : "";
}

export function getEng(engCode: number | undefined): string {
  const EnglishLevels: ObjEnum = {
    [Level.None]: "1 (در حد دبیرستان)",
    [Level.Beginner]: "2",
    [Level.Intermediate]: "3",
    [Level.Advanced]: "4",
    [Level.Teacher]: "5 (در حد آیلتس یا تافل)",
  };
  return engCode !== undefined ? EnglishLevels[engCode] : "";
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
  { value: "دبیرستان/پیش‌دانشگاهی", label: "دبیرستان / پیش‌دانشگاهی" },
  {
    value: "هنرستان",
    label: "هنرستان (فنی حرفه ای/کاردانش)",
  },
  { value: "دانشگاه آزاد", label: "دانشگاه آزاد" },
  { value: "دانشگاه دولتی", label: "دانشگاه دولتی" },
  {
    value: "فنی",
    label: "موسسه آموزش عالی فنی حرفه ای",
  },
  {
    value: "پیام‌نور",
    label: "دانشگاه پیام‌نور یا غیرانتفاعی یا پردیس",
  },
  {
    value: "تحصیل نمیکنم",
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
    value: "کمتر از دومیلیون تومان",
    label: "کمتر از دو میلیون تومان",
  },
  {
    value: "بین۲تا۵ میلیون تومان",
    label: "بین دو تا پنج میلیون تومان",
  },
  {
    value: "بیشتراز5میلیون تومان",
    label: "بیشتر از پنج میلیون تومان",
  },
];

export const accessTimeOpt = [
  {
    value: "کمتراز۲ساعت",
    label: "کمتر از دو ساعت",
  },
  {
    value: "بین۱تا۳ساعت",
    label: "بین یک تا سه ساعت",
  },
  {
    value: "بین۳تا۵ساعت",
    label: "بین سه تا پنج ساعت",
  },
  {
    value: "بین۵تا۷ساعت",
    label: "بین پنج تا هفت ساعت",
  },
  {
    value: "بیشتراز۷ساعت",
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
    value: "در مکان عمومی",
    label: "دسترسی در مکان عمومی (کافی نت/سایت دانشگاه)",
  },
  {
    value: "دسترسی اشتراکی",
    label: "دسترسی اشتراکی (با اعضای خانواده/دوستان)",
  },
  {
    value: "کامپیوتر شخصی",
    label: "کامپیوتر شخصی (تمام وقت)",
  },
  {
    value: "دسترسی ندارم",
    label: "دسترسی ندارم",
  },
];

export const limitTimeOpt = [
  {
    value: "محدودیت دارم",
    label: "بله محدودیت دارم",
  },
  {
    value: "محدودیت ندارم",
    label: "خیر محدودیت ندارم",
  },
  {
    value: "محدودیت دارم ولی میتوانم آنرا کنترل کنم",
    label: "بله محدودیت دارم ولی می توانم آن را مدیریت کنم",
  },
];

export const motivationOpt = [
  {
    value: "آمادگی برای ورود به کار",
    label: "کسب آمادگی برای ورود به بازار کار",
  },
  {
    value: "ارتقا شغلی",
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
  "هر کامپیوتر یا لپتاپ جدیدی را می توانم روشن کنم و با آن شروع به کار کنم.",
  "می توانم در ویندوز، پوشه (Folder) جدید ایجاد کنم و فایل های خودم را در آن کپی (Copy-Paste) کنم.",
  "می توانم اطلاعات را با استفاده از فلش (USB Flash Disk) از یک کامپیوتر به کامپیوتر دیگر انتقال دهم.",
  "می توانم از نرم افزار Word برای تایپ نامه، از Powerpoint برای تهیه ارائه ها و از Excel برای حسابداری شخصی استفاده کنم",
  "از برنامه های Skype، Zoom یا Google Meet برای تماس های تصویری استفاده  می کنم.",
  "می توانم حین یک تماس تصویری، صفحه نمایش کامپیوترم را به طور زنده با دیگران به اشتراک بگذارم.",
  "همه موارد",
];
export const noneJobActivationOpt = [
  "آموزش غیر آکادمیک ( مانند کلاس ورزش حرفه ای و کلاس زبان و غیره)",
  "خانه‌ دار",
  "جویای کار",
  "دانش‌آموز/ دانشجو",
  "همه موارد",
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
    value: "هردو",
    label: "با موبایل و کامپیوتر هردو",
  },
  {
    value: "دسترسی ندارم",
    label: "دسترسی ندارم",
  },
];
export const internetAccessTimingOpt = [
  {
    value: "تا2ساعت",
    label: "تا ۲ ساعت",
  },
  {
    value: "تا6ساعت",
    label: "تا ۶ ساعت",
  },
  {
    value: "تمام وقت",
    label: "تمام وقت",
  },
  {
    value: "دسترسی ندارم",
    label: "دسترسی ندارم",
  },
];

export const cgpaOpt = [
  {
    value: "18تا20",
    label: "۱۸ تا ۲۰",
  },
  {
    value: "15تا17",
    label: "۱۵ تا ۱۷",
  },
  {
    value: "12تا15",
    label: "۱۲ تا ۱۵",
  },
  {
    value: "زیر12",
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

export const employmentTypeOpt = [
  {
    value: "رسمی",
    label: "استخدام رسمی",
  },
  {
    value: "غیره",
    label: "غیره",
  },
];

export const employmentTimeCommitmentOpt = [
  {
    value: "1تا3",
    label: "۱ تا ۳ ساعت",
  },
  {
    value: "3تا5",
    label: "۳ تا ۵ ساعت",
  },
  {
    value: "5تا7",
    label: "۵ تا ۷ ساعت",
  },
  {
    value: "7تا9",
    label: "۷ تا ۹ ساعت",
  },
  {
    value: "بیشتراز۹ساعت",
    label: "بیشتر از ۹ ساعت",
  },
];
