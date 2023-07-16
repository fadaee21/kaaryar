import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";
import { EnglishShort } from "../../../model";
import { persianDate } from "../../../utils/persianDate";
interface Prop {
  englishCourse: EnglishShort;
  counter: number;
}
const TableBodyLanguage = ({ englishCourse, counter }: Prop) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    startDate,
    endDate,
    studentCount,
    category,
    teachingStatus,
    nonLmsInstructors,
  } = englishCourse;
  return (
    <StyledTableRow
      onClick={() => {
        navigate(`/admin/general-course/${id}`);
      }}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
      }}
    >
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{counter + 1}</Typography>
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{name}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{teachingStatus}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">
          {category ? category.groupCode + "-" + category.name : "-"}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{nonLmsInstructors || "-"}</Typography>
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
    </StyledTableRow>
  );
};

export default TableBodyLanguage;
