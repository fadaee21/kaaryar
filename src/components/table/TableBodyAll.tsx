import { Checkbox, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { TableBodyAllType } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";

const TableBodyAll = ({
  id,
  province,
  city,
  finalField,
  jobStandby,
  motivation,
  scholar,
  finalResult,
  // selectedField,
  family,
  firstName,
  // registrationCode,
  mobile,
  email,
  directNav,
  checked,
  // resultStatus,
  contCourseApproach,
  handleCheckBox,
  checkBoxDisplay,
  index,
  // finalResults,
  course,
  createdAt,
  decidedAt,
}: TableBodyAllType) => {
  const showStatus = (
    <Typography
      variant="body2"
      sx={{
        textAlign: "center",
        borderRadius: "5px",
        boxShadow: "0px 1px 2.5px",
        backgroundColor:
          checked === true
            ? "#64dd1720"
            : checked === null
            ? "#ffab0045"
            : "#ff174420",
      }}
    >
      {checked === true
        ? "تایید شده"
        : checked === null
        ? "در انتظار تایید"
        : "رد شده"}
    </Typography>
  );

  const showFieldCgpa =
    (directNav === "before-week" && (contCourseApproach || "-")) ||
    (directNav === "after-week" && (finalResult || "-"));

  const showJobStandby =
    (directNav === "before-week" && (jobStandby ? "بله" : "خیر")) ||
    (directNav === "after-week" && (scholar ? "دارد" : "ندارد"));

  const showMotivation =
    (directNav === "before-week" && (motivation || "-")) ||
    (directNav === "after-week" && (finalField || "-"));

  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      {/* checkbox only show in registration table */}
      <StyledTableCell align="center">
        {/* show check box only if search for null(awaiting to confirm person) */}
        {checked === null && checkBoxDisplay && (
          <Checkbox size="small" onChange={(e) => handleCheckBox?.(e, id)} />
        )}
      </StyledTableCell>
     <StyledTableCell align="center" >
        {index}
      </StyledTableCell>
      <StyledTableCell align="left" sx={{ verticalAlign: "center" }}>
        {showStatus}
      </StyledTableCell>
      {/* <StyledTableCell align="center">{registrationCode}</StyledTableCell> */}
      <StyledTableCell align="center">
        <Link to={`${id}`}>{firstName + " " + family}</Link>
      </StyledTableCell>
      <StyledTableCell align="center">{course || "-"}</StyledTableCell>
      <StyledTableCell align="center">{province || "-"}</StyledTableCell>
      <StyledTableCell align="center">{city || "-"}</StyledTableCell>
      <StyledTableCell align="center">{mobile || "-"}</StyledTableCell>
      <StyledTableCell align="center">{email || "-"}</StyledTableCell>
      <StyledTableCell align="center">{showFieldCgpa}</StyledTableCell>
      <StyledTableCell align="center">{showJobStandby}</StyledTableCell>
      <StyledTableCell align="center">{showMotivation}</StyledTableCell>
      {directNav === "before-week" && (
        <StyledTableCell align="center">{createdAt}</StyledTableCell>
      )}
      <StyledTableCell align="center">{decidedAt}</StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyAll;
