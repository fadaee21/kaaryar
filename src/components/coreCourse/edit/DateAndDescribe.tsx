import {
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { JalaliDatePicker } from "../../comment/JalaliDatePicker";
type LiftUpStateType = {
  [index: string]: string | undefined;
};
interface Props {
  setLiftState: React.Dispatch<React.SetStateAction<LiftUpStateType>>;
  startDate: string | undefined;
  endDate: string | undefined;
  description: string | undefined;
  numberOfHours: string | undefined;
  subType?: string;
}
const DateAndDescribe = ({
  setLiftState,
  startDate,
  endDate,
  description,
  numberOfHours,
  subType,
}: Props) => {
  const [startDateState, setStartDateState] = useState<any>(
    startDate ? new Date(startDate) : null
  );
  const [endDateState, setEndDateState] = useState<any>(
    endDate ? new Date(endDate) : null
  );
  const [descriptionState, setDescriptionState] = useState(
    description || undefined
  );
  const [numberOfHoursState, setNumberOfHoursState] = useState<string>(
    numberOfHours || ""
  );
  useEffect(() => {
    setLiftState({
      startDateState,
      endDateState,
      descriptionState,
      numberOfHoursState,
    });
  }, [
    startDateState,
    endDateState,
    descriptionState,
    numberOfHoursState,
    setLiftState,
  ]);

  return (
    <>
      {subType === "workshop" ? (
        <Grid item xs={12} md={6}>
          <Stack>
            <JalaliDatePicker
              setSessionDate={setStartDateState}
              sessionDate={startDateState}
              label="تاریخ برگزاری"
            />
          </Stack>
        </Grid>
      ) : (
        <>
          <Grid item xs={12} md={6}>
            <Stack>
              <JalaliDatePicker
                setSessionDate={setStartDateState}
                sessionDate={startDateState}
                label="تاریخ شروع آموزش دوره"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <JalaliDatePicker
                setSessionDate={setEndDateState}
                sessionDate={endDateState}
                label="تاریخ پایان آموزش دوره"
              />
            </Stack>
          </Grid>
        </>
      )}

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="numberOfHours">تعداد ساعات دوره</InputLabel>
          <OutlinedInput
            id="numberOfHours"
            label="تعداد ساعات دوره"
            value={numberOfHoursState}
            onChange={(e) => setNumberOfHoursState(e.target.value)}
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
            value={descriptionState}
            onChange={(e) => setDescriptionState(e.target.value)}
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default DateAndDescribe;
