import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { Notify } from "../../model";
import { persianDate } from "../../utils/persianDate";

interface Prop {
  notifyData: Notify;
  typeComp: "sms" | "email";
}

const TableBodyNotify = ({ notifyData, typeComp }: Prop) => {
  const navigate = useNavigate();
  const {
    // body,
    createdAt,
    isActive,
    // name,
    subject,
    type,
    updatedAt,
    templateId,
  } = notifyData;

  const changerFunc = (val: keyof typeof emailTemplates): string => {
    const emailTemplates: Record<string, string> = {
      exam_registration_rejection: "رد فرم پذیرش",
      exam_registration: "تأیید فرم پذیرش",
      exam_rejection: "رد فرم ارزیابی",
      exam_approval: "تأیید فرم ارزیابی",
      initial_rejection: "رد فرم ثبت‌نام",
      initial_approval: "فرم تأیید ثبت‌نام"
    };
    return emailTemplates[val] || ""
  }

  return (
    <StyledTableRow
      onClick={() => {
        navigate(`${typeComp}/${templateId}`);
      }}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
      }}
    >
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{changerFunc(type)}</Typography>
      </StyledTableCell>
      {/* <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{name}</Typography>
      </StyledTableCell> */}
      {typeComp === "email" && (
        <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
          <Typography variant="body2">{subject}</Typography>
        </StyledTableCell>
      )}
      {/* <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{body}</Typography>
      </StyledTableCell> */}
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">
          {isActive ? "فعال" : "غیر فعال"}
        </Typography>
      </StyledTableCell>
      {/* <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{templateId}</Typography>
      </StyledTableCell> */}
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{persianDate(createdAt)}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{persianDate(updatedAt)}</Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyNotify;
