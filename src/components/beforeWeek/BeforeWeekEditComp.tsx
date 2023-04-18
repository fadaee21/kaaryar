import React from "react";
import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  List,
  ListItem,
  MenuItem,
} from "@mui/material";
import Select from "@mui/material/Select";
import { BeforeWeekType } from "../../model";

interface ExamStudent {
  student: BeforeWeekType | null;
  handleChange: (e: any) => void;
}

const BeforeWeekEditComp: React.FC<ExamStudent> = ({
  student,
  handleChange,
}) => {
  return (
    <>
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <EditCombo
                placeholder="نوع موسسه آموزشی آخرین مقطع تحصیلی"
                identifier="instituteType"
                options={instituteTypeOpt}
                value={student?.instituteType}
                handleChange={handleChange}
              />
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="lastInstitute">
                  نام موسسه آموزشی آخرین مقطع تحصیلی
                </InputLabel>
                <Input
                  id="lastInstitute"
                  value={student?.lastInstitute || ""}
                  onChange={handleChange}
                  name="lastInstitute"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="eduLevel">
                  اگر دانشجو هستید در چه مقطعی هستید؟
                </InputLabel>
                <Input
                  id="eduLevel"
                  value={student?.eduLevel || ""}
                  onChange={handleChange}
                  name="eduLevel"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="stuSemester">
                  اگر دانشجو هستید در چه ترمی هستید؟
                </InputLabel>
                <Input
                  id="stuSemester"
                  value={student?.stuSemester || ""}
                  onChange={handleChange}
                  name="stuSemester"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="stuYear">
                  اگر دانش آموز هستید سال چندم هستید؟
                </InputLabel>
                <Input
                  id="stuYear"
                  value={student?.stuYear || ""}
                  onChange={handleChange}
                  name="stuYear"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <ListItem>
            {/* <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
              <InputLabel htmlFor="instituteCurrentType">
                نوع موسسه آموزشی که در حال حاضر درآن تحصیل می کنید
              </InputLabel>
              <Input
                id="instituteCurrentType"
                value={student?.instituteCurrentType || ""}
                onChange={handleChange}
                name="instituteCurrentType"
              />
            </FormControl> */}
            <EditCombo
              placeholder="نوع موسسه آموزشی که در حال حاضر درآن تحصیل می کنید"
              identifier="instituteCurrentType"
              options={instituteTypeCurrentOpt}
              value={student?.instituteCurrentType}
              handleChange={handleChange}
            />
          </ListItem>
          <ListItem>
            <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
              <InputLabel htmlFor="currentInstName">
                نام موسسه آموزشی تحصیلات حال حاضر
              </InputLabel>
              <Input
                id="currentInstName"
                value={student?.currentInstName || ""}
                onChange={handleChange}
                name="currentInstName"
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
              <InputLabel htmlFor="currentField">رشته تحصیلی فعلی</InputLabel>
              <Input
                id="currentField"
                value={student?.currentField || ""}
                onChange={handleChange}
                name="currentField"
              />
            </FormControl>
          </ListItem>
        </Grid>
      </Grid>
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <EditCombo
                placeholder="وضعیت فعلی اشتغال"
                identifier="jobStatus"
                options={jobStatusOpt}
                value={student?.jobStatus}
                handleChange={handleChange}
              />
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="jobType">نوع اشتغال</InputLabel>
                <Input
                  id="jobType"
                  value={student?.jobType || ""}
                  onChange={handleChange}
                  name="jobType"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="workTime">تعداد ساعت کاری</InputLabel>
                <Input
                  id="workTime"
                  value={student?.workTime || ""}
                  onChange={handleChange}
                  name="workTime"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="noneJobActivation">
                  مشغولیت فعلی در صورت عدم اشتغال
                </InputLabel>
                <Input
                  id="noneJobActivation"
                  value={student?.noneJobActivation || ""}
                  onChange={handleChange}
                  name="noneJobActivation"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel id="jobStandbyLabel">
                  آمادگی اشتغال به محض اتمام دوره کاریار
                </InputLabel>
                <Select
                  labelId="jobStandbyLabel"
                  id="jobStandby"
                  onChange={handleChange}
                  name="jobStandby"
                  value={student?.jobStandby ?? ""}
                >
                  <MenuItem value={true as any}>بله</MenuItem>
                  <MenuItem value={false as any}>خیر</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel id="webDevFamiliarity">
                  آشنایی با مشاغل مرتبط با برنامه نویسی و طراحی وب
                </InputLabel>
                <Select
                  labelId="webDevFamiliarity"
                  id="webDevFamiliarity"
                  onChange={handleChange}
                  name="webDevFamiliarity"
                  value={student?.webDevFamiliarity ?? ""}
                >
                  <MenuItem value={true as any}>بله</MenuItem>
                  <MenuItem value={false as any}>خیر</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="jobTitle">نوع و سمت شغلی</InputLabel>
                <Input
                  id="jobTitle"
                  value={student?.jobTitle || ""}
                  onChange={handleChange}
                  name="jobTitle"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <EditCombo
                placeholder="متوسط حقوق ماهیانه"
                identifier="avgSalary"
                options={avgSalaryOpt}
                value={student?.avgSalary}
                handleChange={handleChange}
              />
            </ListItem>
            <ListItem>
              <EditCombo
                placeholder="وقت آزاد روزانه"
                identifier="freeDailyTime"
                options={freeDailyTimeOpt}
                value={student?.freeDailyTime}
                handleChange={handleChange}
              />
              {/* <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="freeDailyTime">وقت آزاد روزانه</InputLabel>
                <Input
                  id="freeDailyTime"
                  value={student?.freeDailyTime || ""}
                  onChange={handleChange}
                  name="freeDailyTime"
                />
              </FormControl> */}
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="jobVision">
                  چشم انداز شغلی دوسال آینده
                </InputLabel>
                <Input
                  id="jobVision"
                  value={student?.jobVision || ""}
                  onChange={handleChange}
                  name="jobVision"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              {/* <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel id="computerFamiliarityLabel">
                  آشنایی کار با کامپیوتر
                </InputLabel>
                <Select
                  labelId="computerFamiliarityLabel"
                  id="computerFamiliarity"
                  onChange={handleChange}
                  name="computerFamiliarity"
                  value={student?.computerFamiliarity ?? ""}
                >
                  <MenuItem value={true as any}>بله</MenuItem>
                  <MenuItem value={false as any}>خیر</MenuItem>
                </Select>
              </FormControl> */}
              <EditCombo
                placeholder="آشنایی کار با کامپیوتر"
                identifier="computerFamiliarity"
                options={computerFamiliarityOpt}
                value={student?.computerFamiliarity}
                handleChange={handleChange}
              />
            </ListItem>
            <ListItem>
              {/* <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="computerAccess">
                  میزان دسترسی به کامپیوتر
                </InputLabel>
                <Input
                  id="computerAccess"
                  value={student?.computerAccess || ""}
                  onChange={handleChange}
                  name="computerAccess"
                />
              </FormControl>computerAccessOpt */}
              <EditCombo
                placeholder="میزان دسترسی به کامپیوتر"
                identifier="computerAccess"
                options={computerAccessOpt}
                value={student?.computerAccess}
                handleChange={handleChange}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel id="programmingCoursePassedLabel">
                  گذراندن دوره آموزشی در ارتباط با مهارت های کامپیوتر یا کدنویسی
                </InputLabel>
                <Select
                  labelId="programmingCoursePassedLabel"
                  id="programmingCoursePassed"
                  onChange={handleChange}
                  name="programmingCoursePassed"
                  value={student?.programmingCoursePassed ?? ""}
                >
                  <MenuItem value={true as any}>بله</MenuItem>
                  <MenuItem value={false as any}>خیر</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="courseDescription">توضیح دوره</InputLabel>
                <Input
                  id="courseDescription"
                  value={student?.courseDescription || ""}
                  onChange={handleChange}
                  name="courseDescription"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="internetAccess">
                  ابزار دسترسی به اینترنت
                </InputLabel>
                <Input
                  id="internetAccess"
                  value={student?.internetAccess || ""}
                  onChange={handleChange}
                  name="internetAccess"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="accessTime">ساعات دسترسی</InputLabel>
                <Input
                  id="accessTime"
                  value={student?.accessTime || ""}
                  onChange={handleChange}
                  name="accessTime"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              {/* <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="limitTime"> محدودیت زمانی</InputLabel>
                <Input
                  id="limitTime"
                  value={student?.limitTime || ""}
                  onChange={handleChange}
                  name="limitTime"
                />
              </FormControl> */}
              <EditCombo
                placeholder="محدودیت زمانی"
                identifier="limitTime"
                options={limitTimeOpt}
                value={student?.limitTime}
                handleChange={handleChange}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              {/* <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="motivation">
                  انگیزه ورود به کاریار
                </InputLabel>
                <Input
                  id="motivation"
                  value={student?.motivation || ""}
                  onChange={handleChange}
                  name="motivation"
                />
              </FormControl> */}
              <EditCombo
                placeholder="انگیزه ورود به کاریار"
                identifier="motivation"
                options={motivationOpt}
                value={student?.motivation}
                handleChange={handleChange}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="questionCity">
                  {" "}
                  آتشنشان در شهر خیالی
                </InputLabel>
                <Input
                  id="questionCity"
                  value={student?.questionCity || ""}
                  onChange={handleChange}
                  name="questionCity"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="questionNumbers">
                  {" "}
                  تعداد یک بین 100 تا 200
                </InputLabel>
                <Input
                  id="questionNumbers"
                  value={student?.questionNumbers || ""}
                  onChange={handleChange}
                  name="questionNumbers"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="questionMultiplication">
                  {" "}
                  تعداد صفر حاصل ضرب یک تا 50
                </InputLabel>
                <Input
                  id="questionMultiplication"
                  value={student?.questionMultiplication || ""}
                  onChange={handleChange}
                  name="questionMultiplication"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="questionMaths">
                  {" "}
                  میزان آشنایی با سرفصل های ریاضی
                </InputLabel>
                <Input
                  id="questionMaths"
                  value={student?.questionMaths || ""}
                  onChange={handleChange}
                  name="questionMaths"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="engPara">
                  یک پاراگراف درباره خود به انگلیسی
                </InputLabel>
                <Input
                  id="engPara"
                  value={student?.engPara || ""}
                  onChange={handleChange}
                  name="engPara"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="questionStudents">
                  محاسبه نرخ اشتغال{" "}
                </InputLabel>
                <Input
                  id="questionStudents"
                  value={student?.questionStudents || ""}
                  onChange={handleChange}
                  name="questionStudents"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="questionDiameters">
                  تعداد قطر هفت ضلعی{" "}
                </InputLabel>
                <Input
                  id="questionDiameters"
                  value={student?.questionDiameters || ""}
                  onChange={handleChange}
                  name="questionDiameters"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="questionWords">
                  حرف ایجادی از اشکال{" "}
                </InputLabel>
                <Input
                  id="questionWords"
                  value={student?.questionWords || ""}
                  onChange={handleChange}
                  name="questionWords"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="questionEnglishFamiliarity">
                  میزان آشنایی با زبان انگلیسی{" "}
                </InputLabel>
                <Input
                  id="questionEnglishFamiliarity"
                  value={student?.questionEnglishFamiliarity || ""}
                  onChange={handleChange}
                  name="questionEnglishFamiliarity"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="familiar">
                  نحوه آشنایی با کاریار
                </InputLabel>
                <Input
                  id="familiar"
                  value={student?.familiar || ""}
                  onChange={handleChange}
                  name="familiar"
                />
              </FormControl>
            </ListItem>
            <ListItem></ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="charity">
                  نام معرف/موسسه نیکوکاری
                </InputLabel>
                <Input
                  id="charity"
                  value={student?.charity || ""}
                  onChange={handleChange}
                  name="charity"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>

        <Grid container rowGap={5} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="eduStatus">وضعیت تحصیلی</InputLabel>
                  <Input
                    id="eduStatus"
                    value={student?.eduStatus || ""}
                    onChange={handleChange}
                    name="eduStatus"
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="jobReady">
                    آمادگی به کار بعد از اتمام دوره
                  </InputLabel>
                  <Select
                    labelId="jobReadyLabel"
                    id="jobReady"
                    onChange={handleChange}
                    name="jobReady"
                    value={student?.jobReady ?? ""}
                  >
                    <MenuItem value={true as any}>بله</MenuItem>
                    <MenuItem value={false as any}>خیر</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="beforeAcceptDesc">توضیحات</InputLabel>
                  <Input
                    id="beforeAcceptDesc"
                    value={student?.beforeAcceptDesc || ""}
                    onChange={handleChange}
                    name="beforeAcceptDesc"
                  />
                </FormControl>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="contCourseApproach">
                  هدف از شرکت در دوره
                </InputLabel>
                <Input
                  id="contCourseApproach"
                  value={student?.contCourseApproach || ""}
                  onChange={handleChange}
                  name="contCourseApproach"
                />
              </FormControl>
            </ListItem>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BeforeWeekEditComp;

const EditCombo = ({
  placeholder,
  identifier,
  value,
  handleChange,
  options,
}: any) => {
  const content = (
    <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
      <InputLabel id={identifier}>{placeholder}</InputLabel>
      <Select
        labelId={identifier}
        id={identifier}
        onChange={handleChange}
        name={identifier}
        value={value}
      >
        {options.map((option: any, i: any) => (
          <MenuItem key={i} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return content;
};

const instituteTypeOpt = [
  { value: "دبیرستان / پیش دانشگاهی", label: "دبیرستان / پیش دانشگاهی" },
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
    value: "دانشگاه پیام نور یا غیرانتفاعی یا پردیس",
    label: "دانشگاه پیام نور یا غیرانتفاعی یا پردیس",
  },
];
const instituteTypeCurrentOpt = [
  { value: "دبیرستان / پیش دانشگاهی", label: "دبیرستان / پیش دانشگاهی" },
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
    value: "دانشگاه پیام نور یا غیرانتفاعی یا پردیس",
    label: "دانشگاه پیام نور یا غیرانتفاعی یا پردیس",
  },
  {
    value: "در حال حاضر مشغول به تحصیل نیستم",
    label: "در حال حاضر مشغول به تحصیل نیستم",
  },
];

const jobStatusOpt = [
  {
    value: "مشغول کار منجر به درآمد هستم",
    label: "مشغول کار منجر به درآمد هستم",
  },
  {
    value: "مشغول کار منجر به درآمد نیستم",
    label: "مشغول کار منجر به درآمد نیستم",
  },
];

const avgSalaryOpt = [
  {
    value: "کمتر ازسه میلیون تومان",
    label: "کمتر ازسه میلیون تومان",
  },
  {
    value: "بین سه تا شش میلیون تومان",
    label: "بین سه تا شش میلیون تومان",
  },
  {
    value: "بیشتر از شش میلیون تومان",
    label: "بیشتر از شش میلیون تومان",
  },
];

const freeDailyTimeOpt = [
  {
    value: "کمتر از دو ساعت",
    label: "کمتر از دو ساعت",
  },
  {
    value: "بین یک تا سه ساعت",
    label: "بین یک تا سه ساعت",
  },
  {
    value: "بین سه تا پنج ساعت",
    label: "بین سه تا پنج ساعت",
  },
  {
    value: "بین پنج تا هفت ساعت",
    label: "بین پنج تا هفت ساعت",
  },
  {
    value: "بیشتر از هفت ساعت",
    label: "بیشتر از هفت ساعت",
  },
];

const computerAccessOpt = [
  {
    value: "عدم دسترسی",
    label: "عدم دسترسی",
  },
  {
    value: "دسترسی در مکان عمومی (کافی نت، سایت دانشگاه)",
    label: "دسترسی در مکان عمومی (کافی نت، سایت دانشگاه)",
  },
  {
    value: "دسترسی شخصی و اشتراکی (با اعضای خانواده، دوستان)",
    label: "دسترسی شخصی و اشتراکی (با اعضای خانواده، دوستان)",
  },
];

const limitTimeOpt = [
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

const motivationOpt = [
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
];
const computerFamiliarityOpt = [
  {
    value:
      "هر کامپیوتر یا لپتاپ جدیدی را می توانم روشن کنم و با آن شروع به کار کنم.",
    label:
      "هر کامپیوتر یا لپتاپ جدیدی را می توانم روشن کنم و با آن شروع به کار کنم.",
  },
  {
    value:
      "می توانم در ویندوز، پوشه (Folder) جدید ایجاد کنم و فایل های خودم را در آن کپی (Copy-Paste) کنم.",
    label:
      "می توانم در ویندوز، پوشه (Folder) جدید ایجاد کنم و فایل های خودم را در آن کپی (Copy-Paste) کنم.",
  },
  {
    value:
      "می توانم اطلاعات را با استفاده از فلش (USB Flash Disk) از یک کامپیوتر به کامپیوتر دیگر انتقال دهم.",
    label:
      "می توانم اطلاعات را با استفاده از فلش (USB Flash Disk) از یک کامپیوتر به کامپیوتر دیگر انتقال دهم.",
  },
  {
    value:
      "می توانم از نرم افزار Word برای تایپ نامه، از Powerpoint برای تهیه ارائه ها و از Excel برای حسابداری شخصی استفاده کنم",
    label:
      "می توانم از نرم افزار Word برای تایپ نامه، از Powerpoint برای تهیه ارائه ها و از Excel برای حسابداری شخصی استفاده کنم",
  },
  {
    value:
      "از برنامه های Skype، Zoom یا Google Meet برای تماس های تصویری استفاده  می کنم.",
    label:
      "از برنامه های Skype، Zoom یا Google Meet برای تماس های تصویری استفاده  می کنم.",
  },
  {
    value:
      "می توانم حین یک تماس تصویری، صفحه نمایش کامپیوترم را به طور زنده با دیگران به اشتراک بگذارم.",
    label:
      "می توانم حین یک تماس تصویری، صفحه نمایش کامپیوترم را به طور زنده با دیگران به اشتراک بگذارم.",
  },
];
