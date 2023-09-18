import {
  FormControl,
  InputLabel,
  ListItem,
  OutlinedInput,
} from "@mui/material";
export interface Props {
  placeholder: string;
  identifier: string;
  value: string;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}
const EditString = ({
  placeholder,
  identifier,
  value,
  handleChange,
}: Props) => {
  const content = (
    <ListItem>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor={identifier}>{placeholder}</InputLabel>
        <OutlinedInput
          id={identifier}
          value={value}
          onChange={handleChange}
          name={identifier}
          label={placeholder}
          multiline
        />
      </FormControl>
    </ListItem>
  );
  return content;
};

export default EditString;
