import { FormControl, Grid, InputLabel, OutlinedInput } from "@mui/material";
import { useEffect, useState } from "react";
import { ComboBoxAddCourse } from "../../pages/addNewcourse/AddNewCourse";

type LiftUpStateType = {
  [index: string]: string;
};
interface Prop {
  setLiftUpState: React.Dispatch<React.SetStateAction<LiftUpStateType>>;
}

const InterpersonalFieldsAndEnglish = ({ setLiftUpState }: Prop) => {
  const [weblinkLmsCourse, setWeblinkLmsCourse] = useState("");
  const [teachingStatus, setTeachingStatus] = useState("");
  useEffect(() => {
    setLiftUpState({
      weblinkLmsCourse,
      teachingStatus,
    });
  }, [weblinkLmsCourse, teachingStatus, setLiftUpState]);

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
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <ComboBoxAddCourse
          label="وضعیت دوره"
          identifier="statusCourse"
          options={[
            {
              value: "TeachingStatus...",
              label: "waiting for value of TeachingStatus",
            },
          ]}
          handleChange={(e) => setTeachingStatus(e.target.value)}
          val={teachingStatus}
        />
      </Grid>
    </>
  );
};

export default InterpersonalFieldsAndEnglish;
