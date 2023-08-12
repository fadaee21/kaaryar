import InterpersonalFieldsAndEnglish from "./VocationalFieldsAndEnglish";
import { ComboBoxAddCourse } from "../../pages/addNewCourse/ComboBoxAddCourse";
import {
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { JalaliDatePicker } from "../comment/JalaliDatePicker";

interface Props {
  setLiftUpState: any;
  statusCourseOpt: any;
  setTeachingStatus: any;
  teachingStatus: any;
  errMsg: any;
  setStartDate: any;
  startDate: any;
  setEndDate: any;
  endDate: any;
  numberOfHours: any;
  setNumberOfHours: any;
  description: any;
  setDescription: any;
  nonLmsInstructors: any;
  setNonLmsInstructors: any;
}

const EnglishFields = ({
  setLiftUpState,
  statusCourseOpt,
  setTeachingStatus,
  teachingStatus,
  errMsg,
  setStartDate,
  startDate,
  setEndDate,
  endDate,
  numberOfHours,
  setNumberOfHours,
  description,
  setDescription,
  nonLmsInstructors,
  setNonLmsInstructors,
}: Props) => {
  return (
    <>
      <InterpersonalFieldsAndEnglish setLiftUpState={setLiftUpState} />
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="description">نام مدرس(ها)</InputLabel>
          <OutlinedInput
            id="nonLmsInstructors"
            label="نام مدرس(ها)"
            value={nonLmsInstructors}
            onChange={(e) => setNonLmsInstructors(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack>
          <JalaliDatePicker
            setSessionDate={setStartDate}
            sessionDate={startDate}
            label="تاریخ شروع آموزش دوره"
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack>
          <JalaliDatePicker
            setSessionDate={setEndDate}
            sessionDate={endDate}
            label="تاریخ پایان آموزش دوره"
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <ComboBoxAddCourse
          label="وضعیت دوره"
          identifier="statusCourse"
          options={statusCourseOpt}
          handleChange={(e) => setTeachingStatus(e.target.value)}
          val={teachingStatus}
          error={!teachingStatus && errMsg}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="numberOfHours">تعداد ساعات دوره</InputLabel>
          <OutlinedInput
            id="numberOfHours"
            label="تعداد ساعات دوره"
            value={numberOfHours}
            onChange={(e) => setNumberOfHours(e.target.value)}
            type="number"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="description">توضیحات</InputLabel>
          <OutlinedInput
            id="description"
            label="توضیحات"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default EnglishFields;
