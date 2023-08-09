import { Checkbox, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { TableBodyAllType } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";

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
  index,
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
        <Typography variant="body2">{index}</Typography>
      </StyledTableCell>
      <StyledTableCell align="left" sx={{ verticalAlign: "center" }}>
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
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{registrationCode}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ verticalAlign: "center", cursor: "pointer" }}
        onClick={() => navigate(`/${roles}/${directNav}/${id}`)}
      >
        <Typography variant="body2">{firstName + " " + family}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{course || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{education || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{highSchoolYear || "-"}</Typography>
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{province || "-"}</Typography>
      </StyledTableCell>

      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">
          {familiarity === "other" ? "سایر" : familiarity || "-"}
        </Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{refer || "-"}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">
          {createTime &&
            new Intl.DateTimeFormat("fa").format(new Date(createTime))}
        </Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RegTableBodyAll;
