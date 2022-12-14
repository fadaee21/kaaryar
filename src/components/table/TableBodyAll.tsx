import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TableBodyAllType } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TableBodyAll = ({
  id,
  birthDate,
  family,
  firstName,
  registrationCode,
  codeMeli,
  mobile,
  email,
  roles,
  directNav,
  gender,
  checked,
}: TableBodyAllType) => {
  const navigate = useNavigate();
  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
      }}
      onClick={() => navigate(`/${roles}/${directNav}/${id}`)}
    >
      <StyledTableCell
        align="left"
        sx={{ width: "2%", verticalAlign: "center" }}
      >
        <Typography variant="body1">
          {checked && <CheckCircleIcon color="disabled" fontSize="small" />}
        </Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "23%", verticalAlign: "center" }}
      >
        <Typography variant="body1">{firstName + " " + family}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "10%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{birthDate}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "5%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{gender}</Typography>
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          width: "15%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{registrationCode}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "15%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{codeMeli}</Typography>
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          width: "15%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{mobile}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="right"
        sx={{
          width: "15%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{email}</Typography>
      </StyledTableCell>

      {/* <StyledTableCell
      align="left"
      sx={{ width: "30%", verticalAlign: "center" }}
    >
      <ListItem sx={{ pt: 0 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            navigate(`/${roles}/before-week/${id}`)
          }
          sx={{ ml: "auto", mr: "auto" }}
        >
          جزییات
        </Button>
      </ListItem>
    </StyledTableCell> */}
    </StyledTableRow>
  );
};

export default TableBodyAll;
