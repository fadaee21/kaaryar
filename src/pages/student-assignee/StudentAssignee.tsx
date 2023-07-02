import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import { TablePic2 } from "../../components/table/TablePic";
import { useAuth } from "../../context/AuthProvider";
import { MoodleUserAssignee } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { AccordionStyled } from "../../styles/search/accordion";
import useGetMoodleStudents from "../../hooks/request/useGetMoodleStudents";
import TableHeader from "../../components/table/TableHeader";
import { studentTableHeader } from "../../components/table/helper-header";
//^this component list related student for mentor and ta
const StudentAssignee = () => {
  const { students, loading } = useGetMoodleStudents("/moodle/user/assignee");

  const { auth } = useAuth();
  const roles = auth.roles.toString();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <Box sx={{ m: 2, mb: 20 }}>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h4"> فهرست مهارت آموزان</Typography>
          </Box>

          <AccordionStyled>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                mb: 1.5,
              }}
            >
              {/* //! export excel */}

              <ExcelExport
                fileName={"excel export"}
                linkAll="/moodle/user/assignee"
                searchData={null}
                useIn="studentListMoodleTable"
              />
            </Box>
          </AccordionStyled>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader headerItems={studentTableHeader} />
              <TableBody>
                {students.map(
                  (moodleUser: MoodleUserAssignee, i: React.Key) => {
                    if (!moodleUser.assigneeContext.student) {
                      return false;
                    }
                    const {
                      assigneeContext: {
                        student: {
                          studentMobile,
                          studentId,
                          studentUserName,
                          studentEmail,
                          studentCity,
                          studentFirstName,
                          studentLastName,
                        },
                      },
                    } = moodleUser;
                    return (
                      <StyledTableRow
                        //TODO: id from moodle Assignee is not unique for now insert index for key
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell
                          align="left"
                          sx={{ width: "5%", verticalAlign: "top" }}
                        >
                          <TablePic2
                            studentId={studentId}
                            lastName={studentLastName}
                          />
                          {/* <TablePic picture={picture} lastName={lastName} /> */}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "25%",
                            verticalAlign: "top",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            navigate(`/${roles}/student/${studentId}`)
                          }
                        >
                          <Typography variant="body1">
                            {studentFirstName + " " + studentLastName}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "10%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2" textAlign={"left"}>
                            {studentUserName}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "30%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2">{studentCity}</Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "30%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2">
                            {studentMobile}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          sx={{
                            width: "30%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2">
                            {studentEmail}
                          </Typography>
                        </StyledTableCell>

                        {/* <StyledTableCell
                        align="left"
                        sx={{ width: "30%", verticalAlign: "top" }}
                      >
                        <ListItem sx={{ pt: 0 }}> */}
                        {/* <ButtonGroup
                            variant="contained"
                            color="secondary"
                            size="small"
                            aria-label="small button group"
                          >
                            <Button
                              onClick={() =>
                                navigate(`/${roles}/student/${id}`)
                              }
                            >
                              جزییات
                            </Button>
                            <Button>ویرایش</Button>
                          </ButtonGroup> */}
                        {/* </ListItem>
                      </StyledTableCell> */}
                      </StyledTableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      {/* {!searchingMoodleStudent && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 4,
          }}
          size="large"
          count={24}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
          }}
        />
      )} */}
    </Box>
  );
};
export default StudentAssignee;
