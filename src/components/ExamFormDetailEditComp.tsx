import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select from "@mui/material/Select";
import { ExamRegisterUser } from "../model";
import { editComment } from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

interface ExamStudent {
  student: ExamRegisterUser | null;
}

const ExamFormDetailEditComp: React.FC<ExamStudent> = ({ student }) => {
  const [examObject, setExamObject] = useState({
    instituteType: student?.instituteType,
    lastInstitute: student?.lastInstitute,
    currentInstType: student?.currentInstType,
    currentInstName: student?.currentInstName,
    currentField: student?.currentField,
    eduLevel: student?.eduLevel,
    stuSemester: student?.stuSemester,
    stuYear: student?.stuYear,
    jobStatus: student?.jobStatus,
    jobType: student?.jobType,
    jobTitle: student?.jobTitle,
    jobVision: student?.jobVision,
    avgSalary: student?.avgSalary,
    freeDailyTime: student?.freeDailyTime,
    workTime: student?.workTime,
    noneJobActivation: student?.noneJobActivation,
    jobStandby: student?.jobStandby,
    webDevFamiliarity: student?.webDevFamiliarity,
    computerFamiliarity: student?.computerFamiliarity,
    computerAccess: student?.computerAccess,
    programmingCoursePassed: student?.programmingCoursePassed,
    courseDescription: student?.courseDescription,
    internetAccess: student?.internetAccess,
    accessTime: student?.accessTime,
    limitTime: student?.limitTime,
    motivation: student?.motivation,
    familiar: student?.familiar,
    charity: student?.charity,
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setExamObject((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await editComment(`/exam/form/${id}`, {
        data: examObject,
      });
      if (response.status === 200) {
        navigate(-1);
      } else {
        console.log(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container rowGap={5} sx={{ my: 7 }}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="instituteType">
              نوع موسسه آموزشی آخرین مقطع تحصیلی
            </InputLabel>
            <Input
              id="instituteType"
              value={examObject.instituteType || " "}
              onChange={handleChange}
              name="instituteType"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="lastInstitute">
              نام موسسه آموزشی آخرین مقطع تحصیلی
            </InputLabel>
            <Input
              id="lastInstitute"
              value={examObject.lastInstitute || " "}
              onChange={handleChange}
              name="lastInstitute"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="currentInstType">نوع موسسه فعلی</InputLabel>
            <Input
              id="currentInstType"
              value={examObject.currentInstType || " "}
              onChange={handleChange}
              name="currentInstType"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="currentInstName">نام موسسه فعلی</InputLabel>
            <Input
              id="currentInstName"
              value={examObject.currentInstName || " "}
              onChange={handleChange}
              name="currentInstName"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="currentField">رشته تحصیلی فعلی</InputLabel>
            <Input
              id="currentField"
              value={examObject.currentField || " "}
              onChange={handleChange}
              name="currentField"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="eduLevel">
              اگر دانشجو هستید در چه مقطعی هستید؟
            </InputLabel>
            <Input
              id="eduLevel"
              value={examObject.eduLevel || " "}
              onChange={handleChange}
              name="eduLevel"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="stuSemester">
              اگر دانشجو هستید در چه ترمی هستید؟
            </InputLabel>
            <Input
              id="stuSemester"
              value={examObject.stuSemester || " "}
              onChange={handleChange}
              name="stuSemester"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="stuYear">
              اگر دانش آموز هستید سال چندم هستید؟
            </InputLabel>
            <Input
              id="stuYear"
              value={examObject.stuYear || " "}
              onChange={handleChange}
              name="stuYear"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="jobStatus">وضعیت فعلی اشتغال</InputLabel>
            <Input
              id="jobStatus"
              value={examObject.jobStatus || " "}
              onChange={handleChange}
              name="jobStatus"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="jobType">نوع اشتغال</InputLabel>
            <Input
              id="jobType"
              value={examObject.jobType || " "}
              onChange={handleChange}
              name="jobType"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="jobTitle">نوع و سمت شغلی</InputLabel>
            <Input
              id="jobTitle"
              value={examObject.jobTitle || " "}
              onChange={handleChange}
              name="jobTitle"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="jobVision">
              چشم انداز شغلی دوسال آینده
            </InputLabel>
            <Input
              id="jobVision"
              value={examObject.jobVision || " "}
              onChange={handleChange}
              name="jobVision"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="avgSalary">متوسط حقوق ماهیانه</InputLabel>
            <Input
              id="avgSalary"
              value={examObject.avgSalary || " "}
              onChange={handleChange}
              name="avgSalary"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="freeDailyTime">وقت آزاد روزانه</InputLabel>
            <Input
              id="freeDailyTime"
              value={examObject.freeDailyTime || " "}
              onChange={handleChange}
              name="freeDailyTime"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="workTime">تعداد ساعت کاری</InputLabel>
            <Input
              id="workTime"
              value={examObject.workTime || " "}
              onChange={handleChange}
              name="workTime"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="noneJobActivation">
              مشغولیت فعلی در صورت عدم اشتغال
            </InputLabel>
            <Input
              id="noneJobActivation"
              value={examObject.noneJobActivation || " "}
              onChange={handleChange}
              name="noneJobActivation"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel id="jobStandbyLabel">آماده به کار</InputLabel>
            <Select
              labelId="jobStandbyLabel"
              id="jobStandby"
              onChange={handleChange}
              name="labelId"
              defaultValue={examObject.jobStandby}
            >
              <MenuItem value={true as any}>بله</MenuItem>
              <MenuItem value={false as any}>خیر</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel id="webDevFamiliarity">آشنایی با وب</InputLabel>
            <Select
              labelId="webDevFamiliarity"
              id="webDevFamiliarity"
              onChange={handleChange}
              name="labelId"
              defaultValue={examObject.webDevFamiliarity}
            >
              <MenuItem value={true as any}>بله</MenuItem>
              <MenuItem value={false as any}>خیر</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel id="computerFamiliarityLabel">
              آشنایی با کامپیوتر
            </InputLabel>
            <Select
              labelId="computerFamiliarityLabel"
              id="computerFamiliarity"
              onChange={handleChange}
              name="labelId"
              defaultValue={examObject.computerFamiliarity}
            >
              <MenuItem value={true as any}>بله</MenuItem>
              <MenuItem value={false as any}>خیر</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel id="programmingCoursePassedLabel">
              گذراندن دوره برنامه نویسی
            </InputLabel>
            <Select
              labelId="programmingCoursePassedLabel"
              id="programmingCoursePassed"
              onChange={handleChange}
              name="labelId"
              defaultValue={examObject.programmingCoursePassed}
            >
              <MenuItem value={true as any}>بله</MenuItem>
              <MenuItem value={false as any}>خیر</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="computerAccess">
              میزان دسترسی به کامپیوتر
            </InputLabel>
            <Input
              id="computerAccess"
              value={examObject.computerAccess || " "}
              onChange={handleChange}
              name="computerAccess"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="courseDescription">توضیح دوره</InputLabel>
            <Input
              id="courseDescription"
              value={examObject.courseDescription || " "}
              onChange={handleChange}
              name="courseDescription"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="internetAccess">
              ابزار دسترسی به اینترنت
            </InputLabel>
            <Input
              id="internetAccess"
              value={examObject.internetAccess || " "}
              onChange={handleChange}
              name="internetAccess"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="accessTime">ساعات دسترسی</InputLabel>
            <Input
              id="accessTime"
              value={examObject.accessTime || " "}
              onChange={handleChange}
              name="accessTime"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="motivation">انگیزه ورود به کاریار</InputLabel>
            <Input
              id="motivation"
              value={examObject.motivation || " "}
              onChange={handleChange}
              name="motivation"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="familiar">نحوه آشنایی با کاریار</InputLabel>
            <Input
              id="familiar"
              value={examObject.familiar || " "}
              onChange={handleChange}
              name="familiar"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ width: "50ch" }} variant="standard">
            <InputLabel htmlFor="charity">نام معرف/موسسه نیکوکاری</InputLabel>
            <Input
              id="charity"
              value={examObject.charity || " "}
              onChange={handleChange}
              name="charity"
            />
          </FormControl>
        </Grid>
        <Button
          onClick={handleClick}
          variant="contained"
          type="submit"
          disabled={loading ? true : false}
        >
          تایید
        </Button>
      </Grid>
    </Box>
  );
};

export default ExamFormDetailEditComp;
