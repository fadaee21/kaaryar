import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";

const TableBodyDummyLanguage = () => {
  const navigate = useNavigate();
  return (
    <StyledTableRow
      onClick={() => {
        navigate("/admin/language-course/1");
      }}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
      }}
    >
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">22</Typography>
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">Elementary</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">Elementary-1</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">06</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">در حال آموزش</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">نوید سلیمانی</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">1402/02/01</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">-</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">21</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyDummyLanguage;
