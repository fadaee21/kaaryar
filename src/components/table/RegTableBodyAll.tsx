import { Checkbox, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { TableBodyAllType } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { dateConverter } from "../../utils/dateConverter";

const RegTableBodyAll = ({
  id,
  course,
  education,
  family,
  firstName,
  registrationCode,
  province,
  directNav,
  familiarity,
  checked,
  handleCheckBox,
  checkBoxDisplay,
  highSchoolYear,
  refer,
  createTime,
}: TableBodyAllType) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const roles = auth.roles.toString();
  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      {/* checkbox only show in registration table */}
      {handleCheckBox && (
        <StyledTableCell
          align="left"
          sx={{ width: "2%", verticalAlign: "center" }}
        >
          {/* show check box only if search for null(awaiting to confirm person) */}
          {checked === null && checkBoxDisplay && (
            <Checkbox size="small" onChange={(e) => handleCheckBox(e, id)} />
          )}
        </StyledTableCell>
      )}

      <StyledTableCell
        align="left"
        sx={{ width: "10%", verticalAlign: "center" }}
      >
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
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "9%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{registrationCode}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "12%", verticalAlign: "center", cursor: "pointer" }}
        onClick={() => navigate(`/${roles}/${directNav}/${id}`)}
      >
        <Typography variant="body2">{firstName + " " + family}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "5%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{course || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "13%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{education || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "10%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{highSchoolYear || "-"}</Typography>
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          width: "5%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{province || "-"}</Typography>
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          width: "15%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{familiarity || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "14%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{refer || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "15%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">
          {createTime && dateConverter(createTime)}
        </Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RegTableBodyAll;
