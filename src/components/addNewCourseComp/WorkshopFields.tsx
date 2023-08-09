import {
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { JalaliDatePicker } from "../comment/JalaliDatePicker";

type LiftUpStateType = {
  [index: string]: string;
};
interface Prop {
  setLiftUpState: React.Dispatch<React.SetStateAction<LiftUpStateType>>;
  startDateProp: Date | null;
}

const WorkshopFields = ({ setLiftUpState, startDateProp }: Prop) => {
  const [weblinkLmsCourse, setWeblinkLmsCourse] = useState("");
  const [startDate, setStartDate] = useState<any>(
    startDateProp ? new Date(startDateProp) : null
  );
  const [endDate, setEndDate] = useState<any>(null);
  console.log(startDate);
  useEffect(() => {
    setLiftUpState({
      weblinkLmsCourse,
      startDate,
      endDate,
    });
  }, [weblinkLmsCourse, startDate, setLiftUpState, endDate]);
  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  return (
    <>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="instructors-amount">
            محتوای دوره (لینک به دوره در LMS)
          </InputLabel>
          <OutlinedInput
            id="instructors-amount"
            label="محتوای دوره (لینک به دوره در LMS)"
            value={weblinkLmsCourse}
            onChange={(e) => setWeblinkLmsCourse(e.target.value)}
            placeholder="https://www.example.com"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack>
          <JalaliDatePicker
            setSessionDate={setStartDate}
            sessionDate={startDate}
            label="تاریخ برگزاری"
            usageType="watching"
          />
        </Stack>
      </Grid>
    </>
  );
};

export default WorkshopFields;
