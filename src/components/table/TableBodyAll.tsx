import { Checkbox, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { TableBodyAllType } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";

const TableBodyAll = ({
  id,
  idMulti,
  province,
  city,
  finalField,
  jobStandby,
  motivation,
  scholar,
  finalResult,
  selectedField,
  family,
  firstName,
  registrationCode,
  mobile,
  email,
  directNav,
  checked,
  resultStatus,
  contCourseApproach,
  handleCheckBox,
  checkBoxDisplay,
  index,
  finalResults,
  course
}: TableBodyAllType) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  //  if (skill-seeker page show  8 status type) else (show 3 status)
  const showStatus = pathname.endsWith("skill-seeker") ? (
    <Typography variant="body2" sx={{ textAlign: "center" }}>
      {resultStatus}
    </Typography>
  ) : (
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
    (directNav === "after-week" && (finalResult || "-")) ||
    (directNav === "skill-seeker" && (selectedField || "-"));

  const showJobStandby =
    (directNav === "before-week" && (jobStandby ? "بله" : "خیر")) ||
    (directNav === "after-week" && (scholar ? "دارد" : "ندارد")) ||
    (directNav === "skill-seeker" && (finalField ?? "-"));

  const showMotivation =
    (directNav === "before-week" && (motivation || "-")) ||
    (directNav === "after-week" && (finalField || "-")) ||
    (directNav === "skill-seeker" && (finalResults || "-"));

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
          <Checkbox
            size="small"
            onChange={(e) => handleCheckBox?.(e, idMulti!)}
          />
        )}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{index}</Typography>
      </StyledTableCell>
      <StyledTableCell align="left" sx={{ verticalAlign: "center" }}>
        {showStatus}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">{registrationCode}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`${id}`)}
      >
        <Typography variant="body1">{firstName + " " + family}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">{course || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">{province || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">{city || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">{mobile || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">{email || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">{showFieldCgpa}</StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">{showJobStandby}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body2">{showMotivation}</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyAll;
