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
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="instituteType">
                  نوع موسسه آموزشی آخرین مقطع تحصیلی
                </InputLabel>
                <Input
                  id="instituteType"
                  value={student?.instituteType || ""}
                  onChange={handleChange}
                  name="instituteType"
                />
              </FormControl>
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
            <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
              <InputLabel htmlFor="currentInstType">
                نوع موسسه آموزشی که در حال حاضر درآن تحصیل می کنید
              </InputLabel>
              <Input
                id="currentInstType"
                value={student?.currentInstType || ""}
                onChange={handleChange}
                name="currentInstType"
              />
            </FormControl>
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
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="jobStatus">وضعیت فعلی اشتغال</InputLabel>
                <Input
                  id="jobStatus"
                  value={student?.jobStatus || ""}
                  onChange={handleChange}
                  name="jobStatus"
                />
              </FormControl>
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
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="avgSalary">متوسط حقوق ماهیانه</InputLabel>
                <Input
                  id="avgSalary"
                  value={student?.avgSalary || ""}
                  onChange={handleChange}
                  name="avgSalary"
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="freeDailyTime">وقت آزاد روزانه</InputLabel>
                <Input
                  id="freeDailyTime"
                  value={student?.freeDailyTime || ""}
                  onChange={handleChange}
                  name="freeDailyTime"
                />
              </FormControl>
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
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
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
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="computerAccess">
                  میزان دسترسی به کامپیوتر
                </InputLabel>
                <Input
                  id="computerAccess"
                  value={student?.computerAccess || ""}
                  onChange={handleChange}
                  name="computerAccess"
                />
              </FormControl>
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
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="limitTime"> محدودیت زمانی</InputLabel>
                <Input
                  id="limitTime"
                  value={student?.limitTime || ""}
                  onChange={handleChange}
                  name="limitTime"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
                <InputLabel htmlFor="motivation">
                  انگیزه ورود به کاریار
                </InputLabel>
                <Input
                  id="motivation"
                  value={student?.motivation || ""}
                  onChange={handleChange}
                  name="motivation"
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
