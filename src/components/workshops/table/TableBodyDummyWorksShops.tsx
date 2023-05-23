import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";

const TableBodyDummyWorksShops = () => {
  const navigate = useNavigate();
  return (
    <StyledTableRow
      onClick={() => {
        navigate("/admin/workshops/1");
      }}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
      }}
    >
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">30</Typography>
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">گیت</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">کیان شلیله</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">1402/02/01</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">1402/02/01</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">21</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyDummyWorksShops;
