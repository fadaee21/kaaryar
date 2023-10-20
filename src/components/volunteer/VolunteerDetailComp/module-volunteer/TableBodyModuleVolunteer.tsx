import { ModuleVolunteerProfile } from "../../../../model";
import { StyledTableCell, StyledTableRow } from "../../../../styles/table";
import { Typography } from "@mui/material";
import { convertArrToStr } from "../../../../utils/courseMethod";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";
interface Props {
  counter: number;
  moduleVolunteer: ModuleVolunteerProfile;
  // whoCanSeeComments: boolean;
}
const TableBodyModuleVolunteer = ({
  counter,
  moduleVolunteer,
}: // whoCanSeeComments,
Props) => {
  const { module, studentsCount, assignedRole } = moduleVolunteer;
  const {
    name,
    teachingStatus,
    instructors,
    careerPathway,
    category,
    id,
    moduleType,
  } = module;
  const {
    auth: { roles },
  } = useAuth();
  console.log(roles[0]);
  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{counter + 1}</Typography>
      </StyledTableCell>
      {/* نام دوره */}
      <StyledTableCell
        align="center"
        sx={{ verticalAlign: "center", cursor: "pointer" }}
      >
        <Typography variant="body2">
          <Link
            to={`/${roles[0]}/${
              moduleType === "core" ? "core-course" : "general-course"
            }/${id}`}
          >
            {name}
          </Link>
        </Typography>
      </StyledTableCell>
      {/* نقش */}
      <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
        <Typography variant="body2">{assignedRole || "-"}</Typography>
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
      <StyledTableCell
        align="center"
        sx={{ verticalAlign: "center", cursor: "pointer" }}
      >
        <Typography variant="body2">
          <Link to={`module-students/${id}`}>
            {` ${studentsCount} مهارت‌آموز`}
          </Link>
        </Typography>
      </StyledTableCell>
      {/* نظرات  */}
      {/* {whoCanSeeComments && (
        <StyledTableCell align="center" sx={{ verticalAlign: "center" }}>
          <Typography variant="body2">مشاهده</Typography>
        </StyledTableCell>
      )} */}
    </StyledTableRow>
  );
};

export default TableBodyModuleVolunteer;
