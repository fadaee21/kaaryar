import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";
import { WorkshopShort } from "../../../model";
import { persianDate } from "../../../utils/persianDate";
import { convertArrToStr } from "../../../utils/courseMethod";
interface Prop {
  workshops: WorkshopShort;
  counter: number;
}
const TableBodyWorksShops = ({ workshops, counter }: Prop) => {
  const navigate = useNavigate();
  const { id, name, startDate, studentCount, instructors } = workshops;
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
        <Typography variant="body2">
          {instructors.length ? convertArrToStr(instructors) : "-"}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{persianDate(startDate)}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{studentCount}</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyWorksShops;
