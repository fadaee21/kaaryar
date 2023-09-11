import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  List,
  ListItem,
  MenuItem,
} from "@mui/material";
import Select from "@mui/material/Select";
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
import { PropEditBool, PropEditCombo, PropEditString } from "../../model";
import MultiSelection from "./MultiSelection";
const BeforeWeekEditComp: React.FC<ExamStudent> = ({
  student,
  handleChange,
  setCompFamCheckBox,
  setNoneJobActivationCheckBox,
}) => {
  return (
    <>
      {/*اطلاعات تحصیلی*/}
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <EditCombo
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
            <EditCombo
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
          <EditBoolean
            placeholder="در حال حاضر مشغول به تحصیل هستید؟"
            identifier="isCurrentlyStudent"
            value={student?.isCurrentlyStudent}
            handleChange={handleChange}
          />
          {student?.isCurrentlyStudent && (
            <>
              <EditCombo
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
        </Grid>
      </Grid>
      {/*وضعیت اشتغال*/}
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <EditCombo
              placeholder="وضعیت فعلی اشتغال"
              identifier="jobStatus"
              options={jobStatusOpt}
              value={student?.jobStatus}
              handleChange={handleChange}
            />
            {student?.jobStatus ? (
              <>
                <EditCombo
                  options={employmentTypeOpt}
                  handleChange={handleChange}
                  identifier="employmentType"
                  placeholder="نوع کار"
                  value={student?.employmentType}
                />
                <EditCombo
                  placeholder="متوسط حقوق ماهیانه"
                  identifier="avgSalary"
                  options={avgSalaryOpt}
                  value={student?.avgSalary}
                  handleChange={handleChange}
                />
                <EditCombo
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

            <EditCombo
              options={accessTimeOpt}
              value={student?.accessTime || ""}
              handleChange={handleChange}
              identifier="accessTime"
              placeholder="وقت آزاد برای مطالعه و تمرین های کاریار"
            />
            {/* <EditCombo
              placeholder="وقت آزاد روزانه"
              identifier="freeDailyTime"
              options={freeDailyTimeOpt}
              value={student?.freeDailyTime}
              handleChange={handleChange}
            /> */}
          </List>
        </Grid>
      </Grid>
      {/*دسترسی به کامپیوتر*/}
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
            <EditCombo
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
            <EditCombo
              options={internetAccessTimingOpt}
              value={student?.internetAccessTiming || ""}
              handleChange={handleChange}
              identifier="internetAccessTiming"
              placeholder="ساعات دسترسی به اینترنت"
            />
            <EditCombo
              options={internetAccessOpt}
              value={student?.internetAccessDevice || ""}
              handleChange={handleChange}
              identifier="internetAccessDevice"
              placeholder="ابزار دسترسی به اینترنت"
            />
          </List>
        </Grid>
      </Grid>
      {/*مدیریت زمان*/}
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <EditCombo
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
            <EditCombo
              placeholder="انگیزه ورود به کاریار"
              identifier="motivation"
              options={motivationOpt}
              value={student?.motivation}
              handleChange={handleChange}
            />
          </List>
        </Grid>
      </Grid>
      {/*مهارت های پایه*/}
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <EditCombo
              options={questionCityOpt}
              value={student?.questionCity || ""}
              handleChange={handleChange}
              identifier="questionCity"
              placeholder="آتشنشان در شهر خیالی"
            />
            <EditCombo
              options={questionNumbersOpt}
              value={student?.questionNumbers || ""}
              handleChange={handleChange}
              identifier="questionNumbers"
              placeholder="تعداد یک بین 100 تا 200"
            />
            <EditCombo
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
            <EditCombo
              options={questionStudentsOpt}
              handleChange={handleChange}
              value={student?.questionStudents || ""}
              identifier="questionStudents"
              placeholder="محاسبه نرخ اشتغال"
            />
            <EditCombo
              options={questionDiametersOpt}
              handleChange={handleChange}
              value={student?.questionDiameters || ""}
              identifier="questionDiameters"
              placeholder="تعداد قطر هفت ضلعی"
            />
            <EditCombo
              options={questionWordsOpt}
              handleChange={handleChange}
              value={student?.questionWords || ""}
              identifier="questionWords"
              placeholder="حرف ایجادی از اشکال"
            />
            <EditCombo
              options={questionEnglishFamiliarityOpt}
              handleChange={handleChange}
              value={student?.questionEnglishFamiliarity || ""}
              identifier="questionEnglishFamiliarity"
              placeholder="میزان آشنایی با زبان انگلیسی"
            />
          </List>
        </Grid>
      </Grid>
      {/*سرفصل های ریاضی*/}
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <EditCombo
              options={mathOpt}
              value={student?.levelDiscreteMath || ""}
              handleChange={handleChange}
              identifier="levelDiscreteMath"
              placeholder="میزان آشنایی با ریاضیات گسسته"
            />
            <EditCombo
              options={mathOpt}
              value={student?.levelLinearAlgebra || ""}
              handleChange={handleChange}
              identifier="levelLinearAlgebra"
              placeholder="میزان آشنایی با جبر خطی"
            />
            <EditCombo
              options={mathOpt}
              value={student?.levelProbabilities || ""}
              handleChange={handleChange}
              identifier="levelProbabilities"
              placeholder="میزان آشنایی با آمار و احتمال"
            />
            <EditCombo
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
            <EditCombo
              options={mathOpt}
              value={student?.levelAlgorithms || ""}
              handleChange={handleChange}
              identifier="levelAlgorithms"
              placeholder="میزان آشنایی با الگوریتم"
            />
            <EditCombo
              options={mathOpt}
              value={student?.levelDataStructures || ""}
              handleChange={handleChange}
              identifier="levelDataStructures"
              placeholder="میزان آشنایی با ساختارهای داده"
            />
            <EditCombo
              options={mathOpt}
              value={student?.levelLogics || ""}
              handleChange={handleChange}
              identifier="levelLogics"
              placeholder="میزان آشنایی با منطق (Logic)"
            />
          </List>
        </Grid>
      </Grid>
      {/*توضیحات*/}
      {/*ارزیابی قبل از پذیرش*/}
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

              <EditCombo
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
    </>
  );
};

export default BeforeWeekEditComp;

const EditString = ({
  placeholder,
  identifier,
  value,
  handleChange,
}: PropEditString) => {
  const content = (
    <ListItem>
      <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
        <InputLabel htmlFor={identifier}>{placeholder}</InputLabel>
        <Input
          id={identifier}
          value={value}
          onChange={handleChange}
          name={identifier}
        />
      </FormControl>
    </ListItem>
  );
  return content;
};

const EditCombo = ({
  placeholder,
  identifier,
  value,
  handleChange,
  options,
}: PropEditCombo) => {
  const content = (
    <ListItem>
      <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
        <InputLabel id={identifier}>{placeholder}</InputLabel>
        <Select
          labelId={identifier}
          id={identifier}
          onChange={handleChange}
          name={identifier}
          value={value}
        >
          {options.map((option: any, i: any) => (
            <MenuItem key={i} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ListItem>
  );

  return content;
};

const EditBoolean = ({
  placeholder,
  handleChange,
  identifier,
  value,
}: PropEditBool) => {
  const content = (
    <ListItem>
      <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
        <InputLabel htmlFor={identifier}>{placeholder}</InputLabel>
        <Select
          labelId={identifier}
          id={identifier}
          onChange={handleChange}
          name={identifier}
          value={value}
        >
          <MenuItem value={true as any}>بله</MenuItem>
          <MenuItem value={false as any}>خیر</MenuItem>
        </Select>
      </FormControl>
    </ListItem>
  );
  return content;
};
