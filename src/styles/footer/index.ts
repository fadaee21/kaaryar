import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";

export const FooterTheme = styled(Box)(({ theme }) => ({
  minWidth: "100%",
  backgroundColor: theme.palette.gray.main,
  color: theme.palette.gray.contrastText,
  margin: theme.spacing("auto", 0),
  padding: theme.spacing(2, 0),
}));

export const GridContainerFooter = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
}));
