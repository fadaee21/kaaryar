import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    padding: theme.spacing(1.58),
  },
}));
