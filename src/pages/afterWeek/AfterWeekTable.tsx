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
import SearchAll from "../../components/search/SearchAll";
import TableBodyAll from "../../components/table/TableBodyAll";
import TableHeader from "../../components/table/TableHeader";
import { useAuth } from "../../context/AuthProvider";
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

const AfterWeekTable = () => {
  const [afterWeekStudents, setAfterWeekStudents] = useState<AfterWeekType[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);
  const [searchingStudentAfter, setSearchingStudentAfter] = useState<
    AfterWeekType[] | null
  >(null);

  const navigate = useNavigate();
  const pageSize = 20;
  const allStudentAfterWeek = `/exam/after/week/form/all?pageNum=${
    page - 1
  }&pageSize=${pageSize}`;
  const examFormCount = "/exam/after/week/form/count";
  const [, counterPage] = useCountPagination(examFormCount);

  const getListLearner = async () => {
    setLoading(true);
    try {
      let response = await getData(allStudentAfterWeek);
      setAfterWeekStudents(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      setLoading(false);
      navigate("/");
    }
  };

  const { auth } = useAuth();
  const roles = auth.roles.toString();

  useEffect(() => {
    getListLearner();
    window.scrollTo(0, 0);
    setChevronDir(false); //after changing the page close search bar
    // eslint-disable-next-line
  }, [page]);

  if (loading) {
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
              <ExcelExport
                fileName={"Applicant Info"}
                apiData={
                  searchingStudentAfter
                    ? searchingStudentAfter?.map(
                        (i) => i.beforeWeekForm.registrationForm
                      )
                    : afterWeekStudents?.map(
                        (i) => i.beforeWeekForm.registrationForm
                      )
                }
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
              {searchingStudentAfter?.length !== 0 && <TableHeader />}

              {/*//! while searching show the search content */}
              {!searchingStudentAfter && (
                <TableBody>
                  {afterWeekStudents.map((afterWeekStudent: AfterWeekType) => {
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
                        roles={roles}
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
                      />
                    );
                  })}
                </TableBody>
              )}

              <TableBody>
                {searchingStudentAfter?.map((searchingStudentAfter: any) => {
                  console.log(searchingStudentAfter);
                  return (
                    <TableBodyAll
                      roles={roles}
                      key={
                        searchingStudentAfter.beforeWeekForm.registrationForm.id
                      }
                      id={
                        searchingStudentAfter.beforeWeekForm.registrationForm.id
                      }
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
