import {
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
  placeholder: string;
  identifier: string;
  value: any;
  handleChange: (e: SelectChangeEvent<string | boolean>) => void;
}

const EditBoolean = ({
  placeholder,
  handleChange,
  identifier,
  value,
}: Props) => {
  const content = (
    <ListItem>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor={identifier}>{placeholder}</InputLabel>
        <Select
          labelId={identifier}
          id={identifier}
          onChange={handleChange}
          name={identifier}
          value={value}
          label={placeholder}
        >
          <MenuItem value={true as any}>بله</MenuItem>
          <MenuItem value={false as any}>خیر</MenuItem>
        </Select>
      </FormControl>
    </ListItem>
  );
  return content;
};

export default EditBoolean;
