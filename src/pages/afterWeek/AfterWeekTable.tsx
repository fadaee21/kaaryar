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
import TableEmpty from "../../components/table/TableEmpty";
import useApproveMulti from "../../hooks/request/useApproveMulti";
import { useHandleCheckBox } from "../../hooks/request/useHandleCheckBox";
import { afterTableHeader } from "../../components/table/helper-header";
import { itemCounterTable } from "../../utils/itemCounterTable";
import useSWR from "swr";

const AfterWeekTable = () => {
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);
  const [searchingStudentAfter, setSearchingStudentAfter] = useState<
    AfterWeekType[] | null
  >(null);

  const pageSize = 20;
  const allStudentAfterWeek = `/exam/after/week/form/all?pageNum=${page}&pageSize=${pageSize}`;
  const examFormCount = "/exam/after/week/form/count";
  const [, counterPage] = useCountPagination(examFormCount);
  const { getApproveMulti, loadingMulti } = useApproveMulti();

  const {
    data,
    isLoading: loading,
    error,
  } = useSWR(allStudentAfterWeek, {
    onSuccess: () => window.scrollTo(0, 0),
  });

  //handle multi selected checkbox
  const { handleCheckBox, ids, setIds } = useHandleCheckBox();
  useEffect(() => {
    setSearchingStudentAfter(null);
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
            <Typography variant="h4"> فهرست هفته پذیرش</Typography>
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
                      "/exam/after/week/form/multiple",
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
                      "/exam/after/week/form/multiple",
                      false
                    )
                  }
                  disabled={ids.length === 0}
                  sx={{ mr: 0.5 }}
                >
                  رد کردن گروهی
                </Button>
                <ExcelExport
                  fileName={"After Week Table"}
                  linkAll="/exam/after/week/form/all?pageNum=1&pageSize=100000"
                  searchData={searchingStudentAfter?.map((after) => {
                    const {
                      finalField,
                      scholar,
                      finalResult,
                      beforeWeekForm: {
                        registrationForm: {
                          province,
                          city,
                          family,
                          firstName,
                          registrationCode,
                          mobile,
                          email,
                          course,
                        },
                      },
                      afterWeekChecked,
                    } = after;

                    return {
                      وضعیت:
                        afterWeekChecked === true
                          ? `تایید شده`
                          : afterWeekChecked === null
                          ? `در انتظار تایید`
                          : `رد شده`,
                      "کد متقاضی": registrationCode,
                      "نام و نام خانوادگی": firstName + " " + family,
                      گروه: course,
                      استان: province,
                      شهر: city,
                      "شماره همراه": mobile,
                      ایمیل: email,
                      "نتیجه نهایی": finalResult,
                      بورسیه: scholar ? "دارد" : "ندارد",
                      "رشته نهایی": finalField,
                    };
                  })}
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
                />
              </Box>
            </AccordionDetails>
          </AccordionStyled>
          {/* //!for empty response of search return TableEmpty */}
          {searchingStudentAfter?.length === 0 && <TableEmpty />}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              {/* //!for empty response of search don't return TableHeader */}
              {searchingStudentAfter?.length !== 0 && (
                <TableHeader headerItems={afterTableHeader} />
              )}
              <TableBody>
                {(searchingStudentAfter ?? data)?.map(
                  (afterWeekStudent: AfterWeekType, i: number) => {
                    const {
                      id,
                      finalField,
                      scholar,
                      finalResult,
                      beforeWeekForm: {
                        registrationForm: {
                          province,
                          city,
                          family,
                          firstName,
                          registrationCode,
                          codeMeli,
                          mobile,
                          email,
                          // gender,
                          studyField,
                          course,
                        },
                      },
                      afterWeekChecked,
                    } = afterWeekStudent;

                    return (
                      <TableBodyAll
                        key={id}
                        id={id}
                        province={province}
                        city={city}
                        studyField={studyField}
                        scholar={scholar}
                        finalField={finalField}
                        finalResult={finalResult}
                        family={family}
                        firstName={firstName}
                        registrationCode={registrationCode}
                        codeMeli={codeMeli}
                        mobile={mobile}
                        email={email}
                        directNav="after-week"
                        // gender={gender}
                        checked={afterWeekChecked}
                        handleCheckBox={handleCheckBox}
                        checkBoxDisplay={false}
                        index={itemCounterTable(page, pageSize, i)}
                        course={course}
                      />
                    );
                  }
                )}
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
