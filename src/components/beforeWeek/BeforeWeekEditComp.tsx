import {
  Grid,
  List,
} from "@mui/material";
import {
  ExamStudent,
  instituteTypeOpt,
  instituteTypeCurrentOpt,
  jobStatusOpt,
  avgSalaryOpt,
  accessTimeOpt,
  computerAccessOpt,
  limitTimeOpt,
  motivationOpt,
  computerFamiliarityOpt,
  questionCityOpt,
  questionNumbersOpt,
  questionMultiplicationOpt,
  questionStudentsOpt,
  questionDiametersOpt,
  questionWordsOpt,
  cgpaOpt,
  questionEnglishFamiliarityOpt,
  mathOpt,
  internetAccessOpt,
  employmentTypeOpt,
  employmentTimeCommitmentOpt,
  noneJobActivationOpt,
  internetAccessTimingOpt,
} from "./helper";
import MultiSelection from "./MultiSelection";
import { EditingSelective } from "../ui-comp/EditingSelective";
import EditString from "../ui-comp/EditString";
import EditBoolean from "../ui-comp/EditBoolean";
import LayoutReg from "../layout/LayoutReg";
const BeforeWeekEditComp: React.FC<ExamStudent> = ({
  student,
  handleChange,
  setCompFamCheckBox,
  setNoneJobActivationCheckBox,
}) => {
  return (
    <>
      {/*اطلاعات تحصیلی*/}

      <LayoutReg title="اطلاعات تحصیلی">
        <Grid container rowGap={5} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                placeholder="نوع موسسه آموزشی آخرین مقطع تحصیلی"
                identifier="instituteType"
                options={instituteTypeOpt}
                value={student?.instituteType}
                handleChange={handleChange}
              />

              <EditString
                placeholder="نام موسسه آموزشی آخرین مقطع تحصیلی"
                identifier="lastInstitute"
                value={student?.lastInstitute || ""}
                handleChange={handleChange}
              />
              <EditingSelective
                options={cgpaOpt}
                placeholder="میانگین معدل آخرین مقطع تحصیلی"
                identifier="cgpa"
                value={student?.cgpa || ""}
                handleChange={handleChange}
              />
              <EditString
                placeholder="تجربه یا استعداد تحصیلی"
                identifier="skills"
                value={student?.skills || ""}
                handleChange={handleChange}
              />
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <EditBoolean
                placeholder="در حال حاضر مشغول به تحصیل هستید؟"
                identifier="isCurrentlyStudent"
                value={student?.isCurrentlyStudent}
                handleChange={handleChange}
              />
              {student?.isCurrentlyStudent && (
                <>
                  <EditingSelective
                    placeholder="نوع موسسه آموزشی که در حال حاضر درآن تحصیل می کنید"
                    identifier="instituteCurrentType"
                    options={instituteTypeCurrentOpt}
                    value={student?.instituteCurrentType}
                    handleChange={handleChange}
                  />
                  <EditString
                    handleChange={handleChange}
                    identifier="currentInstName"
                    placeholder="نام موسسه آموزشی تحصیلات حال حاضر"
                    value={student?.currentInstName || ""}
                  />
                  {/* <EditString
                handleChange={handleChange}
                identifier="currentField"
                placeholder="رشته تحصیلی فعلی"
                value={student?.currentField || ""}
              /> */}
                </>
              )}
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/*وضعیت اشتغال*/}
      <LayoutReg title="وضعیت اشتغال">
        <Grid container rowGap={5} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                placeholder="وضعیت فعلی اشتغال"
                identifier="jobStatus"
                options={jobStatusOpt}
                value={student?.jobStatus}
                handleChange={handleChange}
              />
              {student?.jobStatus ? (
                <>
                  <EditingSelective
                    options={employmentTypeOpt}
                    handleChange={handleChange}
                    identifier="employmentType"
                    placeholder="نوع کار"
                    value={student?.employmentType}
                  />
                  <EditingSelective
                    placeholder="متوسط حقوق ماهیانه"
                    identifier="avgSalary"
                    options={avgSalaryOpt}
                    value={student?.avgSalary}
                    handleChange={handleChange}
                  />
                  <EditingSelective
                    options={employmentTimeCommitmentOpt}
                    handleChange={handleChange}
                    identifier="employmentTimeCommitment"
                    value={student?.employmentTimeCommitment || ""}
                    placeholder="زمان صرف شده برای کار"
                  />
                  <EditString
                    handleChange={handleChange}
                    identifier="jobTitle"
                    placeholder="نوع و سمت شغلی"
                    value={student?.jobTitle || ""}
                  />
                </>
              ) : (
                <MultiSelection
                  setVal={setNoneJobActivationCheckBox}
                  studentResponse={student?.noneJobActivation}
                  label="مشغولیت های فعلی"
                  identifier="noneJobActivation"
                  options={noneJobActivationOpt}
                  valueOfSelectAll={4}
                />
              )}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <EditBoolean
                handleChange={handleChange}
                identifier="jobStandby"
                value={student?.jobStandby ?? ""}
                placeholder="آمادگی اشتغال به محض اتمام دوره کاریار"
              />
              <EditString
                handleChange={handleChange}
                identifier="webDevFamiliarity"
                placeholder="آشنایی با مشاغل مرتبط با برنامه نویسی و طراحی وب"
                value={student?.webDevFamiliarity || ""}
              />
              <EditString
                handleChange={handleChange}
                identifier="jobVision"
                placeholder="چشم انداز شغلی دوسال آینده"
                value={student?.jobVision || ""}
              />

              <EditingSelective
                options={accessTimeOpt}
                value={student?.accessTime || ""}
                handleChange={handleChange}
                identifier="accessTime"
                placeholder="وقت آزاد برای مطالعه و تمرین های کاریار"
              />
              {/* <EditingSelective
              placeholder="وقت آزاد روزانه"
              identifier="freeDailyTime"
              options={freeDailyTimeOpt}
              value={student?.freeDailyTime}
              handleChange={handleChange}
            /> */}
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/*دسترسی به کامپیوتر*/}
      <LayoutReg title="دسترسی به کامپیوتر">
        <Grid container rowGap={5} sx={{ my: 2 }}>
          <Grid item md={12}>
            <List>
              <MultiSelection
                setVal={setCompFamCheckBox}
                studentResponse={student?.computerFamiliarity}
                label="آشنایی کار با کامپیوتر"
                identifier="computerFamiliarity"
                options={computerFamiliarityOpt}
                valueOfSelectAll={6}
              />
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                placeholder="میزان دسترسی به کامپیوتر"
                identifier="computerAccess"
                options={computerAccessOpt}
                value={student?.computerAccess}
                handleChange={handleChange}
              />
              <EditString
                handleChange={handleChange}
                identifier="codingKnowledge"
                value={student?.codingKnowledge || ""}
                placeholder="گذراندن دوره آموزشی در ارتباط با مهارت های کامپیوتر یا کدنویسی"
              />
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                options={internetAccessTimingOpt}
                value={student?.internetAccessTiming || ""}
                handleChange={handleChange}
                identifier="internetAccessTiming"
                placeholder="ساعات دسترسی به اینترنت"
              />
              <EditingSelective
                options={internetAccessOpt}
                value={student?.internetAccessDevice || ""}
                handleChange={handleChange}
                identifier="internetAccessDevice"
                placeholder="ابزار دسترسی به اینترنت"
              />
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/*مدیریت زمان*/}
      <LayoutReg title="مدیریت زمان">
        <Grid container rowGap={5} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                placeholder="محدودیت زمانی"
                identifier="limitTime"
                options={limitTimeOpt}
                value={student?.limitTime}
                handleChange={handleChange}
              />
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                placeholder="انگیزه ورود به کاریار"
                identifier="motivation"
                options={motivationOpt}
                value={student?.motivation}
                handleChange={handleChange}
              />
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/*مهارت های پایه*/}
      <LayoutReg title="مهارت های پایه">
        <Grid container rowGap={5} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                options={questionCityOpt}
                value={student?.questionCity || ""}
                handleChange={handleChange}
                identifier="questionCity"
                placeholder="آتشنشان در شهر خیالی"
              />
              <EditingSelective
                options={questionNumbersOpt}
                value={student?.questionNumbers || ""}
                handleChange={handleChange}
                identifier="questionNumbers"
                placeholder="تعداد یک بین 100 تا 200"
              />
              <EditingSelective
                options={questionMultiplicationOpt}
                value={student?.questionMultiplication || ""}
                handleChange={handleChange}
                identifier="questionMultiplication"
                placeholder="تعداد صفر حاصل ضرب یک تا 50"
              />
              <EditString
                value={student?.engPara || ""}
                handleChange={handleChange}
                identifier="engPara"
                placeholder="یک پاراگراف درباره خود به انگلیسی"
              />
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                options={questionStudentsOpt}
                handleChange={handleChange}
                value={student?.questionStudents || ""}
                identifier="questionStudents"
                placeholder="محاسبه نرخ اشتغال"
              />
              <EditingSelective
                options={questionDiametersOpt}
                handleChange={handleChange}
                value={student?.questionDiameters || ""}
                identifier="questionDiameters"
                placeholder="تعداد قطر هفت ضلعی"
              />
              <EditingSelective
                options={questionWordsOpt}
                handleChange={handleChange}
                value={student?.questionWords || ""}
                identifier="questionWords"
                placeholder="حرف ایجادی از اشکال"
              />
              <EditingSelective
                options={questionEnglishFamiliarityOpt}
                handleChange={handleChange}
                value={student?.questionEnglishFamiliarity || ""}
                identifier="questionEnglishFamiliarity"
                placeholder="میزان آشنایی با زبان انگلیسی"
              />
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/*سرفصل های ریاضی*/}
      <LayoutReg title="سرفصل های ریاضی">
        <Grid container rowGap={5} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                options={mathOpt}
                value={student?.levelDiscreteMath || ""}
                handleChange={handleChange}
                identifier="levelDiscreteMath"
                placeholder="میزان آشنایی با ریاضیات گسسته"
              />
              <EditingSelective
                options={mathOpt}
                value={student?.levelLinearAlgebra || ""}
                handleChange={handleChange}
                identifier="levelLinearAlgebra"
                placeholder="میزان آشنایی با جبر خطی"
              />
              <EditingSelective
                options={mathOpt}
                value={student?.levelProbabilities || ""}
                handleChange={handleChange}
                identifier="levelProbabilities"
                placeholder="میزان آشنایی با آمار و احتمال"
              />
              <EditingSelective
                options={mathOpt}
                value={student?.levelFlowDiagrams || ""}
                handleChange={handleChange}
                identifier="levelFlowDiagrams"
                placeholder="میزان آشنایی با فلوچارت"
              />
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <EditingSelective
                options={mathOpt}
                value={student?.levelAlgorithms || ""}
                handleChange={handleChange}
                identifier="levelAlgorithms"
                placeholder="میزان آشنایی با الگوریتم"
              />
              <EditingSelective
                options={mathOpt}
                value={student?.levelDataStructures || ""}
                handleChange={handleChange}
                identifier="levelDataStructures"
                placeholder="میزان آشنایی با ساختارهای داده"
              />
              <EditingSelective
                options={mathOpt}
                value={student?.levelLogics || ""}
                handleChange={handleChange}
                identifier="levelLogics"
                placeholder="میزان آشنایی با منطق (Logic)"
              />
            </List>
          </Grid>
        </Grid>
      </LayoutReg>
      {/*توضیحات*/}
      {/*ارزیابی قبل از پذیرش*/}
      <LayoutReg title="توضیحات">
        <Grid container rowGap={5} sx={{ my: 2 }}>
          {/* <Grid item xs={12} md={6}>
          <List>
            <EditString
              handleChange={handleChange}
              value={student?.familiar || ""}
              identifier="familiar"
              placeholder="نحوه آشنایی با کاریار"
            />

            <ListItem></ListItem>
          </List>
        </Grid> */}
          {/* <Grid item xs={12} md={6}>
          <List>
            <EditString
              handleChange={handleChange}
              value={student?.charity || ""}
              identifier="charity"
              placeholder="نام معرف/موسسه نیکوکاری"
            />
          </List>
        </Grid> */}
          <Grid item xs={12} md={6}>
            <List>
              <EditString
                handleChange={handleChange}
                value={student?.applicantAdditionalComments || ""}
                identifier="applicantAdditionalComments"
                placeholder="توضیحات"
              />
            </List>
          </Grid>
          <Grid container rowGap={5} sx={{ my: 2 }}>
            <Grid item xs={12} md={6}>
              <List>
                {/* <EditString
                handleChange={handleChange}
                value={student?.eduStatus || ""}
                identifier="eduStatus"
                placeholder="وضعیت تحصیلی"
              /> */}
                {/* <EditBoolean
                handleChange={handleChange}
                identifier="jobReady"
                value={student?.jobReady ?? ""}
                placeholder="آمادگی به کار بعد از اتمام دوره"
              />

              <EditingSelective
                options={motivationOpt}
                handleChange={handleChange}
                value={student?.motivationByAdmin || ""}
                identifier="motivationByAdmin"
                placeholder="انگیزه اصلی از شرکت در دوره"
              /> */}
                <EditString
                  handleChange={handleChange}
                  value={student?.administrativeComments || ""}
                  identifier="administrativeComments"
                  placeholder="توضیحات ادمین"
                />
              </List>
            </Grid>
          </Grid>
        </Grid>
      </LayoutReg>
    </>
  );
};

export default BeforeWeekEditComp;
