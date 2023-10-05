import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { studentsGroup } from "../../../model";
import { CoreModuleCourseStudentsCompHeaders } from "../../table/helper-header";
import { TableHeaderStudent } from "../../table/TableHeader";
import {
  StyledTableCellAdmin,
  StyledTableRowAdmin,
  StyledTypographyAdmin,
} from "../../../styles/adminTable";
import TablePic from "../../table/TablePic";
// import RowViewStatus from "../../student/admin-table/RowViewStatus";
import RowViewAssigning from "../../student/admin-table/RowViewAssigning";
interface Props {
  students: studentsGroup[] | undefined;
}
const GroupCourseStudentsComp = ({ students }: Props) => {
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "auto",
        position: "relative",
        zIndex: 0,
      }}
    >
      <TableContainer>
        <Table
          stickyHeader
          aria-label="simple table"
          sx={{ tableLayout: "auto" }}
        >
          <TableHeaderStudent
            studentHeaderItems={CoreModuleCourseStudentsCompHeaders}
          />
          <TableBody>
            {students?.map((moodleUser: studentsGroup, i: number) => {
              const {
                id,
                firstName,
                family,
                username,
                city,
                picture,
                registrationForm,
                currentAssignedMentor,
                currentAssignedTA,
                careerPathway,
              } = moodleUser;

              const mentorFullName = currentAssignedMentor
                ? currentAssignedMentor.personnel.firstName +
                  " " +
                  currentAssignedMentor.personnel.family
                : "-";
              const taFullName = currentAssignedTA
                ? currentAssignedTA.personnel.firstName +
                  " " +
                  currentAssignedTA.personnel.family
                : "-";

              return (
                <StyledTableRowAdmin
                  key={id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <StyledTableCellAdmin align="center">
                    <StyledTypographyAdmin variant="body2" textAlign={"center"}>
                      {i + 1}
                    </StyledTypographyAdmin>
                  </StyledTableCellAdmin>
                  <StyledTableCellAdmin align="center">
                    <TablePic picture={picture} lastName={family} />
                  </StyledTableCellAdmin>
                  <StyledTableCellAdmin align="center">
                    <StyledTypographyAdmin variant="body2" textAlign={"center"}>
                      {firstName + " " + family}
                    </StyledTypographyAdmin>
                  </StyledTableCellAdmin>
                  {/* "نام کاربری" */}
                  <StyledTableCellAdmin align="center">
                    <StyledTypographyAdmin variant="body2" textAlign={"center"}>
                      {username}
                    </StyledTypographyAdmin>
                  </StyledTableCellAdmin>
                  {/* "گروه" */}
                  <StyledTableCellAdmin align="center">
                    <StyledTypographyAdmin variant="body2">
                      {registrationForm?.course}
                    </StyledTypographyAdmin>
                  </StyledTableCellAdmin>
                  {/* "استان" */}
                  <StyledTableCellAdmin align="center">
                    <StyledTypographyAdmin variant="body2">
                      {registrationForm?.province || "-"}
                    </StyledTypographyAdmin>
                  </StyledTableCellAdmin>
                  {/* "شهر" */}
                  <StyledTableCellAdmin align="center">
                    <StyledTypographyAdmin variant="body2">
                      {registrationForm?.city || city || "-"}
                    </StyledTypographyAdmin>
                  </StyledTableCellAdmin>
                  {/* "معرف" */}
                  <StyledTableCellAdmin align="center">
                    <StyledTypographyAdmin variant="body2">
                      {registrationForm?.refer || "-"}
                    </StyledTypographyAdmin>
                  </StyledTableCellAdmin>
                  {/* "مسیر آموزشی" */}
                  <StyledTableCellAdmin align="center">
                    <StyledTypographyAdmin variant="body2" textAlign={"center"}>
                      {careerPathway?.description ?? "-"}
                    </StyledTypographyAdmin>
                  </StyledTableCellAdmin>
                  <RowViewAssigning
                    mentorFullName={mentorFullName}
                    taFullName={taFullName}
                  />
                  {/* <RowViewStatus statusForm={statusForm} /> */}
                </StyledTableRowAdmin>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default GroupCourseStudentsComp;
