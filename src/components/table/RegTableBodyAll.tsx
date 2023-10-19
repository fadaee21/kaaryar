import { Checkbox, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TableBodyAllType } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import ContextMenu from "../ContextMenu";

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
  const navigate = useNavigate();
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
        <Typography variant="body2">{index}</Typography>
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
      <StyledTableCell
        align="left"
        sx={{ verticalAlign: "center", cursor: "pointer" }}
        onClick={() => navigate(`${id}`)}
      >
        <ContextMenu navigation={id}>
          <Typography variant="body2">{firstName + " " + family}</Typography>
        </ContextMenu>
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
        <Typography variant="body2">{city || "-"}</Typography>
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
        <Typography variant="body2">{familiarityText}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{careerPathwayName}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{formattedcreatedAt}</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
        }}
      >
        <Typography variant="body2">{formattedDecidedTime}</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RegTableBodyAll;
