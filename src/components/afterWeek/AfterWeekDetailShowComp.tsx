import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

import useGetImage from "../../hooks/request/useGetImage";
import { AfterWeekType } from "../../model";
import { BoxExamDetail } from "../../styles/examFormDetail";
import { DetailTypography } from "../../styles/studentDetail";
const LookUpLink = React.lazy(() => import("./LookUpLink"));
// import UploadImage from "../UploadImage";

interface AfterWeekStudentShow {
  student: AfterWeekType | null;
  matches: boolean;
  id: string | undefined;
  typeComp: "exam" | "admission";
  successObject?: string;
  handleOpenAlert?: (alert: "approve" | "disApprove") => void;
}

const AfterWeekDetailShowComp: React.FC<AfterWeekStudentShow> = ({
  student,
  matches,
  id,
  typeComp,
  successObject,
  handleOpenAlert,
}) => {
  const navigate = useNavigate();
  // this component use for skill-seeker page also,in that page you don't need approve button.handling this by location
  const location = useLocation();
  const seekerPage =
    location.pathname.includes("skill-seeker") ||
    location.pathname.includes("student");
  console.log(seekerPage);
  const { auth } = useAuth();
  const roles = auth.roles.toString();

  const { pic, getPicture } = useGetImage();

  React.useEffect(() => {
    getPicture(student?.beforeWeekForm.paymentImageAddress);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bolder", my: 5 }}>
          فرم ثبت نام هفته پذیرش
        </Typography>

        {!seekerPage && (
          <ButtonGroup
            variant="contained"
            color="secondary"
            size="large"
            aria-label="small button group"
            disabled={
              student?.afterWeekChecked !== null ||
              successObject === "afterWeekChecked"
                ? true
                : false
            }
            sx={{ ...(typeComp === "admission" && { display: "show" }) }}
          >
            <Button onClick={() => navigate(`/${roles}/after-week-edit/${id}`)}>
              ویرایش
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOpenAlert?.("approve")}
            >
              تایید کردن
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOpenAlert?.("disApprove")}
            >
              رد کردن
            </Button>
          </ButtonGroup>
        )}
      </Box>
      <BoxExamDetail
        colorActive={
          student?.afterWeekChecked || successObject === "afterWeekChecked"
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
                  secondary={student?.beforeWeekForm.workshopCont}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="اطلاع از برنامه هفته پذیرش کاریار و شرکت در آن"
                  secondary={student?.beforeWeekForm.notifyAcceptWeek}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نتیجه تست MBTI"
                  secondary={student?.beforeWeekForm.mbtiTest}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نتیجه تعیین سطح کامپیوتر"
                  secondary={student?.beforeWeekForm.comLevelResult}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="انتخاب اولیه مسیر شغلی"
                  secondary={student?.beforeWeekForm.firstSelectJobRoad}
                />
              </ListItem>
              <ListItem
                sx={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <ListItemText primary="فیش واریزی" />
                {student?.beforeWeekForm.paymentImageAddress && (
                  <ListItemAvatar>
                    <Box
                      component={"img"}
                      alt="avatar"
                      src={pic}
                      sx={{ width: 150, height: "100%", borderRadius: 2 }}
                    />
                  </ListItemAvatar>
                )}
              </ListItem>
              {/* <ListItem>
                <UploadImage
                  id={id}
                  disableProp={
                    student?.afterWeekChecked ||
                    successObject === "afterWeekChecked"
                  }
                />
              </ListItem> */}
              <ListItem>
                <ListItemText
                  primary="نتیجه تعیین سطح الگوریتم"
                  secondary={student?.beforeWeekForm.algoLevelResult}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </BoxExamDetail>

      <Typography variant="h6" sx={{ fontWeight: "bolder", my: 5 }}>
        نتیجه هفته پذیرش
      </Typography>
      <BoxExamDetail
        colorActive={
          student?.afterWeekChecked || successObject === "afterWeekChecked"
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
                  secondary={student?.langScore}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نمره آزمون الگوریتم"
                  secondary={student?.algoScore}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نمره آزمون کامپیوتر"
                  secondary={student?.comScore}
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
          student?.afterWeekChecked || successObject === "afterWeekChecked"
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
          student?.afterWeekChecked || successObject === "afterWeekChecked"
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
          student?.afterWeekChecked || successObject === "afterWeekChecked"
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
              {/* <ListItem>
                <ListItemText
                  primary="دسترسی به کامپیوتر و اینترنت"
                  secondary={student?.comAccessStatus}
                />
              </ListItem> */}
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
      {/* link after week student to moodle student */}
      {!seekerPage && <LookUpLink student={student} id={id} />}

      <Typography variant="h6" sx={{ fontWeight: "bolder", my: 5 }}>
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

      <Typography variant="h6" sx={{ fontWeight: "bolder", my: 5 }}>
        ثبت نام نهایی
      </Typography>
      <BoxExamDetail
        colorActive={
          student?.afterWeekChecked || successObject === "afterWeekChecked"
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
                  secondary={student?.scholar ? "بله" : "خیر"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="درصد بورسیه"
                  secondary={student?.scholarPercentage}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 5,
        }}
      >
        {!seekerPage && (
          <ButtonGroup
            variant="contained"
            color="secondary"
            size="large"
            aria-label="small button group"
            disabled={
              student?.afterWeekChecked !== null ||
              successObject === "afterWeekChecked"
                ? true
                : false
            }
            sx={{ ...(typeComp === "admission" && { display: "show" }) }}
          >
            <Button onClick={() => navigate(`/${roles}/after-week-edit/${id}`)}>
              ویرایش
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOpenAlert?.("approve")}
            >
              تایید کردن
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOpenAlert?.("disApprove")}
            >
              رد کردن
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </>
  );
};

export default AfterWeekDetailShowComp;
