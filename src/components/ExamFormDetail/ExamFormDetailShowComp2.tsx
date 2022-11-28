import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import useApprove from "../../hooks/request/useApprove";
import { ExamRegisterUser } from "../../model";
import { BoxExamDetail } from "../../styles/examFormDetail";
import { DetailTypography } from "../../styles/studentDetail";
import UploadImage from "../UploadImage";

interface ExamStudent {
  student: ExamRegisterUser | null;
  matches: boolean;
  id: string | undefined;
}

const ExamFormDetailShowComp2: React.FC<ExamStudent> = ({
  student,
  matches,
  id,
}) => {
  const { setApproveObject, successObject } = useApprove(id as string);
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
          ارزیابی قبل از پذیرش
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setApproveObject({ beforeAcceptChecked: true });
          }}
          disabled={
            student?.beforeAcceptChecked ||
            successObject === "beforeAcceptChecked"
              ? true
              : false
          }
        >
          بررسی شد
        </Button>
      </Box>
      <BoxExamDetail
        colorActive={
          student?.beforeAcceptChecked ||
          successObject === "beforeAcceptChecked"
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
                  // secondary={student?.}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="توضیحات"
                  // secondary={student?.}
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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bolder", my: 5 }}>
          فرم ثبت نام هفته پذیرش
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setApproveObject({ acceptWeekChecked: true });
          }}
          disabled={
            student?.acceptWeekChecked || successObject === "acceptWeekChecked"
              ? true
              : false
          }
        >
          بررسی شد
        </Button>
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
                  primary="وضعیت شرکت در کارگاه معارفه"
                  secondary={student?.workshopCont}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="اطلاع از برنامه هفته پذیرش کاریار و شرکت در آن"
                  secondary={student?.notifyAcceptWeek}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نتیجه تست MBTI"
                  secondary={student?.mbtiTest}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نتیجه تعیین سطح کامپیوتر"
                  secondary={student?.comLevelResult}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="انتخاب اولیه مسیر شغلی"
                  secondary={student?.firstSelectJobRoad}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نتیجه تعیین سطح الگوریتم"
                  secondary={student?.algoLevelResult}
                />
              </ListItem>
              <ListItem>
                <UploadImage
                  id={id}
                  disableProp={
                    student?.acceptWeekChecked ||
                    successObject === "acceptWeekChecked"
                  }
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
          نتیجه هفته پذیرش
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setApproveObject({ weekResultChecked: true });
          }}
          disabled={
            student?.weekResultChecked || successObject === "weekResultChecked"
              ? true
              : false
          }
        >
          بررسی شد
        </Button>
      </Box>
      <BoxExamDetail
        colorActive={
          student?.weekResultChecked || successObject === "weekResultChecked"
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
                  primary="نمره تعیین سطح زیان"
                  // secondary={student?.workshopCont}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نمره آزمون الگوریتم"
                  // secondary={student?.notifyAcceptWeek}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نمره آزمون کامپیوتر"
                  // secondary={student?.mbtiTest}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="وضعیت حضور و غیاب"
                  secondary={student?.presentStatus}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="وضعیت دسترسی به کامپیوتر و اینترنت"
                  secondary={student?.comAccessStatus}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="پیش بینی ریزش"
                  secondary={student?.predict}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </BoxExamDetail>
      <BoxExamDetail
        colorActive={
          student?.weekResultChecked || successObject === "weekResultChecked"
        }
      >
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          نتیجه جلسه با سرگروه
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
                  primary="رشته پیشنهادی سرگروه"
                  secondary={student?.recommendField}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="ریسک ها و محدودیت ها"
                  secondary={student?.limitAndRisk}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </BoxExamDetail>
      <BoxExamDetail
        colorActive={
          student?.weekResultChecked || successObject === "weekResultChecked"
        }
      >
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          نتیجه جلسه با منتور
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
                  primary="اختصاص وقت کافی به کاریار"
                  secondary={student?.consistCompleteTime}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="تعهد به اشتغال"
                  secondary={student?.jobCommit}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="سایر ملاحظات"
                  secondary={student?.etcDesc}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </BoxExamDetail>
      <BoxExamDetail
        colorActive={
          student?.weekResultChecked || successObject === "weekResultChecked"
        }
      >
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          نتایج هفته پذیرش
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
                  primary="تعهد به کار"
                  secondary={student?.workCommit}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="اختصاص زمان کافی"
                  secondary={student?.consistTime}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="دسترسی به کامپیوتر و اینترنت"
                  secondary={student?.comAccessStatus}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="اخلاق فردی و حرفه ای"
                  secondary={student?.ethics}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </BoxExamDetail>
      <Typography variant="h5" sx={{ fontWeight: "bolder", my: 5 }}>
        نتیجه نهایی
      </Typography>
      <BoxExamDetail>
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
                <ListItemText secondary={student?.finalResult} />
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
          ثبت نام نهایی
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setApproveObject({ finalResultChecked: true });
          }}
          disabled={
            student?.finalResultChecked ||
            successObject === "finalResultChecked"
              ? true
              : false
          }
        >
          بررسی شد
        </Button>
      </Box>
      <BoxExamDetail
        colorActive={
          student?.finalResultChecked || successObject === "finalResultChecked"
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
                  primary="بورسیه دارد؟"
                  // secondary={student?.}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="درصد بورسیه"
                  // secondary={student?.}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="رشته نهایی "
                  secondary={student?.finalField}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </BoxExamDetail>
    </>
  );
};

export default ExamFormDetailShowComp2;
