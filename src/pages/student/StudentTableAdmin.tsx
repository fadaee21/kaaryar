import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import {
  CareerPathway,
  Group,
  ModuleAll,
  MoodleUser,
  Profile,
} from "../../model";
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
import { TableHeaderStudent } from "../../components/table/TableHeader";
import { adminStudentTableHeader } from "../../components/table/helper-header";
import StudentAdminRowTable from "../../components/student/admin-table/StudentAdminRowTable";
import SearchAllStudent from "../../components/student/search-student/SearchAllStudent";
import { useSearchParams } from "react-router-dom";
import useGetStatusStudent from "../../hooks/request/useGetStatusStudent";

const pageSize = 25;
const heightOfTable = 500;
const loadingBoxHeight = heightOfTable - 160;
// const adminStudentQuery =
//   "orderAscending=false&orderBy=after_week_update_timestamp";
const adminStudentQuery = "orderAscending=false&orderBy=regformGroup";
const STUDENT_COUNT = "moodle/user/student/count";

const StudentTableAdmin = () => {
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);
  let ADMIN_STUDENT_URL;
  ADMIN_STUDENT_URL = `moodle/user/student/all?pageNum=${page}&pageSize=${pageSize}&${adminStudentQuery}`;

  const [, counterPage] = useCountPagination(STUDENT_COUNT);

  //all search options that comes from server
  const {
    trainingData,
    trainingLoading,
    nextStepData,
    nextStepLoading,
    referralToFinanceData,
    referralLoading,
    kaaryarAssessmentData,
    kaaryarAssessmentLoading,
  } = useGetStatusStudent(true);
  const orderingOpt =
    "orderAscending=true&orderBy=name&pageNum=1&pageSize=10000";
  const { data: groupData, isLoading: loadingGroupData } = useSWR<Group[]>(
    chevronDir ? `/modules/categories/short-details/all?${orderingOpt}` : null
  );
  const { data: careerPathwayData, isLoading: loadingCareerPathwayData } =
    useSWR<CareerPathway[]>(
      chevronDir ? `/modules/career-pathways/all?${orderingOpt}` : null
    );
  const { data: moduleData, isLoading: loadingModuleData } = useSWR<
    ModuleAll[]
  >(chevronDir ? `/modules/short-details/all?${orderingOpt}` : null);
  const { data: volunteerData, isLoading: loadingVolunteerData } =
    useSWR<Profile[]>("/user/profile/all?pageNum=1&pageSize=10000");

  let [searchParams] = useSearchParams();

  const hasQueryParams = () => {
    return !searchParams.keys().next().done;
  };
  useEffect(() => {
    setChevronDir(hasQueryParams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (hasQueryParams()) {
    const searchLink =
      "/moodle/search/param?pageNum=1&pageSize=10000&orderAscending=false&orderBy=regformGroup";
    ADMIN_STUDENT_URL = searchLink + `&${searchParams}`;
  }

  const { data, isLoading, error } = useSWR<MoodleUser[]>(ADMIN_STUDENT_URL, {
    revalidateOnMount: true,
  });

  if (error) {
    return (
      <Typography sx={{ display: "flex", justifyContent: "center" }}>
        Error: {error.message}
      </Typography>
    );
  }
  const searchOptionsResultCondition =
    groupData &&
    careerPathwayData &&
    moduleData &&
    volunteerData &&
    trainingData &&
    nextStepData &&
    referralToFinanceData &&
    kaaryarAssessmentData;
  const SearchLoadingCondition =
    loadingGroupData &&
    loadingCareerPathwayData &&
    loadingModuleData &&
    loadingVolunteerData &&
    trainingLoading &&
    nextStepLoading &&
    referralLoading &&
    kaaryarAssessmentLoading;

  return (
    <>
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
                linkAll={
                  hasQueryParams()
                    ? ADMIN_STUDENT_URL
                    : `moodle/user/student/all?pageNum=1&pageSize=10000&${adminStudentQuery}`
                }
                searchData={null}
                useIn="studentOfAdmin"
              />
            </Box>
            <AccordionDetails>
              <Box sx={{ my: 3 }}>
                {searchOptionsResultCondition && !SearchLoadingCondition ? (
                  <SearchAllStudent
                    searchPage="moodle"
                    groupData={groupData}
                    careerPathwayData={careerPathwayData}
                    moduleData={moduleData}
                    volunteerData={volunteerData}
                    trainingData={trainingData}
                    nextStepData={nextStepData}
                    referralToFinanceData={referralToFinanceData}
                    kaaryarAssessmentData={kaaryarAssessmentData}
                    isLoading={isLoading}
                  />
                ) : (
                  <LoadingProgress usage="paper" />
                )}
              </Box>
            </AccordionDetails>
          </AccordionStyled>
          {/* //!for empty response of search return TableEmpty */}
          {data?.length === 0 && <TableEmpty />}

          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {isLoading ? (
              <Box sx={{ m: 10, height: loadingBoxHeight }}>
                <LoadingProgress usage="paper" size={40} />
              </Box>
            ) : (
              <TableContainer sx={{ maxHeight: heightOfTable }}>
                <Table
                  stickyHeader
                  aria-label="simple table"
                  sx={{ tableLayout: "auto" }}
                >
                  {/* //!for empty response of search don't return TableHeader */}
                  {data?.length !== 0 && (
                    <TableHeaderStudent
                      studentHeaderItems={adminStudentTableHeader}
                    />
                  )}

                  <TableBody>
                    {data?.map((moodleUser, i) => {
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
                        currentAssignedMentor,
                        currentAssignedTA,
                        currentModuleAsStudent,
                        latestEnrolledModule,
                      } = moodleUser;
                      return (
                        <StudentAdminRowTable
                          key={id}
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
                          countAll={hasQueryParams()}
                          page={page}
                          pageSize={pageSize}
                          currentAssignedMentor={currentAssignedMentor}
                          currentAssignedTA={currentAssignedTA}
                          currentModuleAsStudent={currentModuleAsStudent}
                          latestEnrolledModule={latestEnrolledModule}
                          kaaryarAssessmentData={kaaryarAssessmentData}
                          volunteerData={volunteerData}
                          trainingData={trainingData}
                          nextStepData={nextStepData}
                          referralToFinanceData={referralToFinanceData}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Container>
      </Box>
      {!hasQueryParams() && (
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
    </>
  );
};
export default StudentTableAdmin;
