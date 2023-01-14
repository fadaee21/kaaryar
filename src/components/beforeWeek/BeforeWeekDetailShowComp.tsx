import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useApproveWeek } from "../../hooks/request/useApprove";
import { BeforeWeekType } from "../../model";
import { BoxExamDetail } from "../../styles/examFormDetail";
import { DetailTypography } from "../../styles/studentDetail";

interface ExamStudent {
  student: BeforeWeekType | null;
  matches: boolean;
  id: string | undefined;
  //typeComp:help to check which page use and show or not show button group
  typeComp: "exam" | "admission";
}
const approveLink = "/exam/before/week/form/approve";
const BeforeWeekDetailShow: React.FC<ExamStudent> = ({
  student,
  matches,
  id,
  typeComp,
}) => {
  const { successObject, getApproveWeek } = useApproveWeek();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const roles = auth.roles.toString();

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
        <ButtonGroup
          variant="contained"
          color="secondary"
          size="large"
          aria-label="small button group"
          sx={{ ...(typeComp === "admission" && { display: "none" }) }}
        >
          <Button
            onClick={() => navigate(`/${roles}/before-week-edit/${id}`)}
            disabled={
              student?.acceptWeekChecked ||
              successObject === "acceptWeekChecked"
                ? true
                : false
            }
          >
            ویرایش
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              getApproveWeek(id, { acceptWeekChecked: true }, approveLink);
            }}
            disabled={
              student?.acceptWeekChecked ||
              successObject === "acceptWeekChecked"
                ? true
                : false
            }
          >
            تایید
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              getApproveWeek(id, { acceptWeekChecked: false }, approveLink);
            }}
            disabled={
              student?.acceptWeekChecked ||
              successObject === "acceptWeekChecked"
                ? true
                : false
            }
          >
            عدم تایید
          </Button>
        </ButtonGroup>
      </Box>
      <BoxExamDetail
        colorActive={
          student?.acceptWeekChecked || successObject === "acceptWeekChecked"
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
      <BoxExamDetail colorActive={student?.acceptWeekChecked}>
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
      <BoxExamDetail colorActive={student?.acceptWeekChecked}>
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
                  primary="آشنایی کار با کامپیوتر"
                  secondary={student?.computerFamiliarity ? "بله" : "خیر"}
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
      <BoxExamDetail colorActive={student?.acceptWeekChecked}>
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
      <BoxExamDetail colorActive={student?.acceptWeekChecked}>
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bolder", my: 5 }}>
          ارزیابی قبل از پذیرش
        </Typography>
      </Box>
      <BoxExamDetail
        colorActive={
          student?.acceptWeekChecked || successObject === "acceptWeekChecked"
        }
      >
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }} />

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
                  primary="وضعیت تحصیلی"
                  secondary={student?.eduStatus}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="آمادگی به کار بعد از اتمام دوره"
                  secondary={student?.jobReady ? "بله" : "خیر"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="توضیحات"
                  secondary={student?.beforeAcceptDesc}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="هدف از شرکت در دوره"
                  secondary={student?.contCourseApproach}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </BoxExamDetail>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 5,
        }}
      >
        <ButtonGroup
          variant="contained"
          color="secondary"
          size="large"
          aria-label="small button group"
          sx={{ ...(typeComp === "admission" && { display: "none" }) }}
        >
          <Button
            onClick={() => navigate(`/${roles}/before-week-edit/${id}`)}
            disabled={
              student?.acceptWeekChecked ||
              successObject === "acceptWeekChecked"
                ? true
                : false
            }
          >
            ویرایش
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              getApproveWeek(id, { acceptWeekChecked: true }, approveLink);
            }}
            disabled={
              student?.acceptWeekChecked ||
              successObject === "acceptWeekChecked"
                ? true
                : false
            }
          >
            تایید
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              getApproveWeek(id, { acceptWeekChecked: false }, approveLink);
            }}
            disabled={
              student?.acceptWeekChecked ||
              successObject === "acceptWeekChecked"
                ? true
                : false
            }
          >
            عدم تایید
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default BeforeWeekDetailShow;
