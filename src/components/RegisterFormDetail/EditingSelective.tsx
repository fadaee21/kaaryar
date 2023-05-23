import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputLabelEditing } from "../../styles/editingReg";

interface EditingSelectiveType {
  handleChange: (e: SelectChangeEvent) => void;
  state: string | null;
  options: { label: string; value: string }[];
  placeholder: string;
  name: string;
}

export function EditingSelective({
  state,
  handleChange,
  options,
  placeholder,
  name,
}: EditingSelectiveType) {
  return (
    <FormControl fullWidth>
      <InputLabelEditing id="Editing-select-label">
        {placeholder}
      </InputLabelEditing>
      <Select
        labelId="Editing-select-label"
        id={name}
        name={name}
        value={state || ""}
        label={placeholder}
        onChange={handleChange}
        variant="standard"
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
