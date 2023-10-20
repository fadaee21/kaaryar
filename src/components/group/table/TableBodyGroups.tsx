import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";
import { ShortGroup } from "../../../model";
import { persianDate } from "../../../utils/persianDate";

interface Prop {
  groupAll: ShortGroup;
}

const TableBodyGroups = ({ groupAll }: Prop) => {
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
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        {/* <Link to={`${id}`}> */}
        <Typography variant="body2">{groupCode}</Typography>
        {/* </Link> */}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">
          <Link to={`${id}`}>{name}</Link>
        </Typography>
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
