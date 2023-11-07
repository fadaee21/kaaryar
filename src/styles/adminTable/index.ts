import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StyledTableRowAdmin: any = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StyledTableCellAdmin = styled(TableCell)(({ theme }) => ({
  // minWidth: "max-content",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(0.75),
    fontWeight: "bolder",
  },
  [`&.${tableCellClasses.body}`]: {
    padding: theme.spacing(0.75),
  },
}));

export const StyledTypographyAdmin = styled(Typography)(({theme}) => ({
  minWidth: "100%",
  width: "max-content",
  maxWidth: 188,//200-12(padding of StyledTableCellAdmin)
  // padding: theme.spacing(0, 0.1),
}));
