import React from "react";
import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
} from "@mui/material";
import { AfterWeekType, PropEditCombo, PropEditString } from "../../model";
import { SelectedFieldOpt, fieldOptions, finalResults } from "../search/searchOptions";
import {
  comAccessStatusOpt,
  notifyAcceptWeekOpt,
  presentStatusOpt,
  recommendFieldOpt,
  recommendFieldMentorOpt,
  scholarOpt,
  workshopContOpt,
  yesOrNo,
} from "./helper";

interface AfterWeekStudentEdit {
  student: AfterWeekType | null;
  handleChange: (e: any) => void;
}

const AfterWeekDetailEditComp: React.FC<AfterWeekStudentEdit> = ({
  student,
  handleChange,
}) => {
  return (
    <>
      {/* فرم ثبت نام هفته پذیرش */}
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <EditCombo
              handleChange={handleChange}
              identifier="workshopCont"
              options={workshopContOpt}
              placeholder="وضعیت شرکت در کارگاه معارفه"
              value={student?.workshopCont}
            />
            <EditCombo
              handleChange={handleChange}
              identifier="notifyAcceptWeek"
              options={notifyAcceptWeekOpt}
              placeholder="اطلاع از برنامه هفته پذیرش کاریار و شرکت در آن"
              value={student?.notifyAcceptWeek}
            />
            <EditCombo
              handleChange={handleChange}
              identifier="firstSelectJobRoad"
              placeholder="انتخاب اولیه مسیر شغلی"
              options={SelectedFieldOpt}
              value={student?.firstSelectJobRoad || ""}
            />
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <EditString
              handleChange={handleChange}
              identifier="comLevelResult"
              placeholder="نتیجه تعیین سطح کامپیوتر"
              value={student?.comLevelResult || ""}
            />
            <EditString
              handleChange={handleChange}
              identifier="langScore"
              placeholder="نتیجه تعیین سطح زبان انگلیسی"
              value={student?.langScore || ""}
            />
            <EditString
              handleChange={handleChange}
              identifier="algoScore"
              placeholder="تعیین سطح الگوریتم و ریاضی"
              value={student?.algoScore || ""}
            />
            {/* <EditString
              handleChange={handleChange}
              identifier="comLevelResult"
              placeholder="نمره مهارت‌های پایه--"
              value={student?.comLevelResult || ""}
            /> */}
          </List>
        </Grid>
      </Grid>
      {/* کارنامه هفته پذیرش */}
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <EditString
              handleChange={handleChange}
              identifier="algoLevelResult"
              placeholder="نتیجه تعیین سطح الگوریتم"
              value={student?.algoLevelResult || ""}
            />
            <EditCombo
              options={presentStatusOpt}
              handleChange={handleChange}
              identifier="presentStatus"
              placeholder="وضعیت حضور و غیاب"
              value={student?.presentStatus || ""}
            />
          </List>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <List></List>
        </Grid> */}
      </Grid>
      {/* نظرات سرگروه */}
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <EditCombo
              placeholder="اختصاص زمان کافی به کاریار - سرگروه"
              handleChange={handleChange}
              identifier="consistCompleteTime"
              value={student?.consistCompleteTime}
              options={yesOrNo}
            />
            <EditCombo
              placeholder="وضعیت دسترسی به کامپیوتر و اینترنت"
              handleChange={handleChange}
              identifier="comAccessStatus"
              value={student?.comAccessStatus}
              options={comAccessStatusOpt}
            />
            <EditString
              placeholder="پیش بینی ریزش"
              handleChange={handleChange}
              identifier="predict"
              value={student?.predict || ""}
            />
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <EditCombo
              placeholder="تعهد به کار- سرگروه"
              handleChange={handleChange}
              identifier="jobCommit"
              value={student?.jobCommit}
              options={yesOrNo}
            />
            <EditCombo
              placeholder="رشته پیشنهادی سرگروه"
              handleChange={handleChange}
              identifier="recommendField"
              value={student?.recommendField}
              options={recommendFieldOpt}
            />
            <EditString
              placeholder="سایر ریسک‌ها و محدودیت‌ها - سرگروه"
              handleChange={handleChange}
              identifier="etcDesc"
              value={student?.etcDesc || ""}
            />
          </List>
        </Grid>
      </Grid>
      {/* نظرات منتور */}
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <EditCombo
              handleChange={handleChange}
              value={student?.consistTime}
              placeholder="اختصاص زمان کافی به کاریار"
              options={yesOrNo}
              identifier="consistTime"
            />
            <EditCombo
              handleChange={handleChange}
              value={student?.recommendFieldMentor}
              placeholder="رشته پیشنهادی منتور"
              options={recommendFieldMentorOpt}
              identifier="recommendFieldMentor"
            />
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <EditCombo
              handleChange={handleChange}
              value={student?.workCommit}
              placeholder="تعهد به کار"
              identifier="workCommit"
              options={yesOrNo}
            />
            <EditString
              handleChange={handleChange}
              value={student?.limitAndRisk || ""}
              placeholder="سایر ریسک‌ها و محدودیت‌ها"
              identifier="limitAndRisk"
            />
          </List>
        </Grid>
      </Grid>
      {/* نهایی */}
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <EditCombo
              handleChange={handleChange}
              placeholder="نتیجه نهایی"
              options={finalResults}
              value={student?.finalResult}
              identifier="finalResult"
            />
          </List>
        </Grid>
      </Grid>
      <Grid container rowGap={5} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <List>
            <EditCombo
              handleChange={handleChange}
              identifier="scholar"
              value={student?.scholar ?? ""}
              placeholder="بورسیه دارد؟"
              options={scholarOpt}
            />
            {student?.scholar && (
              <EditString
                handleChange={handleChange}
                value={student?.scholarPercentage || ""}
                placeholder="درصد بورسیه"
                identifier="scholarPercentage"
              />
            )}

            <EditCombo
              handleChange={handleChange}
              identifier="finalField"
              value={student?.finalField ?? ""}
              options={fieldOptions}
              placeholder="رشته نهایی"
            />
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default AfterWeekDetailEditComp;

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

// const EditBoolean = ({
//   placeholder,
//   handleChange,
//   identifier,
//   value,
// }: PropEditBool) => {
//   const content = (
//     <ListItem>
//       <FormControl fullWidth sx={{ width: "40ch" }} variant="standard">
//         <InputLabel htmlFor={identifier}>{placeholder}</InputLabel>
//         <Select
//           labelId={identifier}
//           id={identifier}
//           onChange={handleChange}
//           name={identifier}
//           value={value}
//         >
//           <MenuItem value={true as any}>بله</MenuItem>
//           <MenuItem value={false as any}>خیر</MenuItem>
//         </Select>
//       </FormControl>
//     </ListItem>
//   );
//   return content;
// };
