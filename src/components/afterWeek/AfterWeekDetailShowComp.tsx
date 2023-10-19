import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AfterWeekType, TypeComp } from "../../model";
import { getLabel } from "../../utils/getLabel";
import { SelectedFieldOpt } from "../search/searchOptions";
import ImageManager from "../beforeWeek/ImageManager";
import { lazy } from "react";
import LayoutReg from "../layout/LayoutReg";
const LookUpLink = lazy(() => import("./LookUpLink"));

interface AfterWeekStudentShow {
  student: AfterWeekType | undefined;
  id: string | undefined;
  typeComp: TypeComp;
  successObject?: string;
  handleOpenAlert?: (alert: "approve" | "disApprove") => void;
  refreshingPage?: () => void;
}

const AfterWeekDetailShowComp: React.FC<AfterWeekStudentShow> = ({
  student,
  id,
  typeComp,
  successObject,
  handleOpenAlert,
  refreshingPage,
}) => {
  const navigate = useNavigate();
  if (!student) return null;
  const cField = student.beforeWeekForm?.registrationForm?.careerPathwayOther;

  const ButtonGroupComp = () => {
    const disabling =
      successObject === "afterWeekChecked" || typeComp !== "afterWeek";
    const isDisabledEdit = student.afterWeekChecked === false || disabling;
    const isDisabled = student.afterWeekChecked !== null || disabling;

    const navigateToEdit = () => {
      navigate("edit");
    };
    const resendApproveEmail = () => {
      if (handleOpenAlert) {
        if (student?.afterWeekChecked) {
          handleOpenAlert("approve");
        } else {
          handleOpenAlert("disApprove");
        }
      }
    };

    return (
      <ButtonGroup
        variant="contained"
        color="secondary"
        size="large"
        aria-label="small button group"
        sx={{
          display: typeComp === "afterWeek" ? "show" : "none",
        }}
      >
        <Button disabled={!isDisabledEdit} onClick={resendApproveEmail}>
          ارسال مجدد ایمیل
        </Button>
        <Button onClick={navigateToEdit}>ویرایش</Button>
        <Button
          variant="contained"
          onClick={() => handleOpenAlert?.("approve")}
          disabled={isDisabled}
        >
          تایید کردن
        </Button>
        <Button
          variant="contained"
          onClick={() => handleOpenAlert?.("disApprove")}
          disabled={isDisabled}
        >
          رد کردن
        </Button>
      </ButtonGroup>
    );
  };

  return (
    <>
      {typeComp === "afterWeek" && (
        <LookUpLink student={student} id={id} refreshingPage={refreshingPage} />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          ...(typeComp === "student" && { display: "none" }),
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bolder", my: 5 }}>
          فرم ثبت نام هفته پذیرش
        </Typography>

        <ButtonGroupComp />
      </Box>
      {/* فرم ثبت نام هفته پذیرش */}
      <LayoutReg
        colorActive={
          student.afterWeekChecked || successObject === "afterWeekChecked"
        }
        title=" نتیجه کارگاه معارفه"
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="وضعیت شرکت در کارگاه معارفه"
                  secondary={student.workshopCont}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="اطلاع از برنامه هفته پذیرش کاریار و شرکت در آن"
                  secondary={student.notifyAcceptWeek}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="انتخاب اولیه مسیر شغلی"
                  secondary={
                    student.firstSelectJobRoad?.trim() === "other"
                      ? "سایر"
                      : getLabel(student.firstSelectJobRoad, SelectedFieldOpt)
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
                  secondary={student.comLevelResult}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نتیجه تعیین سطح زبان انگلیسی"
                  secondary={student.langScore}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="تعیین سطح الگوریتم و ریاضی"
                  secondary={student.algoScore}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نمره مهارت‌های پایه"
                  secondary={student.fundamentalSkillsScore}
                />
              </ListItem>
              <ListItem
                sx={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <ListItemText primary="عکس فیش واریزی" />
                <ImageManager
                  propImage={student.paymentImageAddress}
                  id={id}
                  checked={student.afterWeekChecked} //Disabling the button for those who have been approved
                  removeLink="/exam/after/week/image/payment"
                  uploadLink="/exam/after/week/image/payment/upload"
                  buttonsActivation={typeComp !== "afterWeek"}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/* کارنامه هفته پذیرش */}
      <LayoutReg
        title="کارنامه هفته پذیرش"
        colorActive={
          student.afterWeekChecked || successObject === "afterWeekChecked"
        }
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="نتیجه تعیین سطح الگوریتم"
                  secondary={student.algoLevelResult}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="وضعیت حضور و غیاب"
                  secondary={student.presentStatus}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/* نظرات سرگروه */}
      <LayoutReg
        title="نظرات سرگروه"
        colorActive={
          student.afterWeekChecked || successObject === "afterWeekChecked"
        }
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="اختصاص زمان کافی به کاریار"
                  secondary={student.consistCompleteTime}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="وضعیت دسترسی به کامپیوتر و اینترنت"
                  secondary={student.comAccessStatus}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="پیش بینی ریزش"
                  secondary={student.predict}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="تعهد به کار"
                  secondary={student.jobCommit}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="رشته پیشنهادی سرگروه"
                  secondary={student.recommendField}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="سایر ریسک‌ها و محدودیت‌ها"
                  secondary={student.etcDesc}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/* نظرات منتور */}
      <LayoutReg
        title="نظرات منتور"
        colorActive={
          student.afterWeekChecked || successObject === "afterWeekChecked"
        }
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="اختصاص زمان کافی به کاریار"
                  secondary={student.consistTime}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="رشته پیشنهادی منتور"
                  secondary={student.recommendFieldMentor}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="تعهد به کار"
                  secondary={student.workCommit}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="سایر ریسک‌ها و محدودیت‌ها"
                  secondary={student.limitAndRisk}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/* <ContentBox
        colorActive={
          student.afterWeekChecked || successObject === "afterWeekChecked"
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
                  secondary={student.ethics}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </ContentBox> */}

      {/* link after week student to moodle student */}
      {/* {type && (
        <FinalResult
          approvedStu={student.afterWeekChecked}
          finalResult={student.finalResult}
          id={id}
        />
      )} */}
      {/* نهایی */}
      <Typography variant="h6" sx={{ fontWeight: "bolder", my: 5 }}>
        نتیجه نهایی
      </Typography>
      <LayoutReg>
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText secondary={student.finalResult} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      <Typography variant="h6" sx={{ fontWeight: "bolder", my: 5 }}>
        ثبت نام نهایی
      </Typography>
      <LayoutReg
        colorActive={
          student.afterWeekChecked || successObject === "afterWeekChecked"
        }
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="بورسیه دارد؟"
                  secondary={student.scholar ? "بله" : "خیر"}
                />
              </ListItem>
              {student.scholar && (
                <ListItem>
                  <ListItemText
                    primary="درصد بورسیه"
                    secondary={student.scholarPercentage}
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
                  secondary={student.finalField}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="مسیر آموزشی"
                  secondary={student.careerPathway?.name || "-"}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 5,
        }}
      >
        <ButtonGroupComp />
      </Box>
    </>
  );
};

export default AfterWeekDetailShowComp;
