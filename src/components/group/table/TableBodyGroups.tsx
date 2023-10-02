import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";
import { ShortGroup } from "../../../model";
import { persianDate } from "../../../utils/persianDate";

interface Prop {
  groupAll: ShortGroup;
}

const TableBodyGroups = ({ groupAll }: Prop) => {
  const navigate = useNavigate();
  const {
    groupCode,
    name,
    startDate,
    endDate,
    mentorCount,
    studentCount,
    teachingAssistantCount,
    id,
  } = groupAll;

  return (
    <StyledTableRow
      onClick={() => {
        navigate(`/admin/groups/${id}`);
      }}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
      }}
    >
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{groupCode}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{name}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{persianDate(startDate)}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{persianDate(endDate)}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{studentCount}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{teachingAssistantCount}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{mentorCount}</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyGroups;
