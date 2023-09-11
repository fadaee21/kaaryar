import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import SearchAll from "../../components/search/SearchAll";
// import { useAuth } from "../../context/AuthProvider";
import { MoodleUser } from "../../model";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import useSWR from "swr";
import useCountPagination from "../../hooks/request/useCountPagination";
import { counterPagination } from "../../utils/counterPagination";
import TableEmpty from "../../components/table/TableEmpty";
<<<<<<< HEAD
import TableHeader from "../../components/table/TableHeader";
import { studentTableHeader } from "../../components/table/helper-header";
import { itemCounterTable } from "../../utils/itemCounterTable";
=======
import { TableHeaderStudent } from "../../components/table/TableHeader";
import { adminStudentTableHeader } from "../../components/table/helper-header";
>>>>>>> develop

import StudentAdminRowTable from "../../components/student/admin-table/StudentAdminRowTable";
const pageSize = 25;
// const adminStudentQuery =
//   "orderAscending=false&orderBy=after_week_update_timestamp";
const adminStudentQuery = "orderAscending=false&orderBy=regformGroup";
const STUDENT_COUNT = "moodle/user/student/count";
const StudentTableAdmin = () => {
  const [page, setPage] = useState(1);
<<<<<<< HEAD
  const pageSize = 25;
  // const adminStudentQuery =
  //   "orderAscending=false&orderBy=after_week_update_timestamp";
  const adminStudentQuery = "orderAscending=false&orderBy=regformGroup";

  const adminStudent = `moodle/user/student/all?pageNum=${page}&pageSize=${pageSize}&${adminStudentQuery}`;

  const studentCount = "moodle/user/student/count";
  const [, counterPage] = useCountPagination(studentCount);
=======
>>>>>>> develop
  const [chevronDir, setChevronDir] = useState(false);
  const ADMIN_STUDENT_URL = `moodle/user/student/all?pageNum=${page}&pageSize=${pageSize}&${adminStudentQuery}`;
  const [, counterPage] = useCountPagination(STUDENT_COUNT);
  const [searchingMoodleStudent, setSearchingMoodleStudent] = useState<
    any[] | null
  >(null);

  const { data, isLoading, error } = useSWR(ADMIN_STUDENT_URL, {
    onSuccess: () => window.scrollTo(0, 0),
  });

  if (isLoading) return <LoadingProgress />;
  if (error) {
    return (
      <Typography sx={{ display: "flex", justifyContent: "center" }}>
        Error: {error.message}
      </Typography>
    );
  }
  return (
    <Box sx={{ m: 2 }}>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h4"> فهرست مهارت آموزان</Typography>
          </Box>

          <AccordionStyled expanded={chevronDir}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <AccordionSummaryStyled
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => setChevronDir(!chevronDir)}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="button">جستجو</Typography>
              </AccordionSummaryStyled>
              {/* //! export excel */}
              <ExcelExport
                fileName={"excel export"}
                linkAll={`moodle/user/student/all?pageNum=1&pageSize=100000&${adminStudentQuery}`}
                searchData={searchingMoodleStudent?.map((i) => ({
                  "نام و نام خانوادگی": i.firstName + " " + i.family,
                  "نام کاربری": i.username,
                  شهر: i.registrationForm.city,
                  استان: i.registrationForm.province,
                  گروه: i.registrationForm.course,
                  "مؤسسه معرف": i.registrationForm.refer,
                  "وضعیت آموزش": i.statusForm?.trainingStatus?.value,
                  "قدم آتی آموزش": i.statusForm?.nextTrainingStep?.value,
                  "ارجاع به واحد مالی": i.statusForm?.referralToFinance?.value,
                  "ارزیابی کاریار": i.statusForm?.kaaryarAssessment?.value,
                }))}
                useIn="studentOfAdmin"
              />
            </Box>
            <AccordionDetails>
              {/* //! export excel */}
              <Box
                sx={{
                  my: 3,
                }}
              >
                <SearchAll
                  setSearchingMoodleStudent={setSearchingMoodleStudent}
                  searchPage="moodle"
                  chevronDir={chevronDir}
                />
              </Box>
            </AccordionDetails>
          </AccordionStyled>
          {/* //!for empty response of search return TableEmpty */}
          {searchingMoodleStudent?.length === 0 && <TableEmpty />}

<<<<<<< HEAD
              <TableBody>
                {(searchingMoodleStudent ? searchingMoodleStudent : data)?.map(
                  (moodleUser: MoodleUser, i: number) => {
=======
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer
            //  sx={{ maxHeight: 440 }}
            >
              <Table stickyHeader aria-label="simple table">
                {/* //!for empty response of search don't return TableHeader */}
                {searchingMoodleStudent?.length !== 0 && (
                  <TableHeaderStudent
                    studentHeaderItems={adminStudentTableHeader}
                  />
                )}

                <TableBody>
                  {(searchingMoodleStudent
                    ? searchingMoodleStudent
                    : data
                  )?.map((moodleUser: MoodleUser, i: number) => {
>>>>>>> develop
                    const {
                      id,
                      firstName,
                      family,
                      username,
                      picture,
                      city,
                      statusForm,
                      registrationForm,
                      careerPathway,
                    } = moodleUser;
                    return (
                      <StudentAdminRowTable
                        key={id}
<<<<<<< HEAD
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell
                          align="center"
                          sx={{
                            verticalAlign: "center",
                          }}
                        >
                          <Typography variant="body2">
                            {searchingMoodleStudent
                              ? i + 1
                              : itemCounterTable(page, pageSize, i)}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TablePic picture={picture} lastName={family} />
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{
                            verticalAlign: "center",
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
                            verticalAlign: "center",
                          }}
                        >
                          <Typography variant="body2" textAlign={"center"}>
                            {username}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          sx={{
                            verticalAlign: "center",
                          }}
                        >
                          <Typography variant="body2">
                            {registrationForm?.city || city || "-"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{
                            verticalAlign: "center",
                          }}
                        >
                          <Typography variant="body2">
                            {registrationForm?.province || "-"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{
                            verticalAlign: "center",
                          }}
                        >
                          <Typography variant="body2">
                            {registrationForm?.course}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{
                            verticalAlign: "center",
                          }}
                        >
                          <Typography variant="body2">
                            {registrationForm?.refer || "-"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{
                            verticalAlign: "center",
                          }}
                        >
                          <Typography variant="body2">
                            {statusForm?.trainingStatus?.value || "-"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{
                            verticalAlign: "center",
                          }}
                        >
                          <Typography variant="body2">
                            {statusForm?.nextTrainingStep?.value || "-"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{
                            verticalAlign: "center",
                          }}
                        >
                          <Typography variant="body2">
                            {statusForm?.referralToFinance?.value || "-"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{
                            verticalAlign: "center",
                          }}
                        >
                          <Typography variant="body2">
                            {statusForm?.kaaryarAssessment?.value || "-"}
                          </Typography>
                        </StyledTableCell>
                      </StyledTableRow>
=======
                        id={id}
                        firstName={firstName}
                        family={family}
                        username={username}
                        picture={picture}
                        city={city}
                        statusForm={statusForm}
                        registrationForm={registrationForm}
                        careerPathway={careerPathway}
                        i={i}
                        searchingMoodleStudent={searchingMoodleStudent}
                        page={page}
                        pageSize={pageSize}
                      />
>>>>>>> develop
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
      {!searchingMoodleStudent && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 4,
          }}
          size="large"
          count={counterPagination(counterPage, pageSize)}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(_event, value: number) => {
            setPage(value);
          }}
        />
      )}
    </Box>
  );
};
export default StudentTableAdmin;
