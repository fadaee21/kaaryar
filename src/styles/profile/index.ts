import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const StackTitle = styled(Stack)(({ theme }) => ({
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


export const ContentBoxHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: theme.spacing(0, 0, 3),
  width: "100%",
}));
