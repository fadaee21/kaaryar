import { Box,BoxProps } from "@mui/material";
import { styled } from "@mui/system";

interface ContentBoxProps extends BoxProps {
  colorActive?: boolean | null;
}

export const ContentBox = styled(Box,{
  shouldForwardProp:(prop)=>prop!=="colorActive"
})<ContentBoxProps>(({ theme,colorActive }) => ({
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
