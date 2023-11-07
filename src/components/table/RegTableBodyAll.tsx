import { Checkbox, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { TableBodyAllType } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";

const RegTableBodyAll = ({
  id,
  course,
  education,
  family,
  firstName,
  // registrationCode,
  province,
  familiarity,
  checked,
  handleCheckBox,
  checkBoxDisplay,
  highSchoolYear,
  refer,
  createdAt,
  index,
  city,
  decidedAt,
  careerPathwayName,
}: TableBodyAllType) => {
  const backgroundColor =
    checked === true
      ? "#64dd1720"
      : checked === null
      ? "#ffab0045"
      : "#ff174420";
  const familiarityText = familiarity === "other" ? "سایر" : familiarity || "-";
  const formattedcreatedAt =
    createdAt && new Intl.DateTimeFormat("fa").format(new Date(createdAt));
  const formattedDecidedTime = decidedAt
    ? new Intl.DateTimeFormat("fa").format(new Date(decidedAt))
    : "-";

  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      {/* checkbox only show in registration table */}

      <StyledTableCell align="left" sx={{ verticalAlign: "center" }}>
        {/* show check box only if search for null(awaiting to confirm person) */}
        {checked === null && checkBoxDisplay && (
          <Checkbox size="small" onChange={(e) => handleCheckBox?.(e, id)} />
        )}
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        {index}
      </StyledTableCell>
      <StyledTableCell align="left" sx={{ verticalAlign: "center" }}>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            borderRadius: "5px",
            boxShadow: "0px 1px 2.5px",
            backgroundColor,
          }}
        >
          {checked === true
            ? `تایید شده`
            : checked === null
            ? `در انتظار تایید`
            : `رد شده`}
        </Typography>
      </StyledTableCell>
      {/* <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{registrationCode}</Typography>
      </StyledTableCell> */}
      <StyledTableCell align="center">
        <Link to={`${id}`}>{firstName + " " + family}</Link>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        {course || "-"}
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        {education || "-"}
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        {highSchoolYear || "-"}
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        {province || "-"}
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        {city || "-"}
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        {refer || "-"}
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        {familiarityText}
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        {careerPathwayName}
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        {formattedcreatedAt}
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        {formattedDecidedTime}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RegTableBodyAll;
