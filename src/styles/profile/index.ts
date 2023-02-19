import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const ProfileTitle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(7.5, 0, 3, 0),
}));
export const DesireBox = styled(Box)(({ theme }) => ({
  border: "1px solid #ccc",
  borderRadius: 1.5,
  padding: theme.spacing(2),
  margin: theme.spacing(1, 0, 0),
  display: "flex",
  flexDirection: "column",
  gap: 2,
}));

export const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  margin: theme.spacing(5, 0, 18.5),
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: theme.spacing(0, 0, 3),
}));
