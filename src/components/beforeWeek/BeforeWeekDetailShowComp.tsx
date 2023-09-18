import {
  Button,
  ButtonGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BeforeWeekType, TypeComp } from "../../model";
import {
  accessTimeOpt,
  employmentTimeCommitmentOpt,
  getEng,
  getMath,
  internetAccessOpt,
  internetAccessTimingOpt,
  motivationOpt,
  questionCityOpt,
} from "./helper";
import { getLabel } from "../../utils/getLabel";
import ImageManager from "./ImageManager";
import LayoutReg from "../layout/LayoutReg";

interface ExamStudent {
  student: BeforeWeekType | undefined;
  id: string | undefined;
  //typeComp:help to check which page use and show or not show button group
  typeComp: TypeComp;
  successObject?: string;
  handleOpenAlert?: (alert: "approve" | "disApprove") => void;
}

const BeforeWeekDetailShow: React.FC<ExamStudent> = ({
  student,
  id,
  typeComp,
  successObject,
  handleOpenAlert,
}) => {
  const navigate = useNavigate();

  const ButtonGroupComp = () => {
    const isDisabled =
      student?.acceptWeekChecked !== null ||
      successObject === "acceptWeekChecked" ||
      typeComp !== "beforeWeek";

    const navigateToEdit = () => {
      navigate("edit");
    };

    return (
      <ButtonGroup
        variant="contained"
        color="secondary"
        size="large"
        aria-label="small button group"
        sx={{
          display: typeComp === "beforeWeek" ? "show" : "none",
        }}
        disabled={isDisabled}
      >
        <Button onClick={navigateToEdit}>ویرایش</Button>
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
    );
  };

  return (
    <>
      {/* header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          ...(typeComp === "student" && { display: "none" }),
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bolder", my: 5 }}>
          فرم آزمون (فرم درخواست ثبت نام دردوره های آموزشی مطعوف به اشتغال
          کاریار)
        </Typography>
        <ButtonGroupComp />
      </Box>
      {/*اطلاعات تحصیلی*/}
      <LayoutReg
        title="اطلاعات تحصیلی"
        colorActive={
          student?.acceptWeekChecked || successObject === "acceptWeekChecked"
        }
      >
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
                  primary="در حال حاضر مشغول به تحصیل هستید؟"
                  secondary={student?.isCurrentlyStudent ? "بله" : "خیر"}
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
                  primary="میانگین معدل آخرین مقطع تحصیلی"
                  secondary={student?.cgpa}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="تجربه یا استعداد تحصیلی"
                  secondary={student?.skills}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              {student?.isCurrentlyStudent && (
                <>
                  <ListItem>
                    <ListItemText
                      primary="نوع موسسه آموزشی که در حال حاضر درآن تحصیل می کنید"
                      secondary={student?.instituteCurrentType}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="نام موسسه آموزشی تحصیلات حال حاضر"
                      secondary={student?.currentInstName}
                    />
                  </ListItem>
                  {/* <ListItem>
                    <ListItemText
                      primary="رشته تحصیلی فعلی"
                      secondary={student?.currentField}
                    />
                  </ListItem> */}
                </>
              )}
              <ListItem
                sx={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <ListItemText primary="کارنامه تحصیلی" />
                {/* {pic && (
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
                )} */}
                <ImageManager
                  propImage={student?.transcriptImageAddress}
                  id={id}
                  checked={student?.acceptWeekChecked} //Disabling the button for those who have been approved
                  removeLink="/exam/before/week/image/transcript"
                  uploadLink="/exam/before/week/image/transcript/upload"
                  buttonsActivation={typeComp !== "beforeWeek"}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/*وضعیت اشتغال*/}
      <LayoutReg title="وضعیت اشتغال" colorActive={student?.acceptWeekChecked}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="وضعیت فعلی اشتغال"
                  secondary={
                    student?.jobStatus
                      ? "مشغول کار منجر به درآمد هستم"
                      : "مشغول کار منجر به درآمد نیستم"
                  }
                />
              </ListItem>
              {student?.jobStatus ? (
                <>
                  <ListItem>
                    <ListItemText
                      primary="نوع کار"
                      secondary={student?.employmentType}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="متوسط حقوق ماهیانه "
                      secondary={student?.avgSalary}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="زمان صرف شده برای کار"
                      secondary={getLabel(
                        student?.employmentTimeCommitment,
                        employmentTimeCommitmentOpt
                      )}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="نوع و سمت شغلی"
                      secondary={student?.jobTitle}
                    />
                  </ListItem>
                </>
              ) : (
                <ListItem>
                  <ListItemText
                    primary="مشغولیت‌های فعلی"
                    secondary={
                      Array.isArray(student?.noneJobActivation)
                        ? student?.noneJobActivation.map((item, index) =>
                            !item.includes("همه موارد") ? (
                              <Typography
                                sx={{ display: "block" }}
                                component="span"
                                variant="subtitle2"
                                key={index}
                              >
                                {item}
                              </Typography>
                            ) : (
                              <Typography
                                sx={{ display: "inline-block" }}
                                component="span"
                                variant="subtitle2"
                                key={index}
                              >
                                همه موارد
                              </Typography>
                            )
                          )
                        : student?.noneJobActivation
                    }
                  />
                </ListItem>
              )}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                {/* <ListItemText
                  primary="وقت آزاد روزانه"
                  secondary={student?.freeDailyTime}
                /> */}
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="چشم انداز شغلی دوسال آینده"
                  secondary={student?.jobVision}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="وقت آزاد برای مطالعه و تمرین های کاریار"
                  secondary={getLabel(student?.accessTime, accessTimeOpt)}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="آشنایی با مشاغل مرتبط با برنامه نویسی و طراحی وب"
                  secondary={student?.webDevFamiliarity}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="آمادگی اشتغال به محض اتمام دوره کاریار"
                  secondary={student?.jobStandby ? "بله" : "خیر"}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/*دسترسی به کامپیوتر*/}

      <LayoutReg
        title="دسترسی به کامپیوتر"
        colorActive={student?.acceptWeekChecked}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="آشنایی کار با کامپیوتر"
                  secondary={student?.computerFamiliarity?.map((item, index) =>
                    !item.includes("همه موارد") ? (
                      <Typography
                        sx={{ display: "inline-block" }}
                        component="span"
                        variant="subtitle2"
                        key={index}
                      >
                        {item}
                      </Typography>
                    ) : (
                      <Typography
                        sx={{ display: "inline-block" }}
                        component="span"
                        variant="subtitle2"
                        key={index}
                      >
                        همه موارد
                      </Typography>
                    )
                  )}
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
                  primary="آیا تا به حال  دوره آموزشی  در ارتباط با مهارت های کامپیوتر یا کدنویسی گذرانده اید؟"
                  secondary={student?.codingKnowledge}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="ابزار دسترسی به اینترنت"
                  secondary={getLabel(
                    student?.internetAccessDevice,
                    internetAccessOpt
                  )}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="ساعات دسترسی به اینترنت"
                  secondary={getLabel(
                    student?.internetAccessTiming,
                    internetAccessTimingOpt
                  )}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/*مدیریت زمان*/}
      <LayoutReg title="مدیریت زمان" colorActive={student?.acceptWeekChecked}>
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
                  secondary={getLabel(student?.motivation, motivationOpt)}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/*مهارت های پایه*/}

      <LayoutReg
        title="مهارت های پایه"
        colorActive={student?.acceptWeekChecked}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="آتشنشان در شهر خیالی"
                  secondary={getLabel(student?.questionCity, questionCityOpt)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="تعداد یک بین 100 تا 200"
                  secondary={student?.questionNumbers}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="تعداد صفر حاصل ضرب یک تا 50"
                  secondary={student?.questionMultiplication}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="میزان آشنایی با زبان انگلیسی"
                  secondary={getEng(
                    Number(student?.questionEnglishFamiliarity)
                  )}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="محاسبه نرخ اشتغال"
                  secondary={student?.questionStudents}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="تعداد قطر هفت ضلعی"
                  secondary={student?.questionDiameters}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="حرف ایجادی از اشکال"
                  secondary={student?.questionWords}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={8}>
            <List>
              <ListItem>
                <ListItemText
                  primary="یک پاراگراف درباره خود به انگلیسی"
                  secondary={
                    <Typography
                      sx={{ textAlign: "right", textIndent: 8 }}
                      dir="ltr"
                    >
                      {student?.engPara}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/*سرفصل های ریاضی*/}
      <LayoutReg
        title="سرفصل های ریاضی"
        colorActive={student?.acceptWeekChecked}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="ریاضیات گسسته"
                  secondary={getMath(student?.levelDiscreteMath)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="جبر خطی"
                  secondary={getMath(student?.levelLinearAlgebra)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="آمار و احتمال"
                  secondary={getMath(student?.levelProbabilities)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="فلوچارت"
                  secondary={getMath(student?.levelFlowDiagrams)}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="الگوریتم"
                  secondary={getMath(student?.levelAlgorithms)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="ساختارهای داده"
                  secondary={getMath(student?.levelDataStructures)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="منطق (Logic)"
                  secondary={getMath(student?.levelLogics)}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/*توضیحات*/}
      <LayoutReg colorActive={student?.acceptWeekChecked}>
        <Grid container>
          <Grid item xs={9}>
            <List>
              <ListItem>
                <ListItemText
                  primary="توضیحات"
                  secondary={student?.applicantAdditionalComments}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/*ارزیابی قبل از پذیرش*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bolder", my: 5 }}>
          ارزیابی قبل از پذیرش
        </Typography>
      </Box>
      <LayoutReg
        colorActive={
          student?.acceptWeekChecked || successObject === "acceptWeekChecked"
        }
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="میزان تحصیلات"
                  secondary={student?.registrationForm?.education}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نحوه آشنایی با کاریار"
                  secondary={student?.registrationForm?.familiarity}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="نام معرف/موسسه نیکوکاری"
                  secondary={student?.registrationForm?.refer}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="توضیحات ادمین"
                  secondary={student?.administrativeComments}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="انگیزه اصلی از شرکت در دوره"
                  secondary={student?.motivation ?? "-"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="آمادگی اشتغال به محض اتمام دوره کاریار"
                  secondary={student?.jobStandby ? "بله" : "خیر"}
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

export default BeforeWeekDetailShow;
