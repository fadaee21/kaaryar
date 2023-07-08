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
import { StudentEdu } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { AccordionStyled } from "../../styles/search/accordion";
import useSWR from "swr";
import TableHeader from "../../components/table/TableHeader";
import { studentTableHeader } from "../../components/table/helper-header";
//^this component list related student for mentor and ta
const StudentAssignee = () => {
  const { auth } = useAuth();
  const roles = auth.roles.toString();
  const { data, isLoading, error } = useSWR<StudentEdu[]>(
    `/${roles}/user/student`
  );
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingProgress />;
  }

  if (error) {
    console.log(error);
    navigate("/");
  }

  return (
    <Box sx={{ m: 2, mb: 10 }}>
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
                linkAll={`/${roles}/user/student`}
                searchData={null}
                useIn="studentListMoodleTable"
              />
            </Box>
          </AccordionStyled>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader headerItems={studentTableHeader} />
              <TableBody>
                {data?.map((moodleUser: StudentEdu, i: React.Key) => {
                  const {
                    id,
                    firstName,
                    family,
                    username,
                    city,
                    email,
                    mobile,
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
                        align="center"
                        sx={{ width: "5%", verticalAlign: "top" }}
                      >
                        <TablePic2 studentId={id} lastName={family} />
                        {/* <TablePic picture={picture} lastName={lastName} /> */}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          width: "25%",
                          verticalAlign: "top",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`${id}`)}
                      >
                        <Typography variant="body1">
                          {firstName + " " + family}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          width: "10%",
                          verticalAlign: "top",
                        }}
                      >
                        <Typography variant="body2" textAlign={"left"}>
                          {username}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        sx={{
                          width: "30%",
                          verticalAlign: "top",
                        }}
                      >
                        <Typography variant="body2">{city}</Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          width: "30%",
                          verticalAlign: "top",
                        }}
                      >
                        <Typography variant="body2">{mobile}</Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        sx={{
                          width: "30%",
                          verticalAlign: "top",
                        }}
                      >
                        <Typography variant="body2">{email}</Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};
export default StudentAssignee;
