import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { InputLabel, ListItem } from "@mui/material";
import { PropEditCombo } from "../../model";

export function EditingSelective({
  value,
  handleChange,
  options,
  placeholder,
  identifier,
  disabled,
}: PropEditCombo) {
  return (
    <ListItem>
      <FormControl fullWidth variant="outlined" disabled={disabled}>
        <InputLabel id={identifier}>{placeholder}</InputLabel>
        <Select
          labelId={identifier}
          id={identifier}
          onChange={handleChange}
          name={identifier}
          value={value}
          label={placeholder}
        >
          {options?.map((option: any, i: any) => (
            <MenuItem key={i} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ListItem>
  );
}
