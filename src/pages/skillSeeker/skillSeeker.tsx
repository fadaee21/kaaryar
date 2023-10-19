import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
// import SearchAll from "../../components/search/SearchAll";
import TableBodyAll from "../../components/table/TableBodyAll";
import TableHeader from "../../components/table/TableHeader";
import useCountPagination from "../../hooks/request/useCountPagination";
import { SeekerStudent } from "../../model";
import { counterPagination } from "../../utils/counterPagination";
import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionStyled,
  // AccordionSummaryStyled,
} from "../../styles/search/accordion";
// import style from "../../styles/search/searchChevron.module.css";
import { seekerStateFinder } from "../../utils/seekerStateFinder";
import { afterTableSkillSeeker } from "../../components/table/helper-header";
import useSWR from "swr";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { itemCounterTable } from "../../utils/itemCounterTable";
const pageSize = 20;
const heightOfTable = 500;
const loadingBoxHeight = heightOfTable - 160;
const examFormCount = "/status/form/count";
const SkillSeeker = () => {
  const [page, setPage] = useState(1);
  // const [chevronDir, setChevronDir] = useState(false);
  const [searchingStudentSeeker] = useState<SeekerStudent[] | null>(null);
  const allStudentSeeker = `/status/form/all?pageNum=${page}&pageSize=${pageSize}`;
  const [, counterPage] = useCountPagination(examFormCount);

  const { data, isLoading, error } = useSWR(allStudentSeeker, {
    onSuccess: () => window.scrollTo(0, 0),
  });



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
          <AccordionStyled>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                mb: 2,
              }}
            >
              {/* <AccordionSummaryStyled
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => setChevronDir(!chevronDir)}
              >
                <Typography variant="button">جستجو</Typography>
                <ExpandMoreIcon
                  className={chevronDir ? style.rotate180 : style.rotate0}
                />
              </AccordionSummaryStyled> */}
              <ExcelExport
                fileName={"Applicant Info"}
                linkAll="/status/form/all?pageNum=1&pageSize=100000"
                searchData={searchingStudentSeeker?.map((seekerStudent) => {
                  const {
                    regForm,
                    afterWeekChecked,
                    beforeWeekChecked,
                    regChecked,
                    AfterWeekForm,
                  } = seekerStudent;

                  return {
                    وضعیت: seekerStateFinder(
                      afterWeekChecked,
                      beforeWeekChecked,
                      regChecked
                    ),
                    "کد متقاضی": regForm.registrationCode,
                    "نام و نام خانوادگی":
                      regForm.firstName + " " + regForm.family,
                    گروه: regForm.course,
                    استان: regForm.province,
                    شهر: regForm.city,
                    "شماره همراه": regForm.mobile,
                    ایمیل: regForm.email,
                    "رشته انتخابی": regForm?.selectedField,
                    "رشته نهایی": AfterWeekForm?.finalField,
                    "نتیجه نهایی": AfterWeekForm?.finalResult,
                  };
                })}
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
                {/* <SearchAll
                  setSearchingStudentSeeker={setSearchingStudentSeeker}
                  searchPage="seekerWeek"
                  chevronDir={chevronDir}
                /> */}
              </Box>
            </AccordionDetails>
          </AccordionStyled>
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
                  <TableHeader headerItems={afterTableSkillSeeker} />
                  {/*//! while searching show the search content */}
                  {!searchingStudentSeeker && (
                    <TableBody>
                      {data?.map((seekerStudent: SeekerStudent, i: number) => {
                        const {
                          id,
                          regForm,
                          afterWeekChecked,
                          beforeWeekChecked,
                          regChecked,
                          AfterWeekForm,
                        } = seekerStudent;

                        return (
                          <TableBodyAll
                            key={id}
                            id={id}
                            birthDate={regForm?.birthDate}
                            family={regForm?.family}
                            firstName={regForm?.firstName}
                            registrationCode={regForm?.registrationCode}
                            mobile={regForm?.mobile}
                            email={regForm?.email}
                            directNav="skill-seeker"
                            province={regForm?.province}
                            city={regForm?.city}
                            studyField={regForm?.studyField}
                            selectedField={regForm?.selectedField}
                            // just send checked prop due to tableBodyAll need this prob,
                            //in this case does't any effect
                            //all state affair will handle in resultStatus
                            checked={false}
                            resultStatus={seekerStateFinder(
                              afterWeekChecked,
                              beforeWeekChecked,
                              regChecked
                            )}
                            index={itemCounterTable(page, pageSize, i)}
                            finalResult={AfterWeekForm?.finalResult}
                            finalField={AfterWeekForm?.finalField}
                            course={regForm?.course}
                          />
                        );
                      })}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Container>
      </Box>
      {!searchingStudentSeeker && (
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
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
          }}
        />
      )}
    </>
  );
};

export default SkillSeeker;
