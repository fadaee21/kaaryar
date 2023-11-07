import {
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import SearchAll from "../../components/search/SearchAll";
import TableBodyAll from "../../components/table/TableBodyAll";
import TableHeader from "../../components/table/TableHeader";
import useApproveMulti from "../../hooks/request/useApproveMulti";
import useCountPagination from "../../hooks/request/useCountPagination";
import { BeforeWeekType } from "../../model";
import { counterPagination } from "../../utils/counterPagination";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import TableEmpty from "../../components/table/TableEmpty";
import { useHandleCheckBox } from "../../hooks/request/useHandleCheckBox";
import { beforeTableHeader } from "../../components/table/helper-header";
import { itemCounterTable } from "../../utils/itemCounterTable";
import useSWR from "swr";
import { persianDate } from "../../utils/persianDate";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { Navigate, useSearchParams } from "react-router-dom";
const pageSize = 20;
const heightOfTable = 500;
const loadingBoxHeight = heightOfTable - 160;
const BeforeWeekTable = () => {
  const [searchMode, setSearchMode] = useState(false);
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);
  let BEFORE_STUDENT;
  BEFORE_STUDENT = `/exam/before/week/form/all?pageNum=${page}&pageSize=${pageSize}`;

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
    const searchLink =
      "/exam/before/week/search/param?pageNum=1&pageSize=10000";
    BEFORE_STUDENT = searchLink + `&${searchParams}`;
  }

  const examFormCount = "/exam/before/week/form/count";
  const [, counterPage] = useCountPagination(examFormCount);

  const {
    data,
    isLoading: loading,
    error,
    mutate,
  } = useSWR(BEFORE_STUDENT, {
    revalidateOnMount: true,
  });
  const { getApproveMulti, loadingMulti } = useApproveMulti(mutate);

  //handle multi selected checkbox
  const { handleCheckBox, ids, setIds } = useHandleCheckBox();
  console.log(ids);
  useEffect(() => {
    setIds([]);
    // eslint-disable-next-line
  }, [loadingMulti]);

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
            <Typography variant="h4"> فهرست ارزیابی</Typography>
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
              <Box sx={{ ml: "auto" }}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    getApproveMulti(
                      ids,
                      "/exam/before/week/form/multiple",
                      true
                    );
                  }}
                  disabled={ids.length === 0}
                  sx={{ mr: 0.5 }}
                >
                  تایید کردن گروهی
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() =>
                    getApproveMulti(
                      ids,
                      "/exam/before/week/form/multiple",
                      false
                    )
                  }
                  disabled={ids.length === 0}
                  sx={{ mr: 0.5 }}
                >
                  رد کردن گروهی
                </Button>
                <ExcelExport
                  fileName={"Before Week Table"}
                  searchData={null}
                  linkAll={
                    hasQueryParams()
                      ? BEFORE_STUDENT
                      : "/exam/before/week/form/all?pageNum=1&pageSize=100000"
                  }
                  useIn="before"
                />
              </Box>
            </Box>
            <AccordionDetails>
              {/* //!component for searching student */}
              <Box
                sx={{
                  width: "100%",
                  my: 3,
                }}
              >
                <SearchAll
                  searchPage="beforeWeek"
                  loading={loading}
                  setSearchMode={setSearchMode}
                />
              </Box>
            </AccordionDetails>
          </AccordionStyled>

          {/* //!for empty response of search return TableEmpty */}
          {data?.length === 0 && <TableEmpty />}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {loading || loadingMulti ? (
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
                    <TableHeader headerItems={beforeTableHeader} />
                  )}

                  <TableBody>
                    {data.map((examRegisterUser: BeforeWeekType, i: number) => {
                      const {
                        id,
                        motivation,
                        jobStandby,
                        decidedAt,
                        registrationForm: {
                          province,
                          city,
                          family,
                          firstName,
                          // registrationCode,
                          mobile,
                          email,
                          studyField,
                          course,
                          createdAt,
                        },
                        acceptWeekChecked,
                        contCourseApproach,
                      } = examRegisterUser;

                      return (
                        <TableBodyAll
                          key={id}
                          id={id}
                          province={province}
                          city={city}
                          studyField={studyField}
                          motivation={motivation}
                          jobStandby={jobStandby}
                          family={family}
                          firstName={firstName}
                          // registrationCode={registrationCode}
                          mobile={mobile}
                          email={email}
                          directNav="before-week"
                          contCourseApproach={contCourseApproach}
                          checked={acceptWeekChecked}
                          handleCheckBox={handleCheckBox}
                          checkBoxDisplay={
                            !!data &&
                            searchParams.get("approvalStatus") === "pending"
                          }
                          index={
                            data ? i + 1 : itemCounterTable(page, pageSize, i)
                          }
                          course={course}
                          createdAt={persianDate(createdAt)}
                          decidedAt={persianDate(decidedAt)}
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
          count={counterPagination(counterPage, pageSize)}
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

export default BeforeWeekTable;
