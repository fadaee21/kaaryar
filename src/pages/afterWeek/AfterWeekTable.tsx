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
import useCountPagination from "../../hooks/request/useCountPagination";
import { AfterWeekType } from "../../model";
import { counterPagination } from "../../utils/counterPagination";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import style from "../../styles/search/searchChevron.module.css";
import TableEmpty from "../../components/table/TableEmpty";
import useApproveMulti from "../../hooks/request/useApproveMulti";
import { useHandleCheckBox } from "../../hooks/request/useHandleCheckBox";
import useGetListLearner from "../../hooks/request/useGetListLearner";

const AfterWeekTable = () => {
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);
  // these two below state level up from search component because i have to handle these state values after trigger useApproveMulti, also these just use for this page
  const [stateWaiting, setStateWaiting] = useState<boolean | null>(null); //this state is for handling statusState===null
  const [statusState, setStatusState] = useState<boolean | null>(null);
  const [searchingStudentAfter, setSearchingStudentAfter] = useState<
    AfterWeekType[] | null
  >(null);

  const pageSize = 20;
  const allStudentAfterWeek = `/exam/after/week/form/all?pageNum=${
    page - 1
  }&pageSize=${pageSize}`;
  const examFormCount = "/exam/after/week/form/count";
  const [, counterPage] = useCountPagination(examFormCount);
  const { getApproveMulti, loadingMulti } = useApproveMulti();
  const { students, getListLearner, loading } = useGetListLearner(
    allStudentAfterWeek,
    loadingMulti,
    page
  );

  useEffect(() => {
    getListLearner();
    window.scrollTo(0, 0);
    setChevronDir(false); //after changing the page close search bar
  }, [getListLearner]);
  //handle multi selected checkbox
  const { handleCheckBox, ids, setIds } = useHandleCheckBox();
  useEffect(() => {
    setSearchingStudentAfter(null);
    setStateWaiting(null);
    setStatusState(null);
    setIds([]);
    // eslint-disable-next-line
  }, [loadingMulti]);

  if (loading || loadingMulti) {
    return <LoadingProgress />;
  }

  return (
    <Box sx={{ m: 2 }}>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h4"> فهرست هفته پذیرش</Typography>
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
                  className={chevronDir ? style.rotate180 : style.rotate0}
                />
              </AccordionSummaryStyled>
              <Box sx={{ ml: "auto" }}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    getApproveMulti(
                      ids.toString(),
                      "/exam/after/week/form/multiple/approve"
                    );
                  }}
                  disabled={ids.toString() === ""}
                  sx={{ mr: 0.5 }}
                >
                  تایید کردن گروهی
                </Button>
                {/* <Button
                  color="secondary"
                  variant="contained"
                  onClick={() =>
                    getApproveMulti(
                      ids.toString(),
                      "/exam/before/week/form/multiple/approve"
                    )
                  }
                  disabled={ids.toString() === ""}
                  sx={{ mr: 0.5 }}
                >
                  رد کردن گروهی
                </Button> */}
                <ExcelExport
                  fileName={"Applicant Info"}
                  linkAll="/exam/after/week/form/all?pageNum=0&pageSize=100000"
                  searchData={searchingStudentAfter?.map(
                    (i) => i.beforeWeekForm.registrationForm
                  )}
                  useIn="after"
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
                  setSearchingStudentAfter={setSearchingStudentAfter}
                  searchPage="afterWeek"
                  chevronDir={chevronDir}
                  stateWaiting={stateWaiting}
                  setStateWaiting={setStateWaiting}
                  statusState={statusState}
                  setStatusState={setStatusState}
                />
              </Box>
            </AccordionDetails>
          </AccordionStyled>
          {/* //!for empty response of search return TableEmpty */}
          {searchingStudentAfter?.length === 0 && <TableEmpty />}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              {/* //!for empty response of search don't return TableHeader */}
              {searchingStudentAfter?.length !== 0 && <TableHeader />}

              {/*//! while searching show the search content */}
              {!searchingStudentAfter && (
                <TableBody>
                  {students?.map((afterWeekStudent: AfterWeekType) => {
                    const {
                      id,
                      beforeWeekForm: {
                        registrationForm: {
                          birthDate,
                          family,
                          firstName,
                          registrationCode,
                          codeMeli,
                          mobile,
                          email,
                          gender,
                        },
                      },
                      afterWeekChecked,
                    } = afterWeekStudent;

                    return (
                      <TableBodyAll
                        key={id}
                        id={id}
                        birthDate={birthDate}
                        family={family}
                        firstName={firstName}
                        registrationCode={registrationCode}
                        codeMeli={codeMeli}
                        mobile={mobile}
                        email={email}
                        directNav="after-week"
                        gender={gender}
                        checked={afterWeekChecked}
                        handleCheckBox={handleCheckBox}
                        checkBoxDisplay={false}
                      />
                    );
                  })}
                </TableBody>
              )}

              <TableBody>
                {searchingStudentAfter?.map((searchingStudentAfter: any) => {
                  return (
                    <TableBodyAll
                      key={searchingStudentAfter.id}
                      id={searchingStudentAfter.id}
                      idMulti={searchingStudentAfter.id}
                      birthDate={
                        searchingStudentAfter.beforeWeekForm.registrationForm
                          .birthDate
                      }
                      family={
                        searchingStudentAfter.beforeWeekForm.registrationForm
                          .family
                      }
                      firstName={
                        searchingStudentAfter.beforeWeekForm.registrationForm
                          .firstName
                      }
                      registrationCode={
                        searchingStudentAfter.beforeWeekForm.registrationForm
                          .registrationCode
                      }
                      codeMeli={
                        searchingStudentAfter.beforeWeekForm.registrationForm
                          .codeMeli
                      }
                      mobile={
                        searchingStudentAfter.beforeWeekForm.registrationForm
                          .mobile
                      }
                      email={
                        searchingStudentAfter.beforeWeekForm.registrationForm
                          .email
                      }
                      gender={
                        searchingStudentAfter.beforeWeekForm.registrationForm
                          .gender
                      }
                      checked={searchingStudentAfter.afterWeekChecked}
                      directNav="after-week"
                      handleCheckBox={handleCheckBox}
                      checkBoxDisplay={true}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      {!searchingStudentAfter && (
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
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
          }}
        />
      )}
    </Box>
  );
};

export default AfterWeekTable;
