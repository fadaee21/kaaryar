import { RowHeaderStudent } from "../../model";

export const registerTableHeader = [
  "",
  "",
  "وضعیت",
  "نام و نام خانوادگی",
  "گروه",
  "میزان تحصیلات",
  "سال دبیرستان",
  "استان",
  "شهر",
  "نحوه آشنایی با کاریار",
  "نام معرف یا موسسه",
  "رشته انتخابی",
  "تاریخ ارسال فرم",
  "تاریخ تأیید/رد ",
];

export const beforeTableHeader = [
  "",
  "",
  "وضعیت",
  "نام و نام خانوادگی",
  "گروه",
  "استان",
  "شهر",
  "شماره همراه",
  "ایمیل",
  "نمره آزمون",
  "آمادگی کار",
  "انگیزه ورود",
  "تاریخ ارسال فرم",
  "تاریخ تأیید/رد ",
];

export const afterTableHeader = [
  "",
  "",
  "وضعیت",
  "نام و نام خانوادگی",
  "گروه",
  "استان",
  "شهر",
  "شماره همراه",
  "ایمیل",
  "نتیجه نهایی",
  "بورسیه",
  "رشته نهایی",
  "تاریخ تأیید/رد ",
];
export const afterTableSkillSeeker = [
  "",
  "",
  "وضعیت",
  "نام و نام خانوادگی",
  "گروه",
  "استان",
  "شهر",
  "شماره همراه",
  "ایمیل",
  "رشته انتخابی",
  "رشته نهایی",
  "نتیجه نهایی",
];

export const assigneeStudentTableHeader = [
  "",
  "",
  "",
  "نام و نام خانوادگی",
  "نام کاربری",
  "گروه",
  "استان",
  "شهر",
  "معرف",
  "مسیر آموزشی",
  " دوره کنونی",
  "مربی حل تمرین",
  "منتور",
  "وضعیت آموزش",
  "قدم آتی آموزش",
  "ارجاع به واحد مالی",
  "ارزیابی کاریار",
  // "عملیات",
];

export const adminStudentTableHeader: RowHeaderStudent[] = [
  { id: 1, label: "", minWidth: 20, align: "center" },
  { id: 2, label: "", minWidth: 20, align: "center" },
  { id: 3, label: "نام و نام خانوادگی", minWidth: 200, align: "center" },
  { id: 4, label: "نام کاربری", minWidth: 100, align: "center" },
  { id: 5, label: "گروه", minWidth: 100, align: "center" },
  { id: 6, label: "استان", minWidth: 100, align: "center" },
  { id: 7, label: "شهر", minWidth: 100, align: "center" },
  { id: 8, label: "معرف", minWidth: 100, align: "center" },
  { id: 9, label: "مسیر آموزشی", minWidth: 120, align: "center" },
  { id: 10, label: " دوره کنونی", minWidth: 100, align: "center" },
  { id: 11, label: "مربی حل تمرین", minWidth: 120, align: "center" },
  { id: 12, label: "منتور", minWidth: 100, align: "center" },
  { id: 13, label: "وضعیت آموزش", minWidth: 200, align: "center" },
  { id: 14, label: "قدم آتی آموزش", minWidth: 200, align: "center" },
  { id: 15, label: "ارجاع به واحد مالی", minWidth: 200, align: "center" },
  { id: 16, label: "ارزیابی کاریار", minWidth: 200, align: "center" },
  { id: 17, label: "عملیات", minWidth: 530, align: "left" },
];
export const CoreModuleCourseStudentsCompHeaders: RowHeaderStudent[] = [
  { id: 1, label: "", minWidth: 20, align: "center" },
  { id: 2, label: "", minWidth: 20, align: "center" },
  { id: 3, label: "نام و نام خانوادگی", minWidth: 200, align: "center" },
  { id: 4, label: "نام کاربری", minWidth: 100, align: "center" },
  { id: 5, label: "گروه", minWidth: 100, align: "center" },
  { id: 6, label: "استان", minWidth: 100, align: "center" },
  { id: 7, label: "شهر", minWidth: 100, align: "center" },
  { id: 8, label: "معرف", minWidth: 100, align: "center" },
  { id: 9, label: "مسیر آموزشی", minWidth: 120, align: "center" },
  { id: 11, label: "حل تمرین این دوره", minWidth: 120, align: "center" },
  { id: 12, label: "منتور این دوره", minWidth: 100, align: "center" },
  // { id: 13, label: "وضعیت آموزش", minWidth: 200, align: "center" },
  // { id: 14, label: "قدم آتی آموزش", minWidth: 200, align: "center" },
  // { id: 15, label: "ارجاع به واحد مالی", minWidth: 200, align: "center" },
  // { id: 16, label: "ارزیابی کاریار", minWidth: 200, align: "center" },
];
export const CoreModuleCourseMentorTaCompHeaders: RowHeaderStudent[] = [
  { id: 1, label: "", minWidth: 20, align: "center" },
  { id: 2, label: "", minWidth: 20, align: "center" },
  { id: 3, label: "نام داوطلب", minWidth: 200, align: "center" },
  { id: 4, label: "نقش", minWidth: 100, align: "center" },
  { id: 5, label: "وضعیت", minWidth: 100, align: "center" },
];

