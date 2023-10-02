import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

interface SelectorType {
  id: string;
  name: string;
  label: String;
  items: string[];
  handleChange: any;
  state: string;
  disabled?: boolean;
}

function Selector({
  id,
  name,
  label,
  items,
  handleChange,
  state,
  disabled,
}: SelectorType) {
  return (
    <FormControl fullWidth size="small" disabled={disabled}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        id={id}
        value={state}
        label={label}
        name={name}
        onChange={handleChange}
      >
        {items.map((item: string, i: React.Key) => (
          <MenuItem key={i} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Selector;
