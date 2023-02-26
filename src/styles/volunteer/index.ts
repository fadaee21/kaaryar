import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
export const BorderBox = styled(Box)(({ theme }) => ({
  border: "1px solid #ccc",
  borderRadius: 8,
  padding: theme.spacing(2),
  margin: theme.spacing(2.5, 0),
  minHeight: 240,
  overflow: "hidden",
}));
export const BorderBoxAbout = styled(Box)(({ theme }) => ({
  border: "1px solid #ccc",
  borderRadius: 8,
  padding: theme.spacing(4, 2),
  margin: theme.spacing(2.5, 0, 5.5),
}));
export const ListText = styled(ListItemText)(() => ({
  "& .MuiTypography-body1": {
    color: "#000",
    fontSize: "1rem",
  },
}));
export const ListIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "fit-content",
  margin: theme.spacing(0, 0.5),
}));
