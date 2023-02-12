import { IconButton, Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import { useNavigate } from "react-router-dom";

const TableBodyVolunteer = () => {
  // const navigate = useNavigate();
  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <StyledTableCell
        align="center"
        sx={{
          width: "10%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">01</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "30%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">هما فکری</Typography>
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          width: "50%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">منتور</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{ width: "10%", verticalAlign: "center" }}
      >
        <IconButton
          onClick={() =>
            // navigate(`/${roleAuth}/all-comments/${id}`)
            console.log("hello volunteer")
          }
        >
          <VisibilityIcon fontSize="small" color="info" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyVolunteer;
