import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import useSWR from "swr";

type LiftUpStateType = {
  [index: string]: string;
};
interface Prop {
  setLiftUpState: React.Dispatch<React.SetStateAction<LiftUpStateType>>;
  errMsg: boolean;
}
interface RelatedPath {
  name: string;
  id: number;
}
export const RELATED_PATH =
  "/modules/career-pathways/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=id";
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

  const { data, isLoading } = useSWR<RelatedPath[]>(RELATED_PATH);

  return (
    <>
      <Grid item xs={12} md={6}>
        <FormControl
          disabled={!data && isLoading}
          fullWidth
          error={!careerPathwayId && errMsg}
        >
          <InputLabel id="careerPathwayId-label">مسیر مرتبط</InputLabel>
          <Select
            labelId="careerPathwayId-label"
            id="careerPathwayId"
            value={careerPathwayId}
            label="مسیر مرتبط"
            onChange={(e) => setCareerPathwayId(e.target.value.toString())}
          >
            {data?.map((item) => (
              <MenuItem key={item.id} value={`${item.id} + ${item.name}`}>
                {/*the reason of scheme of value: i need both name and id while MenuItem just let me send a single string or number */}
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            placeholder="example.com"
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
            placeholder="example.com"
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default CoreFields;
