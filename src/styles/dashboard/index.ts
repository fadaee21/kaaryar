import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export const PaperDashboard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  // color: theme.palette.text.primary,
  height: 160,
}));

export const BoxDashboard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(3),
}));
