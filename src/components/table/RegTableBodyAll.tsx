import { Checkbox, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TableBodyAllType } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";

const RegTableBodyAll = ({
  id,
  education,
  family,
  firstName,
  registrationCode,
  province,
  roles,
  directNav,
  familiarity,
  checked,
  handleCheckBox,
  checkBoxDisplay,
  highSchoolYear,
  refer,
}: TableBodyAllType) => {
  const navigate = useNavigate();

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
            <Checkbox
              size="small"
              onChange={(e) => handleCheckBox(e, id.toString())}
            />
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
          width: "10%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{registrationCode}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "15%", verticalAlign: "center", cursor: "pointer" }}
        onClick={() => navigate(`/${roles}/${directNav}/${id}`)}
      >
        <Typography variant="body1">{firstName + " " + family}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "13%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{education}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "13%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{highSchoolYear}</Typography>
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          width: "5%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{province}</Typography>
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          width: "15%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{familiarity}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "15%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{refer}</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RegTableBodyAll;