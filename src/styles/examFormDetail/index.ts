import { Box,BoxProps } from "@mui/material";
import { styled } from "@mui/system";

interface BoxExamDetailProps extends BoxProps {
  colorActive?: boolean;
}

export const BoxExamDetail = styled(Box,{
  shouldForwardProp:(prop)=>prop!=="colorActive"
})<BoxExamDetailProps>(({ theme,colorActive }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  marginBottom:theme.spacing(5),
  [theme.breakpoints.up("sm")]: {
    alignItem: "flex-start",
    flexDirection: "row",
  },
  [theme.breakpoints.down("sm")]: {
    alignItem: "center",
    flexDirection: "column",
  },
  "& hr": {
    mx: 3,
  },
  ...(colorActive && { color:"#777" })
}));
