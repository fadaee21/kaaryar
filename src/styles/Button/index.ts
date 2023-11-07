import { Button, ListItemButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const GreyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[500]),
  borderColor: grey[400],
  "&:hover": {
    backgroundColor: grey[200],
    borderColor: grey[700],
  },
}));

export const ListButton = styled(ListItemButton)(({ theme }) => ({
  maxWidth: "fit-content",
  marginLeft: theme.spacing(-2),
  borderRadius: theme.spacing(1),
}));
