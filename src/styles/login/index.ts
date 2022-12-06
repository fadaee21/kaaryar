import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";

interface MyBackgroundImage {
  backgd: string;
}

export const BackgroundImage = styled(Box, {
  shouldForwardProp: (prop) => prop !== "backgd",
})<MyBackgroundImage>(({ backgd }) => ({
  background: `url(${backgd})`,
  minHeight: " 100vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
}));

export const GridGuestLogin = styled(Grid)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  textAlign: "center",
  padding: theme.spacing(0, 3),
  backgroundColor: "#f7e5f1",
}));

export const GridUserLogin = styled(Grid)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  textAlign: "center",
  padding: theme.spacing(0, 3),
  backgroundColor: "#fff",
}));
