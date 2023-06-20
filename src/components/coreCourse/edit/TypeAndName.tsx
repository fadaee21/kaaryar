import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

interface Prop {
  name: string | undefined;
  category: string;
}

const TypeAndName = ({ category, name }: Prop) => {
  return (
    <>
      <Grid item xs={6}>
        <FormControl disabled fullWidth>
          <InputLabel id="courseType-label">نوع دوره</InputLabel>
          <Select
            defaultValue={category}
            labelId="courseType-label"
            label="نوع دوره"
          >
            <MenuItem value={category}>{category}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl disabled fullWidth>
          <InputLabel id="course-name-label">نام دوره</InputLabel>
          <Select
            defaultValue={name}
            labelId="course-name-label"
            id="course-name"
            label="نام دوره"
          >
            <MenuItem value={name}>{name}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

export default TypeAndName;
