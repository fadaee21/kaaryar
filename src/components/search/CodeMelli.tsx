import { TextField } from "@mui/material";

const CodeMelli = ({ setCodeMelliState }: any) => {
  return (
    <TextField
      id="outlined-basic"
      label="کد ملی"
      variant="outlined"
      onChange={(e) => setCodeMelliState(e.target.value)}
    />
  );
};

export default CodeMelli;
