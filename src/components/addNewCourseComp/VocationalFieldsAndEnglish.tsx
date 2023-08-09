import { FormControl, Grid, InputLabel, OutlinedInput } from "@mui/material";
import { useEffect, useState } from "react";

type LiftUpStateType = {
  [index: string]: string;
};
interface Prop {
  setLiftUpState: React.Dispatch<React.SetStateAction<LiftUpStateType>>;
}

const VocationalFieldsAndEnglish = ({ setLiftUpState }: Prop) => {
  const [weblinkLmsCourse, setWeblinkLmsCourse] = useState("");
  useEffect(() => {
    setLiftUpState({
      weblinkLmsCourse,
    });
  }, [weblinkLmsCourse, setLiftUpState]);

  return (
    <>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="weblinkLmsCourse-amount">
            محتوای دوره (لینک به دوره در LMS)
          </InputLabel>
          <OutlinedInput
            id="weblinkLmsCourse-amount"
            label="محتوای دوره (لینک به دوره در LMS)"
            value={weblinkLmsCourse}
            onChange={(e) => setWeblinkLmsCourse(e.target.value)}
            placeholder="https://www.example.com"
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default VocationalFieldsAndEnglish;