export const volunteerTableHeader = ["", "", "نام داوطلب", "نقش", "وضعیت"];
export const moduleVolunteerTableHeader = [
  "",
  "نام دوره",
  "نقش",
  "مسیر مرتبط",
  "گروه مرتبط",
  "وضعیت دوره",
  "مدرس(ها)",
  "مهارت‌آموزان",
  "نظرات ",
];
export const volunteerStudentTableHeader = [
  "",
  "نام و نام خانوادگی",
  "گروه",
  "استان",
  "شهر",
  "معرف",
  "مسیر آموزشی",
  "دوره",
  "وضعیت دوره",
  "حل تمرین",
  "منتور",
  "نمره نهایی",
  "ارزیابی نهایی",
  "نظرات ",
];

export const graduateTableHeader = [
  "",
  "نام و نام خانوادگی",
  "کد مهارت آموز",
  "مسیر آموزشی",
  "وضعیت اشتغال در زمان فارغ التحصیلی",
  "وضعیت اشتغال پذیری",
  "موقعیت شغلی پیشنهادی",
  "نام کارفرما",
  "آخرین وضعیت",
  "تاریخ شروع به کار",
  "عملیات",
];

export const commentsTableHeader = [
  "تاریخ جلسه",
  "نام و نام خانوادگی",
  "نظر دهنده",
  "نقش نظر دهنده",
  "دوره آموزشی",
  "عملیات",
];

export const groupsTableHeader = [
  "شماره گروه",
  "نام گروه",
  "تاریخ شروع آموزش",
  "تاریخ پایان آموزش",
  "تعداد کل مهارت‌آموزان",
  "تعداد مربیان حل تمرین",
  "تعداد منتورها",
];

export const trainingCourseHeader = [
  "",
  "نام دوره آموزشی",
  "مسیر مرتبط",
  "گروه مرتبط",
  "وضعیت آموزش دوره",
  "نام مدرس",
  "تاریخ شروع",
  "تاریخ پایان",
  "تعداد مهارت‌آموزان",
  "تعداد مربیان حل تمرین",
  "تعداد منتورها",
  "لینک تعریف پروژه پایانی",
];
export const trainingCourseHeaderModule = [
  "",
  "نوع دوره",
  "نام دوره آموزشی",
  "مسیر مرتبط",
  // "گروه مرتبط",
  "وضعیت آموزش دوره",
  "نام مدرس",
  "تاریخ شروع",
  // "تاریخ پایان",
  "تعداد مهارت‌آموزان",
  "تعداد مربیان حل تمرین",
  "تعداد منتورها",
  // "لینک تعریف پروژه پایانی",
];

export const language = [
  "",
  "نام دوره",
  "وضعیت دوره",
  "گروه مرتبط",
  "نام مدرس(ها)",
  "تاریخ شروع",
  "تاریخ پایان",
  "تعداد مهارت‌آموزان",
];

export const workshops = [
  "",
  "نام دوره",
  "نام مدرس(ها)",
  "تاریخ برگزاری",
  "تعداد ثبت‌نام‌کنندگان",
];

export const vocational = [
  "",
  "نام دوره",
  "گروه مرتبط",
  "وضعیت دوره",
  "نام مدرس(ها)",
  "تاریخ شروع",
  "تاریخ پایان",
  "تعداد مهارت‌آموزان",
];

export const coreStudent = [
  "نام دوره آموزشی",
  "مسیر مرتبط",
  "گروه مرتبط",
  "وضعیت دوره",
  "نام مدرس",
  "تاریخ شروع",
  // "تاریخ پایان",
  "مربی حل تمرین",
  "منتور",
  "نمره نهایی",
  "ارزیابی نهایی",
];

export const workshopsStudent = [
  "نام دوره",
  "نام مدرس",
  "تاریخ برگزاری",
  "ارزیابی حضور در کارگاه",
  "ویرایش",
];
export const englishStudent = [
  "نام دوره",
  "وضعیت دوره",
  "نام مدرس",
  "تاریخ شروع",
  "وضعیت حضور و غیاب",
  "نام دوره آتی",
  "نمره پایانی",
  "ارزیابی نهایی",
  "ویرایش",
];
export const vocationalStudent = [
  "نام دوره",
  "گروه مرتبط",
  "وضعیت دوره",
  "نام مدرس",
  "تاریخ شروع",
  "وضعیت حضور و غیاب",
  "ویرایش",
];
export const interpersonalStudent = [
  "نام دوره",
  "گروه مرتبط",
  "وضعیت دوره",
  "نام مدرس",
  "تاریخ شروع",
  "تاریخ پایان",
  "وضعیت حضور و غیاب",
  "وضعیت انجام تکالیف",
  "ارزیابی نهایی",
  "ویرایش",
];

export const emailHeader = [
  "مرحله ارسال",
  "عنوان ایمیل",
  // "body",
  "وضعیت",
  // "templateId",
  "تاریخ ایجاد",
  "تاریخ ویرایش",
];
export const smsHeader = [
  "مرحله ارسال",
  // "body",
  "وضعیت",
  // "templateId",
  "تاریخ ایجاد",
  "تاریخ ویرایش",
];
