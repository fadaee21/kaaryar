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
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

import useGetImage from "../../hooks/request/useGetImage";
import { AfterWeekType } from "../../model";
import { ContentBox } from "../../styles/examFormDetail";
import { DetailTypography } from "../../styles/studentDetail";
// import FinalResult from "./FinalResult";
import ImageModal from "../ImageModal";
import { getLabel } from "../../utils/getLabel";
import { SelectedFieldOpt } from "../search/searchOptions";
const LookUpLink = React.lazy(() => import("./LookUpLink"));
// import UploadImage from "../UploadImage";

interface AfterWeekStudentShow {
  student: AfterWeekType | null;
  matches: boolean;
  id: string | undefined;
  typeComp: "exam" | "admission";
  successObject?: string;
  handleOpenAlert?: (alert: "approve" | "disApprove") => void;
  refreshingPage?: () => void;
}

const AfterWeekDetailShowComp: React.FC<AfterWeekStudentShow> = ({
  student,
  matches,
  id,
  typeComp,
  successObject,
  handleOpenAlert,
  refreshingPage,
}) => {
  const navigate = useNavigate();
  // this component use for skill-seeker page also,in that page you don't need approve button.handling this by location
  const location = useLocation();
  const seekerPage =
    location.pathname.includes("skill-seeker") ||
    location.pathname.includes("student");

  const { auth } = useAuth();
  const roles = auth.roles.toString();

  const { pic, getPicture } = useGetImage("/moodle/payment/img/user/");

  const sField = student?.beforeWeekForm?.registrationForm?.selectedField;
  const cField = student?.beforeWeekForm?.registrationForm?.careerPathwayOther;
  const st = student?.moodleUser;
  React.useEffect(() => {
    st && getPicture(st.id.toString());
  }, [getPicture, st]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {!seekerPage && (
        <LookUpLink student={student} id={id} refreshingPage={refreshingPage} />
      )}
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
      {/* فرم ثبت نام هفته پذیرش */}
      <ContentBox
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
                  primary="انتخاب اولیه مسیر شغلی"
                  secondary={
                    sField?.trim() === "other"
                      ? "سایر"
                      : getLabel(sField, SelectedFieldOpt)
                  }
                />
              </ListItem>

              {cField && (
                <ListItem>
                  <ListItemText
                    primary="مسیر مورد نظر متقاضی"
                    secondary={cField}
                  />
                </ListItem>
              )}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="نتیجه تعیین سطح کامپیوتر"
                  secondary={student?.comLevelResult}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نتیجه تعیین سطح زبان انگلیسی"
                  secondary={student?.langScore}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="تعیین سطح الگوریتم و ریاضی"
                  secondary={student?.algoScore}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نمره مهارت‌های پایه--"
                  // secondary={student?.langScore}
                />
              </ListItem>
              <ListItem
                sx={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <ListItemText primary="عکس فیش واریزی" />
                {pic && (
                  <ListItemAvatar
                    onClick={handleOpen}
                    sx={{ cursor: "pointer" }}
                  >
                    <Box
                      component={"img"}
                      alt="payment image"
                      src={pic}
                      sx={{ width: 150, height: "100%", borderRadius: 2 }}
                    />
                  </ListItemAvatar>
                )}
              </ListItem>
              {/* upload image that doesn't need anymore */}
              {/* <ListItem>
                <UploadImage
                  id={id}
                  disableProp={
                    student?.afterWeekChecked ||
                    successObject === "afterWeekChecked"
                  }
                />
              </ListItem> */}
            </List>
          </Grid>
        </Grid>
      </ContentBox>
      {/* کارنامه هفته پذیرش */}
      <ContentBox
        colorActive={
          student?.afterWeekChecked || successObject === "afterWeekChecked"
        }
      >
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          کارنامه هفته پذیرش
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
                  primary="نتیجه تعیین سطح الگوریتم"
                  secondary={student?.algoLevelResult}
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
        </Grid>
      </ContentBox>
      {/* نظرات سرگروه */}
      <ContentBox
        colorActive={
          student?.afterWeekChecked || successObject === "afterWeekChecked"
        }
      >
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          نظرات سرگروه
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
                  primary="اختصاص زمان کافی به کاریار"
                  secondary={student?.consistCompleteTime}
                />
              </ListItem>
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
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="تعهد به کار"
                  secondary={student?.jobCommit}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="رشته پیشنهادی سرگروه"
                  secondary={student?.recommendField}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="سایر ریسک‌ها و محدودیت‌ها"
                  secondary={student?.etcDesc}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </ContentBox>
      {/* نظرات منتور */}
      <ContentBox
        colorActive={
          student?.afterWeekChecked || successObject === "afterWeekChecked"
        }
      >
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          نظرات منتور
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
                  primary="اختصاص زمان کافی به کاریار"
                  secondary={student?.consistTime}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="رشته پیشنهادی منتور"
                  secondary={student?.recommendFieldMentor}
                />
              </ListItem>
            </List>
          </Grid>
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
                  primary="سایر ریسک‌ها و محدودیت‌ها"
                  secondary={student?.limitAndRisk}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </ContentBox>
      {/* <ContentBox
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
                  primary="اخلاق فردی و حرفه ای"
                  secondary={student?.ethics}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </ContentBox> */}

      {/* link after week student to moodle student */}
      {/* {!seekerPage && (
        <FinalResult
          approvedStu={student?.afterWeekChecked}
          finalResult={student?.finalResult}
          id={id}
        />
      )} */}
      {/* نهایی */}
      <Typography variant="h6" sx={{ fontWeight: "bolder", my: 5 }}>
        نتیجه نهایی
      </Typography>
      <ContentBox>
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
      </ContentBox>

      <Typography variant="h6" sx={{ fontWeight: "bolder", my: 5 }}>
        ثبت نام نهایی
      </Typography>
      <ContentBox
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
              {student?.scholar && (
                <ListItem>
                  <ListItemText
                    primary="درصد بورسیه"
                    secondary={student?.scholarPercentage}
                  />
                </ListItem>
              )}
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
      </ContentBox>
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
      <ImageModal pic={pic} open={open} handleClose={handleClose} />
    </>
  );
};

export default AfterWeekDetailShowComp;
