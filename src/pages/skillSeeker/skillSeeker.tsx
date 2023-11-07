import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import TableHeader from "../../components/table/TableHeader";
import useCountPagination from "../../hooks/request/useCountPagination";
import { CareerPathway, Group, SeekerStudent } from "../../model";
import { counterPagination } from "../../utils/counterPagination";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import { seekerTableHeader } from "../../components/table/helper-header";
import useSWR from "swr";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { itemCounterTable } from "../../utils/itemCounterTable";
import TableEmpty from "../../components/table/TableEmpty";
import SkillSeekerRowTable from "../../components/table/SkillSeekerRowTable";
import SearchSeeker from "../../components/search/SearchSeeker";
const orderingOpt = "orderAscending=true&orderBy=name&pageNum=1&pageSize=10000";
const pageSize = 20;
const heightOfTable = 500;
const loadingBoxHeight = heightOfTable - 160;
const examFormCount = "/status/form/count";
const SkillSeeker = () => {
  const [searchMode, setSearchMode] = useState(false);
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);

  let SEEKER_STUDENT;
  SEEKER_STUDENT = `/status/form/all?pageNum=${page}&pageSize=${pageSize}&orderBy=latest_action_date`;

  let [searchParams] = useSearchParams();

  const hasQueryParams = () => {
    return !searchParams.keys().next().done;
  };

  useEffect(() => {
    setChevronDir(hasQueryParams());
    setSearchMode(hasQueryParams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (hasQueryParams()) {
    const searchLink = "/status/form/all?pageNum=1&pageSize=10000";
    SEEKER_STUDENT = searchLink + `&${searchParams}`;
  }

  const [, counterPage] = useCountPagination(examFormCount);

  const {
    data,
    isLoading: loading,
    error,
  } = useSWR(SEEKER_STUDENT, {
    revalidateOnMount: true,
  });
  const { data: groupData, isLoading: loadingGroup } = useSWR<Group[]>(
    chevronDir
      ? "/modules/categories/short-details/all?orderAscending=true&orderBy=name"
      : null
  );
  const { data: careerPathwayData, isLoading: loadingCareerPathwayData } =
    useSWR<CareerPathway[]>(
      chevronDir ? `/modules/career-pathways/all?${orderingOpt}` : null
    );

  if (error) {
    toast.error(handleError(error));
    if (error.response.status === 401) {
      return <Navigate to="/" replace />;
    }
  }

  return (
    <>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h4"> فهرست متقاضیان</Typography>
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

              <ExcelExport
                fileName={"status seeker Table"}
                searchData={null} //TODO:use this when you search a data, don't get data again for excel
                linkAll={
                  hasQueryParams()
                    ? SEEKER_STUDENT
                    : "/status/form/all?pageNum=1&pageSize=100000"
                }
                useIn="seeker"
              />
            </Box>
            <AccordionDetails>
              {/* //!component for searching student */}
              <Box
                sx={{
                  width: "100%",
                  my: 3,
                }}
              >
                {!loadingGroup && !loadingCareerPathwayData ? (
                  <SearchSeeker
                    groupData={groupData}
                    searchPage="skillSeeker"
                    loading={loading}
                    setSearchMode={setSearchMode}
                    careerPathwayData={careerPathwayData}
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
            {loading ? (
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
                    <TableHeader headerItems={seekerTableHeader} />
                  )}
                  <TableBody>
                    {data?.map((seekerStudent: SeekerStudent, i: number) => {
                      const {
                        id,
                        regForm,
                        AfterWeekForm,
                        hasLMSUser,
                        actions,
                      } = seekerStudent;

                      const latestActions = actions?.[actions.length - 1];

                      return (
                        <SkillSeekerRowTable
                          key={id}
                          id={id}
                          family={regForm?.family}
                          firstName={regForm?.firstName}
                          registrationCode={regForm?.registrationCode}
                          group={regForm?.course}
                          selectedField={regForm?.selectedField}
                          resultStatus={latestActions?.status}
                          date={latestActions?.date}
                          index={itemCounterTable(page, pageSize, i)}
                          finalResult={AfterWeekForm?.finalResult}
                          finalField={AfterWeekForm?.finalField}
                          familiarity={regForm?.familiarity}
                          refer={regForm?.refer}
                          hasLMSUser={hasLMSUser}
                          workshopCont={AfterWeekForm?.workshopCont}
                          presentStatus={AfterWeekForm?.presentStatus}
                          scholar={AfterWeekForm?.scholar}
                          careerPathway={AfterWeekForm?.careerPathway?.name}
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
      {!searchMode && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 4,
          }}
          size="large"
          count={counterPagination(counterPage, 20)}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(_event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
          }}
        />
      )}
    </>
  );
};

export default SkillSeeker;
