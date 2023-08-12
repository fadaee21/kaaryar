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
const pageSize = 20;
const BeforeWeekTable = () => {
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);
  const [searchingStudentBefore, setSearchingStudentBefore] = useState<
    BeforeWeekType[] | null
  >(null);

  const studentBeforeWeek = `/exam/before/week/form/all?pageNum=${page}&pageSize=${pageSize}`;
  const examFormCount = "/exam/before/week/form/count";

  const [, counterPage] = useCountPagination(examFormCount);
  const { getApproveMulti, loadingMulti } = useApproveMulti();

  const {
    data,
    isLoading: loading,
    error,
  } = useSWR(studentBeforeWeek, {
    onSuccess: () => window.scrollTo(0, 0),
  });

  //handle multi selected checkbox
  const { handleCheckBox, ids, setIds } = useHandleCheckBox();
  useEffect(() => {
    setSearchingStudentBefore(null);
    setIds([]);
    // eslint-disable-next-line
  }, [loadingMulti]);

  if (loading || loadingMulti) {
    return <LoadingProgress />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <Box sx={{ m: 2 }}>
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
                  fileName={"Applicant Info"}
                  linkAll="/exam/before/week/form/all?pageNum=1&pageSize=100000"
                  useIn="before"
                  searchData={searchingStudentBefore?.map(
                    (i) => i.registrationForm
                  )}
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
                  setSearchingStudentBefore={setSearchingStudentBefore}
                  searchPage="beforeWeek"
                  chevronDir={chevronDir}
                />
              </Box>
            </AccordionDetails>
          </AccordionStyled>

          {/* //!for empty response of search return TableEmpty */}
          {searchingStudentBefore?.length === 0 && <TableEmpty />}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              {/* //!for empty response of search don't return TableHeader */}
              {searchingStudentBefore?.length !== 0 && (
                <TableHeader headerItems={beforeTableHeader} />
              )}

              {/*//! while searching show the search content */}
              {!searchingStudentBefore && (
                <TableBody>
                  {data?.map((examRegisterUser: BeforeWeekType, i: number) => {
                    const {
                      id,
                      motivation,
                      jobStandby,
                      registrationForm: {
                        province,
                        city,
                        family,
                        firstName,
                        registrationCode,
                        codeMeli,
                        mobile,
                        email,
                        gender,
                        studyField,
                      },
                      acceptWeekChecked,
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
                        registrationCode={registrationCode}
                        codeMeli={codeMeli}
                        mobile={mobile}
                        email={email}
                        gender={gender}
                        directNav="before-week"
                        // cgpa={cgpa}
                        cgpa="-" //TODO:cgpa is not correct it must be change
                        checked={acceptWeekChecked}
                        handleCheckBox={handleCheckBox}
                        checkBoxDisplay={false}
                        index={itemCounterTable(page, pageSize, i)}
                      />
                    );
                  })}
                </TableBody>
              )}
              {/* show content if searching in the box */}
              <TableBody>
                {searchingStudentBefore?.map(
                  (searchingStudentBefore: BeforeWeekType, i: number) => {
                    return (
                      <TableBodyAll
                        key={searchingStudentBefore.id}
                        id={searchingStudentBefore.id}
                        idMulti={searchingStudentBefore.id}
                        province={
                          searchingStudentBefore.registrationForm.province
                        }
                        city={searchingStudentBefore.registrationForm.city}
                        studyField={
                          searchingStudentBefore.registrationForm.studyField
                        }
                        motivation={searchingStudentBefore.motivation}
                        jobStandby={searchingStudentBefore.jobStandby}
                        cgpa={
                          // searchingStudentBefore.cgpa
                          "-"
                        }
                        family={searchingStudentBefore.registrationForm.family}
                        firstName={
                          searchingStudentBefore.registrationForm.firstName
                        }
                        registrationCode={
                          searchingStudentBefore.registrationForm
                            .registrationCode
                        }
                        codeMeli={
                          searchingStudentBefore.registrationForm.codeMeli
                        }
                        mobile={searchingStudentBefore.registrationForm.mobile}
                        email={searchingStudentBefore.registrationForm.email}
                        gender={searchingStudentBefore.registrationForm.gender}
                        checked={searchingStudentBefore.acceptWeekChecked}
                        directNav="before-week"
                        handleCheckBox={handleCheckBox}
                        checkBoxDisplay={true}
                        index={i + 1}
                      />
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      {!searchingStudentBefore && (
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

export default BeforeWeekTable;
