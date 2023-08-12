import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";
import { DetailStudentStatus } from "../../model";

interface EditComboProp {
  data: DetailStudentStatus[] | undefined;
  identifier: string;
  label: string;
  val: string | undefined;
  handleChange: (e: SelectChangeEvent<string>) => void;
  error?:boolean
}

export const EditComboStudent = ({
  data,
  identifier,
  label,
  val,
  handleChange,
  error=false
}: EditComboProp) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${identifier}-label`}>{label}</InputLabel>
      <Select
        labelId={`${identifier}-label`}
        id={identifier}
        name={identifier}
        value={val}
        label={label}
        onChange={handleChange}
        error={error}
      >
        {data?.map((i) => (
          <MenuItem key={i.id} value={i.id}>
            {i.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
