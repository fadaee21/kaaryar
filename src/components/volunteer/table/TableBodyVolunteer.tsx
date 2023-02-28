import { IconButton, Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

const TableBodyVolunteer = ({
  username,
  firstName,
  lastName,
  id,
  role,
}: any) => {
  const navigate = useNavigate();
  const handleNav = () => navigate(`/${roles}/volunteer/${username}`);
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
        <Typography variant="body2">{id}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "30%",
          verticalAlign: "center",
          cursor:"pointer"
        }}
        onClick={handleNav}
      >
        <Typography variant="body2">{`${firstName} ${lastName}`}</Typography>
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          width: "50%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{role}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{ width: "10%", verticalAlign: "center" }}
      >
        <IconButton onClick={handleNav}>
          <VisibilityIcon fontSize="small" color="info" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyVolunteer;
