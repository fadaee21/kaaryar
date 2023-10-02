import React from "react";
import { ModuleVolunteerProfile } from "../../../../model";
import { StyledTableCell, StyledTableRow } from "../../../../styles/table";
import { Typography } from "@mui/material";
import { convertArrToStr } from "../../../../utils/courseMethod";
interface Props {
  counter: number;
  moduleVolunteer: ModuleVolunteerProfile;
}
const TableBodyModuleVolunteer = ({ counter, moduleVolunteer }: Props) => {
  const { module,studentsCount } = moduleVolunteer;
  const { name, teachingStatus, instructors, careerPathway, category } = module;

  return (
    <StyledTableRow
      //   onClick={() => {
      //     navigate(`/admin/general-course/${id}`);
      //   }}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        // cursor: "pointer",
      }}
    >
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{counter + 1}</Typography>
      </StyledTableCell>
      {/* نام دوره */}
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{name}</Typography>
      </StyledTableCell>
      {/* نقش */}
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{"nist"}</Typography>
      </StyledTableCell>
      {/* مسیر مرتبط */}
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{careerPathway?.name}</Typography>
      </StyledTableCell>
      {/* گروه مرتبط */}
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{category?.name}</Typography>
      </StyledTableCell>
      {/* وضعیت دوره */}
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{teachingStatus}</Typography>
      </StyledTableCell>
      {/* مدرس(ها) */}
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        {instructors.length ? convertArrToStr(instructors) : "-"}
      </StyledTableCell>
      {/* مهارت‌آموزان */}
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{` ${studentsCount} مهارت‌آموز`}</Typography>
      </StyledTableCell>
      {/* نظرات و ارزیابی‌ها */}
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">مشاهده</Typography>
      </StyledTableCell>
      {/* ارزیابی روی هما فکری
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">مشاهده</Typography>
      </StyledTableCell> */}
    </StyledTableRow>
  );
};

export default TableBodyModuleVolunteer;
