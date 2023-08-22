import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { Notify } from "../../model";
import { persianDate } from "../../utils/persianDate";

interface Prop {
  notifyData: Notify;
}

const TableBodyNotify = ({ notifyData }: Prop) => {
  const navigate = useNavigate();
  const {
    body,
    createdAt,
    isActive,
    name,
    subject,
    type,
    updatedAt,
    templateId,
  } = notifyData;

  return (
    <StyledTableRow
      onClick={() => {
        // navigate(`/admin/groups/${id}`);
      }}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
      }}
    >
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{type}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{name}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{subject}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{body}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{isActive ? "true":"false"}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{templateId}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{persianDate(createdAt)}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{persianDate(updatedAt)}</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyNotify;
