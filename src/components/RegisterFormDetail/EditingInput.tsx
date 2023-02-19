import { FormControl, Input, InputLabel } from "@mui/material";

interface EditingInputType {
  state: string | null;
  handleChange: any;
  placeholder: string;
  name: string;
}

const EditingInput = ({
  state,
  handleChange,
  placeholder,
  name,
}: EditingInputType) => {
  return (
    <FormControl fullWidth  variant="standard">
      <InputLabel htmlFor={name}>{placeholder}</InputLabel>
      <Input
        id={name}
        value={state || " "}
        onChange={handleChange}
        name={name}
      />
    </FormControl>
  );
};

export default EditingInput;
