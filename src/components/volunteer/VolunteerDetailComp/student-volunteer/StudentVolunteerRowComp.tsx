import { useNavigate } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../../styles/table";
import { Typography } from "@mui/material";
interface Props {
  counter: number;
}
const StudentVolunteerRowComp = ({ counter }: Props) => {
  const navigate = useNavigate();
  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{counter}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{ verticalAlign: "center", cursor: "pointer" }}
        // onClick={() => navigate(`${id}`)}
      >
        {/* <Typography variant="body2">{firstName + " " + family}</Typography> */}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        {/* <Typography variant="body2">{firstName + " " + family}</Typography> */}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        {/* <Typography variant="body2">{firstName + " " + family}</Typography> */}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        {/* <Typography variant="body2">{firstName + " " + family}</Typography> */}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        {/* <Typography variant="body2">{firstName + " " + family}</Typography> */}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        {/* <Typography variant="body2">{firstName + " " + family}</Typography> */}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        {/* <Typography variant="body2">{firstName + " " + family}</Typography> */}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        {/* <Typography variant="body2">{firstName + " " + family}</Typography> */}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        {/* <Typography variant="body2">{firstName + " " + family}</Typography> */}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        {/* <Typography variant="body2">{firstName + " " + family}</Typography> */}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        {/* <Typography variant="body2">{firstName + " " + family}</Typography> */}
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{ verticalAlign: "center", cursor: "pointer" }}
        // onClick={() => navigate(`${id}`)}
      >
        <Typography variant="body2">مشاهده</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default StudentVolunteerRowComp;
