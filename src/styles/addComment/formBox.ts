import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";

export const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  margin: theme.spacing(2, 0, 8, 0),
}));

export const SelectBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1.25, 0),
  width: "100%",
  "& .MuiInputBase-input": { fontSize: ".85rem" },
  "& .MuiTextField-root": { width: "100%" },
  "& .MuiInputBase-root": { width: "100%" },
  "& .MuiTypography-root": { width: "100%" },
  "& .MuiSelect-select": { width: "100%" },

  [theme.breakpoints.up("sm")]: {
    width: "50ch",
    "& .MuiTextField-root": { width: "50ch" },
    "& .MuiInputBase-root": { width: "50ch" },
    "& .MuiTypography-root": { width: "60ch" },
  },
  [theme.breakpoints.up("md")]: {
    width: "75ch",
    "& .MuiTextField-root": { width: "75ch" },
    "& .MuiInputBase-root": { width: "75ch" },
    "& .MuiTypography-root": { width: "90ch" },
  },
}));

export const RtlInputDate = styled(TextField)(() => ({
  "& .MuiInputBase-input": { direction: "ltr" },
}));
