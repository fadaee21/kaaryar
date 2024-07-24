import { Link } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { persianDate } from "../../utils/persianDate";

const SkillSeekerRowTable = ({
  index,
  id,
  family,
  firstName,
  registrationCode,
  resultStatus,
  finalField,
  group,
  familiarity,
  refer,
  selectedField,
  hasLMSUser,
  workshopCont,
  // presentStatus,
  scholar,
  careerPathway,
  date
}: any) => {
  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <StyledTableCell align="center">{index}</StyledTableCell>
      {/* وضعیت در مسیر پذیرش */}
      <StyledTableCell align="center">{resultStatus || "-"}</StyledTableCell>
      {/* تاریخ */}
      <StyledTableCell align="center">{persianDate(date) ?? "-"}</StyledTableCell>
      {/* نام و نام خانوادگی */}
      <StyledTableCell align="center">
        <Link to={`${id}`}>{firstName + " " + family}</Link>
      </StyledTableCell>
      {/* گروه */}
      <StyledTableCell align="center">{group || "-"}</StyledTableCell>
      {/* شماره متقاضی */}
      <StyledTableCell align="center">{registrationCode}</StyledTableCell>
      {/* نحوه آشنایی (‌نام موسسه / معرف)‌ */}
      <StyledTableCell align="center">{familiarity || "-"}</StyledTableCell>
      {/* نام معرف یا موسسه */}
      <StyledTableCell align="center">{refer || "-"}</StyledTableCell>
      {/* رشته انتخابی */}
      <StyledTableCell align="center">{selectedField || "-"}</StyledTableCell>
      {/* اکانت ال ام اس */}
      <StyledTableCell align="center">{hasLMSUser ? "دارد" : "ندارد"}</StyledTableCell>
      {/* وضعیت شرکت در کارگاه معارفه */}
      <StyledTableCell align="center">{workshopCont || "-"}</StyledTableCell>
      {/* وضعیت حضور و غیاب در کارنامه هفته پذیرش */}
      {/* <StyledTableCell align="center">{presentStatus || "-"}</StyledTableCell> */}
      {/* بورسیه */}
      <StyledTableCell align="center">{ scholar ? "بله" : "خیر"}</StyledTableCell>
      {/* رشته نهایی */}
      <StyledTableCell align="center">{finalField || "-"}</StyledTableCell>
      {/* مسیر آموزشی */}
      <StyledTableCell align="center">{careerPathway || "-"}</StyledTableCell>
    </StyledTableRow>
  );
};

export default SkillSeekerRowTable;
