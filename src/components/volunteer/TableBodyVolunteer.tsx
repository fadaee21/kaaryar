import { IconButton, Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

interface Props {
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  id: number;
  counter: number;
}

const TableBodyVolunteer = ({
  username,
  firstName,
  lastName,
  role,
  counter,
}: Props) => {
  const navigate = useNavigate();

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
        <Typography variant="body2">{counter}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "30%",
          verticalAlign: "center",
        }}
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
        <IconButton onClick={() => navigate(username)}>
          <VisibilityIcon fontSize="small" color="info" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyVolunteer;
