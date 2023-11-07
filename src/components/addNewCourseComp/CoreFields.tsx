import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";
import CareerPathway from "./CareerPathway";

type LiftUpStateType = {
  [index: string]: string;
};
interface Prop {
  setLiftUpState: React.Dispatch<React.SetStateAction<LiftUpStateType>>;
  errMsg: boolean;
}

const CoreFields = ({ setLiftUpState, errMsg }: Prop) => {
  const [careerPathwayId, setCareerPathwayId] = useState(""); //related path
  const [weblinkLmsCourse, setWeblinkLmsCourse] = useState("");
  const [weblinkFinalProject, setWeblinkFinalProject] = useState("");

  useEffect(() => {
    setLiftUpState({
      careerPathwayId,
      weblinkLmsCourse,
      weblinkFinalProject,
    });
  }, [weblinkLmsCourse, weblinkFinalProject, careerPathwayId, setLiftUpState]);

  return (
    <>
      <Grid item xs={12} md={6}>
        <CareerPathway
          careerPathwayId={careerPathwayId}
          errMsg={errMsg}
          setCareerPathwayId={setCareerPathwayId}
          label="مسیر مرتبط"
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
            placeholder="https://www.example.com"
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
            placeholder="https://www.example.com"
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default CoreFields;
