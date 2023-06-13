import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, OutlinedInput, Grid } from "@mui/material";
import { ComboBoxAddCourse } from "../../pages/addNewcourse/AddNewCourse";
type LiftUpStateType = {
  [index: string]: string;
};
interface Prop {
  setLiftUpState: React.Dispatch<React.SetStateAction<LiftUpStateType>>;
}

const CoreFields = ({ setLiftUpState }: Prop) => {
  const [careerPathwayId, setCareerPathwayId] = useState(""); //related path
  const [weblinkLmsCourse, setWeblinkLmsCourse] = useState("");
  const [weblinkFinalProject, setWeblinkFinalProject] = useState("");
  const [teachingStatus, setTeachingStatus] = useState("");

  useEffect(() => {
    setLiftUpState({
      careerPathwayId,
      weblinkLmsCourse,
      teachingStatus,
      weblinkFinalProject,
    });
  }, [
    weblinkLmsCourse,
    weblinkFinalProject,
    careerPathwayId,
    teachingStatus,
    setLiftUpState,
  ]);

  return (
    <>
      <Grid item xs={12} md={6}>
        <ComboBoxAddCourse
          label="مسیر مرتبط"
          identifier="careerPathwayId"
          options={[
            {
              value: "CareerPathwayId...",
              label: "waiting for value of CareerPathwayId",
            },
          ]}
          handleChange={(e) => setCareerPathwayId(e.target.value)}
          val={careerPathwayId}
        />
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
        <FormControl fullWidth>
          <InputLabel htmlFor="weblinkFinalProject-amount">
            پروژه پایانی (لینک به پروژه در LMS)
          </InputLabel>
          <OutlinedInput
            id="weblinkFinalProject-amount"
            label="پروژه پایانی (لینک به پروژه در LMS)"
            value={weblinkFinalProject}
            onChange={(e) => setWeblinkFinalProject(e.target.value)}
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default CoreFields;
