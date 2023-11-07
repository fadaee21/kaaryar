// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../../styles/table";
import { Typography } from "@mui/material";
interface Props {
  counter: number;
  studentFullName: string;
  categoryName: string | undefined;
  province: string | undefined;
  city: string | undefined;
  refer: string | undefined;
  careerPathwayName: string | undefined;
  assignedTaFullName: string | undefined;
  assignedMentorFullName: string | undefined;
  finalGrade: number | undefined;
  finalAssessmentValue: string | undefined;
  teachingStatus: string | undefined;
  moduleName: string | undefined;
  role: string;
  id: number;
  // whoCanSeeCommentField: boolean;
}
const StudentVolunteerRowComp = ({
  counter,
  assignedMentorFullName,
  assignedTaFullName,
  finalAssessmentValue,
  finalGrade,
  careerPathwayName,
  categoryName,
  province,
  city,
  refer,
  studentFullName,
  teachingStatus,
  moduleName,
  id,
  role,
}: // whoCanSeeCommentField,
Props) => {
  // const navigate = useNavigate();
  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
     <StyledTableCell align="center" >
        <Typography variant="body2">{counter}</Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">
          <Link to={`/${role}/student/${id}`}>{studentFullName}</Link>
        </Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{categoryName ?? "-"}</Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{province || "-"}</Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        {city || "-"}
      </StyledTableCell>
     <StyledTableCell align="center" >
        {refer || "-"}
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{careerPathwayName || "-"}</Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{moduleName}</Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{teachingStatus || "-"}</Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">
          <Typography variant="body2">{assignedTaFullName || "-"}</Typography>
        </Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        {assignedMentorFullName || "-"}
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{finalGrade ?? "-"}</Typography>
      </StyledTableCell>
     <StyledTableCell align="center" >
        <Typography variant="body2">{finalAssessmentValue || "-"}</Typography>
      </StyledTableCell>
      {/* {whoCanSeeCommentField && (
        <StyledTableCell
          align="center"
          sx={{ verticalAlign: "center", cursor: "pointer" }}
          // onClick={() => navigate(`${id}`)}
        >
          <Typography variant="body2">مشاهده</Typography>
        </StyledTableCell>
      )} */}
    </StyledTableRow>
  );
};

export default StudentVolunteerRowComp;
