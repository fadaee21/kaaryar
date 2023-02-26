import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import { ListItem } from "@mui/material";

export const StartListItem = styled(ListItem)(() => ({
  alignItems: "flex-start"
}));
export const BorderBox = styled(Box)(({ theme }) => ({
  border: "1px solid #ccc",
  borderRadius: 8,
  padding: theme.spacing(2),
  margin: theme.spacing(2.5, 0),
  minHeight: 370,
  width: "100%",
  overflow: "hidden",
}));
export const BorderBox2 = styled(BorderBox)(() => ({
  minHeight: 370,
  width: "33.3%",
}));

export const ListItemText1 = styled(ListItemText)(() => ({
  width: 220,
  "& .MuiTypography-body1": {
    fontSize: "14px",
    fontWeight: "400",
    whiteSpace: "nowrap",
    color: "#000",
    overflow: "hidden",
  },
}));
export const ListItemText2 = styled(ListItemText)(() => ({
  width: 341,
  "& .MuiTypography-body1": {
    color: "#000",
    fontSize: "1rem",
    fontWeight: "500",
    overflow: "hidden",
    textAlign: "left",
  },
}));
export const ListItemText3 = styled(ListItemText1)(() => ({
  width: 350,
}));
export const ListItemText4 = styled(ListItemText2)(() => ({
  width: 50,
}));
export const ListItemText5 = styled(ListItemText2)(() => ({
  width: 120,
}));
