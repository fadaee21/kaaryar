import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { OptionsString } from "../../model";

interface ComboBoxProp {
  options: OptionsString[];
  val: string | undefined;
  identifier: string;
  label: string;
  handleChange: (event: SelectChangeEvent) => void;
  error?: boolean;
}

export const ComboBoxAddCourse = ({
  options,
  val,
  identifier,
  label,
  handleChange,
  error = false,
}: ComboBoxProp) => {
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
        {options.map((option, i) => (
          <MenuItem key={i} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
