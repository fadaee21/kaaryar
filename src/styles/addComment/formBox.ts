import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "& .MuiTextField-root": { margin: theme.spacing(0.5, 0), width: "40ch" },
  [theme.breakpoints.up("sm")]: {
    "& .MuiTextField-root": { width: "50ch" },
  },
  [theme.breakpoints.up("md")]: {
    "& .MuiTextField-root": { width: "75ch" },
  },
}));
export const FormBoxSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  margin: theme.spacing(6,0,0),
}));
