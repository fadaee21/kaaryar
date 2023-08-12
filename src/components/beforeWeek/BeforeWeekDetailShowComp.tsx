import {
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
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { BeforeWeekType } from "../../model";
import { ContentBox } from "../../styles/examFormDetail";
import { DetailTypography } from "../../styles/studentDetail";
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
import ImageModal from "../ImageModal";
import useGetImage from "../../hooks/request/useGetImage";

interface ExamStudent {
  student: BeforeWeekType | undefined;
  matches: boolean;
  id: string | undefined;
  //typeComp:help to check which page use and show or not show button group
  typeComp: "exam" | "admission" | "student";
  successObject?: string;
  handleOpenAlert?: (alert: "approve" | "disApprove") => void;
}

const BeforeWeekDetailShow: React.FC<ExamStudent> = ({
  student,
  matches,
  id,
  typeComp,
  successObject,
  handleOpenAlert,
}) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const roles = auth.roles.toString();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { pic, getPicture } = useGetImage("/exam/after/week/image/get");

  const transcript = student?.transcriptImageAddress;
  React.useEffect(() => {
    if (!transcript) {
      return;
    }
    getPicture(transcript);
  }, [getPicture, transcript]);

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
        {/* ButtonGroup */}
        <ButtonGroup
          variant="contained"
          color="secondary"
          size="large"
          aria-label="small button group"
          sx={{ ...(typeComp === "admission" && { display: "none" }) }}
          disabled={
            student?.acceptWeekChecked !== null ||
            successObject === "acceptWeekChecked"
              ? true
              : false
          }
        >
          <Button onClick={() => navigate(`/${roles}/before-week-edit/${id}`)}>
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
      </Box>
      {/*اطلاعات تحصیلی*/}
      <ContentBox
        colorActive={
          student?.acceptWeekChecked || successObject === "acceptWeekChecked"
        }
      >
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          اطلاعات تحصیلی
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
                  <ListItem>
                    <ListItemText
                      primary="رشته تحصیلی فعلی"
                      secondary={student?.currentField}
                    />
                  </ListItem>
                </>
              )}
              <ListItem
                sx={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <ListItemText primary="کارنامه تحصیلی" />
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
            </List>
          </Grid>
        </Grid>
      </ContentBox>
      {/*وضعیت اشتغال*/}
      <ContentBox colorActive={student?.acceptWeekChecked}>
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
      </ContentBox>
      {/*دسترسی به کامپیوتر*/}
      <ContentBox colorActive={student?.acceptWeekChecked}>
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          دسترسی به کامپیوتر
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
      </ContentBox>
      {/*مدیریت زمان*/}
      <ContentBox colorActive={student?.acceptWeekChecked}>
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
                  secondary={getLabel(student?.motivation, motivationOpt)}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </ContentBox>
      {/*مهارت های پایه*/}
      <ContentBox colorActive={student?.acceptWeekChecked}>
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          مهارت های پایه
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
      </ContentBox>
      {/*سرفصل های ریاضی*/}
      <ContentBox colorActive={student?.acceptWeekChecked}>
        <DetailTypography variant="h6" sx={{ minWidth: "14rem" }}>
          سرفصل های ریاضی
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
      </ContentBox>
      {/*توضیحات*/}
      <ContentBox colorActive={student?.acceptWeekChecked}>
        <DetailTypography
          variant="h6"
          sx={{ minWidth: "14rem" }}
        ></DetailTypography>
        <Divider
          variant="middle"
          flexItem
          orientation={matches ? "vertical" : "horizontal"}
        />
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
      </ContentBox>
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
      <ContentBox
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
                  secondary={student?.motivation}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="آمادگی به کار بعد از اتمام دوره--"
                  secondary={student?.jobStandby ? "بله" : "خیر"}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </ContentBox>
      {/* ButtonGroup */}
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
          sx={{
            ...((typeComp === "admission" || typeComp === "student") && {
              display: "none",
            }),
          }}
          disabled={
            student?.acceptWeekChecked !== null ||
            successObject === "acceptWeekChecked"
              ? true
              : false
          }
        >
          <Button onClick={() => navigate(`/${roles}/before-week-edit/${id}`)}>
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
            onClick={() => {
              handleOpenAlert && handleOpenAlert("disApprove");
            }}
          >
            رد کردن
          </Button>
        </ButtonGroup>
      </Box>
      <ImageModal pic={pic} open={open} handleClose={handleClose} />
    </>
  );
};

export default BeforeWeekDetailShow;
