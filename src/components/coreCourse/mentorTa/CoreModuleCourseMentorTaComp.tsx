import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { TeachingAssistantMentorWithProfile } from "../../../model";
import { CoreModuleCourseMentorTaCompHeaders } from "../../table/helper-header";
import { TableHeaderStudent } from "../../table/TableHeader";
import {
  StyledTableCellAdmin,
  StyledTableRowAdmin,
  StyledTypographyAdmin,
} from "../../../styles/adminTable";
import TablePic from "../../table/TablePic";

interface Props {
  mentorTa: TeachingAssistantMentorWithProfile[] | undefined;
}
const CoreModuleCourseMentorTaComp = ({ mentorTa }: Props) => {
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
            studentHeaderItems={CoreModuleCourseMentorTaCompHeaders}
          />
          <TableBody>
            {mentorTa?.map(
              (mentor: TeachingAssistantMentorWithProfile, i: number) => {
                const { id, firstName, family, picture, profile } = mentor;
                const { isActive, role } = profile || {};
                return (
                  <StyledTableRowAdmin
                    key={id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <StyledTableCellAdmin align="center">
                      <StyledTypographyAdmin
                        variant="body2"
                        textAlign={"center"}
                      >
                        {i + 1}
                      </StyledTypographyAdmin>
                    </StyledTableCellAdmin>
                    <StyledTableCellAdmin align="center">
                      <TablePic picture={picture} lastName={family} />
                    </StyledTableCellAdmin>
                    <StyledTableCellAdmin align="center">
                      <StyledTypographyAdmin
                        variant="body2"
                        textAlign={"center"}
                      >
                        {firstName + " " + family}
                      </StyledTypographyAdmin>
                    </StyledTableCellAdmin>
                    <StyledTableCellAdmin align="center">
                      <StyledTypographyAdmin
                        variant="body2"
                        textAlign={"center"}
                      >
                        {role}
                      </StyledTypographyAdmin>
                    </StyledTableCellAdmin>
                    <StyledTableCellAdmin align="center">
                      <StyledTypographyAdmin
                        variant="body2"
                        textAlign={"center"}
                      >
                        {isActive ? "فعال" : "غیرفعال"}
                      </StyledTypographyAdmin>
                    </StyledTableCellAdmin>
                  </StyledTableRowAdmin>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CoreModuleCourseMentorTaComp;
