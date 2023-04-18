import { Checkbox, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { TableBodyAllType } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";

const TableBodyAll = ({
  id,
  idMulti,
  province,
  city,
  // gender,
  studyField,
  finalField,
  jobStandby,
  contCourseApproach,
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
  cgpa,
  handleCheckBox,
  checkBoxDisplay,
}: TableBodyAllType) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
            <Checkbox
              size="small"
              onChange={(e) => handleCheckBox(e, idMulti!)}
            />
          )}
        </StyledTableCell>
      )}
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
        align="center"
        sx={{ width: "15%", verticalAlign: "center", cursor: "pointer" }}
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
        <Typography variant="body2">{province || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "10%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{city || "-"}</Typography>
      </StyledTableCell>
      {/* <StyledTableCell
        align="center"
        sx={{
          width:"10%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{gender}</Typography>
      </StyledTableCell> */}
      <StyledTableCell
        align="center"
        sx={{
          width: "10%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{mobile || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "10%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{email || "-"}</Typography>
      </StyledTableCell>
      {/* <StyledTableCell
        align="right"
        sx={{
          width:"10%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{studyField}</Typography>
      </StyledTableCell> */}

      <StyledTableCell
        align="center"
        sx={{
          width: "10%",
          verticalAlign: "center",
        }}
      >
        {(directNav === "before-week" && (cgpa || "-")) ||
          (directNav === "after-week" && (finalResult || "-")) ||
          (directNav === "skill-seeker" && (selectedField || "-"))}
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "8%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">
          {(directNav === "before-week" && (jobStandby ? "بله" : "خیر")) ||
            (directNav === "after-week" && (scholar ? "دارد" : "ندارد"))}
        </Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          width: "8%",
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">
          {(directNav === "before-week" && (contCourseApproach || "-")) ||
            (directNav === "after-week" && (finalField || "-"))}
        </Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyAll;
