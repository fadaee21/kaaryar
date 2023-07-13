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
import { useNavigate } from "react-router-dom";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import SearchAll from "../../components/search/SearchAll";
import TablePic from "../../components/table/TablePic";
// import { useAuth } from "../../context/AuthProvider";
import { MoodleUser } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import styleRot from "../../styles/search/searchChevron.module.css";
import useSWR from "swr";
import useCountPagination from "../../hooks/request/useCountPagination";
import { counterPagination } from "../../utils/counterPagination";
import TableEmpty from "../../components/table/TableEmpty";
import TableHeader from "../../components/table/TableHeader";
import { studentTableHeader } from "../../components/table/helper-header";

const StudentTableAdmin = () => {
  const [page, setPage] = useState(1);
  const pageSize = 25;
  const adminStudentQuery =
    "orderAscending=false&orderBy=after_week_update_timestamp";
  const adminStudent = `moodle/user/student/all?pageNum=${page}&pageSize=${pageSize}&${adminStudentQuery}`;

  const studentCount = "moodle/user/student/count";
  const [, counterPage] = useCountPagination(studentCount);
  const [chevronDir, setChevronDir] = useState(false);
  const [searchingMoodleStudent, setSearchingMoodleStudent] = useState<
    any[] | null
  >(null);

  const { data, isLoading, error } = useSWR(adminStudent, {
    onSuccess: () => window.scrollTo(0, 0),
  });

  // const { auth } = useAuth();
  // const roles = auth.roles.toString();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingProgress />;
  }
  if (error) {
    navigate("/");
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

          <AccordionStyled>
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
              >
                <Typography variant="button">جستجو</Typography>
                <ExpandMoreIcon
                  className={chevronDir ? styleRot.rotate180 : styleRot.rotate0}
                />

                {/* //! export excel */}
              </AccordionSummaryStyled>
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              {/* //!for empty response of search don't return TableHeader */}
              {searchingMoodleStudent?.length !== 0 && (
                <TableHeader headerItems={studentTableHeader} />
              )}

              <TableBody>
                {(searchingMoodleStudent ? searchingMoodleStudent : data)?.map(
                  (moodleUser: MoodleUser) => {
                    const {
                      id,
                      firstName,
                      family,
                      username,
                      picture,
                      city,
                      statusForm,
                      registrationForm,
                    } = moodleUser;
                    return (
                      <StyledTableRow
                        key={id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell align="center">
                          {/* //TODO: add picture */}
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
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
            setChevronDir(false); //after changing the page close search bar
          }}
        />
      )}
    </Box>
  );
};
export default StudentTableAdmin;
