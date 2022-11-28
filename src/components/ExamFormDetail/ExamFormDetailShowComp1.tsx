import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useApprove from "../../hooks/request/useApprove";
import { ExamRegisterUser } from "../../model";
import { BoxExamDetail } from "../../styles/examFormDetail";
import { DetailTypography } from "../../styles/studentDetail";

interface ExamStudent {
  student: ExamRegisterUser | null;
  matches: boolean;
  id: string | undefined;
}

const ExamFormDetailShowComp1: React.FC<ExamStudent> = ({
  student,
  matches,
  id,
}) => {
  const { setApproveObject, successObject } = useApprove(id as string);

  console.log(student?.acceptWeekChecked);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bolder", my: 5 }}>
          فرم آزمون (فرم درخواست ثبت نام دردوره های آموزشی مطعوف به اشتغال
          کاریار)
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setApproveObject({ examFormChecked: true });
          }}
          disabled={
            student?.examFormChecked || successObject === "examFormChecked"
              ? true
              : false
          }
        >
          بررسی شد
        </Button>
      </Box>
      <BoxExamDetail
        colorActive={
          student?.examFormChecked || successObject === "examFormChecked"
        }
      >
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          وضعیت تحصیلی
        </DetailTypography>
        <Divider
          variant="middle"
          flexItem
          orientation={matches ? "vertical" : "horizontal"}
        />
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="نوع موسسه آموزشی آخرین مقطع تحصیلی"
                  secondary={student?.instituteType}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نام موسسه آموزشی آخرین مقطع تحصیلی"
                  secondary={student?.lastInstitute}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="اگر دانشجو هستید در چه مقطعی هستید؟"
                  secondary={student?.eduLevel}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="اگر دانشجو هستید در چه ترمی هستید؟"
                  secondary={student?.stuSemester}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="اگر دانش آموز هستید سال چندم هستید؟"
                  secondary={student?.stuYear}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="نوع موسسه آموزشی که در حال حاضر درآن تحصیل می کنید"
                  secondary={student?.currentInstType}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نام موسسه آموزشی تحصیلات حال حاضر"
                  secondary={student?.currentInstName}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="رشته تحصیلی فعلی"
                  secondary={student?.currentField}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </BoxExamDetail>
      <BoxExamDetail colorActive={student?.examFormChecked}>
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          وضعیت اشتغال
        </DetailTypography>

        <Divider
          variant="middle"
          flexItem
          orientation={matches ? "vertical" : "horizontal"}
        />
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="وضعیت فعلی اشتغال"
                  secondary={student?.jobStatus}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نوع اشتغال"
                  secondary={student?.jobType}
                />
              </ListItem>
            </List>
            <ListItem>
              <ListItemText
                primary="تعداد ساعت کاری"
                secondary={student?.workTime}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="مشغولیت فعلی در صورت عدم اشتغال"
                secondary={student?.noneJobActivation}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="آمادگی اشتغال به محض اتمام دوره کاریار"
                secondary={student?.jobStandby ? "بله" : "خیر"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="آشنایی با مشاغل مرتبط با برنامه نویسی و طراحی وب"
                secondary={student?.webDevFamiliarity ? "بله" : "خیر"}
              />
            </ListItem>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="نوع و سمت شغلی"
                  secondary={student?.jobTitle}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="متوسط حقوق ماهیانه"
                  secondary={student?.avgSalary}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="وقت آزاد روزانه"
                  secondary={student?.freeDailyTime}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="چشم انداز شغلی دوسال آینده"
                  secondary={student?.jobVision}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </BoxExamDetail>
      <BoxExamDetail colorActive={student?.examFormChecked}>
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          وضعیت اشتغال
        </DetailTypography>
        <Divider
          variant="middle"
          flexItem
          orientation={matches ? "vertical" : "horizontal"}
        />
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="وضعیت کار با کامپیوتر"
                  // secondary={student?.}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="میزان دسترسی به کامپیوتر"
                  secondary={student?.computerAccess}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="آیا تا به حال  دوره آموزشی  در ارتباط با مهارت های کامپیوتریا کدنویسی گذرانده اید؟"
                  secondary={student?.programmingCoursePassed ? "بله" : "خیر"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="توضیح دوره"
                  secondary={student?.courseDescription}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="ابزار دسترسی به اینترنت"
                  secondary={student?.internetAccess}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="ساعات دسترسی"
                  secondary={student?.accessTime}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </BoxExamDetail>
      <BoxExamDetail colorActive={student?.examFormChecked}>
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          مدیریت زمان
        </DetailTypography>
        <Divider
          variant="middle"
          flexItem
          orientation={matches ? "vertical" : "horizontal"}
        />
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="محدودیت زمانی"
                  secondary={student?.limitTime}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="انگیزه ورود به کاریار"
                  secondary={student?.motivation}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </BoxExamDetail>
      <BoxExamDetail colorActive={student?.examFormChecked}>
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          وضعیت بورسیه
        </DetailTypography>
        <Divider
          variant="middle"
          flexItem
          orientation={matches ? "vertical" : "horizontal"}
        />
        <Grid container>
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemText
                  primary="نحوه آشنایی با کاریار"
                  secondary={student?.familiar}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نام معرف/موسسه نیکوکاری"
                  secondary={student?.charity}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </BoxExamDetail>
    </>
  );
};

export default ExamFormDetailShowComp1;
