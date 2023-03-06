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
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
// import SearchAll from "../../components/search/SearchAll";
import TableBodyAll from "../../components/table/TableBodyAll";
import TableHeader from "../../components/table/TableHeader";
import useCountPagination from "../../hooks/request/useCountPagination";
import { SeekerStudent } from "../../model";
import { counterPagination } from "../../utils/counterPagination";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import style from "../../styles/search/searchChevron.module.css";
import { seekerStateFinder } from "../../utils/seekerStateFinder";

const SkillSeeker = () => {
  const [seekerStudents, setSeekerStudents] = useState<SeekerStudent[] | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);

  const [searchingStudentSeeker, setSearchingStudentSeeker] = useState<
    SeekerStudent[] | null
  >(null);

  const navigate = useNavigate();
  const allStudentSeeker = `/status/form/all?pageNum=${page - 1}&pageSize=20`;
  const examFormCount = "/status/form/count";
  const [, counterPage] = useCountPagination(examFormCount);

  const getListLearner = async () => {
    setLoading(true);
    try {
      let response = await getData(allStudentSeeker);
      let data = await response.data;
      setSeekerStudents(data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      setLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    getListLearner();
    // eslint-disable-next-line
  }, [page]);

  if (loading) {
    return <LoadingProgress />;
  }

  // console.log(seekerStudents);

  return (
    <Box sx={{ m: 2 }}>
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
              <ExcelExport
                fileName={"Applicant Info"}
                linkAll="/status/form/all?pageNum=0&pageSize=100000"
                searchData={searchingStudentSeeker?.map(
                  (i) => i.beforeWeekForm?.registrationForm
                )}
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader />
              {/*//! while searching show the search content */}
              {!searchingStudentSeeker && (
                <TableBody>
                  {seekerStudents?.map((seekerStudent: SeekerStudent) => {
                    console.log(seekerStudent);
                    const {
                      id,
                      regForm,
                      afterWeekChecked,
                      beforeWeekChecked,
                      regChecked,
                    } = seekerStudent;

                    return (
                      <TableBodyAll
                        key={id}
                        id={id}
                        // roles={roles}
                        birthDate={regForm?.birthDate}
                        family={regForm?.family}
                        firstName={regForm?.firstName}
                        registrationCode={regForm?.registrationCode}
                        // codeMeli={regForm?.codeMeli}
                        mobile={regForm?.mobile}
                        email={regForm?.email}
                        directNav="skill-seeker"
                        // gender={regForm?.gender}
                        // just send checked prop due to tableBodyAll need this prob,
                        //in this case does't any effect
                        //all state affair will handle in resultStatus
                        checked={false}
                        resultStatus={seekerStateFinder(
                          afterWeekChecked,
                          beforeWeekChecked,
                          regChecked
                        )}
                      />
                    );
                  })}
                </TableBody>
              )}

              <TableBody>
                {searchingStudentSeeker?.map(
                  (searchingStudentSeeker: SeekerStudent) => {
                    const {
                      id,
                      regForm,
                      afterWeekChecked,
                      beforeWeekChecked,
                      regChecked,
                    } = searchingStudentSeeker;
                    return (
                      <TableBodyAll
                        key={id}
                        id={id}
                        birthDate={regForm?.birthDate}
                        family={regForm?.family}
                        firstName={regForm?.firstName}
                        registrationCode={regForm?.registrationCode}
                        // codeMeli={regForm?.codeMeli}
                        mobile={regForm?.mobile}
                        email={regForm?.email}
                        // gender={regForm?.gender}
                        checked={searchingStudentSeeker.afterWeekChecked}
                        directNav="skill-seeker"
                        resultStatus={seekerStateFinder(
                          afterWeekChecked,
                          beforeWeekChecked,
                          regChecked
                        )}
                      />
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
    </Box>
  );
};

export default SkillSeeker;
