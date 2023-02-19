import { IconButton, Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

const TableBodyVolunteer = () => {
  const navigate = useNavigate();
  const {
    auth: { roles },
  } = useAuth();
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
            // navigate(`/${roles}/volunteer/${id}`)
            navigate(`/${roles}/volunteer/1`)
            
          }
        >
          <VisibilityIcon fontSize="small" color="info" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyVolunteer;
