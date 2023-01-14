import { TextField } from "@mui/material";


const Mobile = ({ setMobileState }: any) => {
  return (
    <TextField
      id="outlined-basic"
      label="شماره موبایل"
      variant="outlined"
      onChange={(e) => setMobileState(e.target.value)}
    />
  );
};

export default Mobile;
