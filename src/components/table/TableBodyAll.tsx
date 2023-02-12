import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { TableBodyAllType } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";

const TableBodyAll = ({
  id,
  birthDate,
  family,
  firstName,
  registrationCode,
  mobile,
  email,
  roles,
  directNav,
  checked,
  resultStatus,
}: TableBodyAllType) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <StyledTableCell
        align="left"
        sx={{ width: "10%", verticalAlign: "center" }}
      >
        {/* if (skill-seeker page show  8 status type) else (show 3 status) */}
        {pathname.endsWith("skill-seeker") ? (
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
            }}
          >
            {resultStatus}
          </Typography>
        ) : (
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              borderRadius: "5px",
              boxShadow: "0px 1px 2.5px",
              ...(checked === true
                ? { backgroundColor: "#64dd1720" }
                : checked === null
                ? { backgroundColor: "#ffab0045" }
                : { backgroundColor: "#ff174420" }),
            }}
          >
            {checked === true
              ? `تایید شده`
              : checked === null
              ? `در انتظار تایید`
              : `رد شده`}
          </Typography>
        )}
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          width: "10%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{registrationCode}</Typography>
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{ width: "20%", verticalAlign: "center", cursor: "pointer" }}
        onClick={() => navigate(`/${roles}/${directNav}/${id}`)}
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
          width: "15%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{mobile}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="right"
        sx={{
          width: "25%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{email}</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyAll;
