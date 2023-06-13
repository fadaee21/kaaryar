import {
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { JalaliDatePicker } from "../comment/JalaliDatePicker";

type LiftUpStateType = {
  [index: string]: string;
};
interface Prop {
  setLiftUpState: React.Dispatch<React.SetStateAction<LiftUpStateType>>;
}

const WorkshopFields = ({ setLiftUpState }: Prop) => {
  const [weblinkLmsCourse, setWeblinkLmsCourse] = useState("");
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

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
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack>
          <Typography variant="body2" gutterBottom>
            تاریخ برگزاری
          </Typography>
          <JalaliDatePicker
            setSessionDate={setStartDate}
            sessionDate={startDate}
          />
        </Stack>
      </Grid>
    </>
  );
};

export default WorkshopFields;
