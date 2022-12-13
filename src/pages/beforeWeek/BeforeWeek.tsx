import {
  Button,
  ListItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import { SearchExam } from "../../components/Searching";
import useCountPagination from "../../hooks/request/useCountPagination";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BeforeWeekType } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { counterPagination } from "../../utils/counterPagination";

const BeforeWeek = () => {
  const [students, setStudents] = useState<BeforeWeekType[]>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchingStudentExam, setSearchingStudentExam] =
    useState<BeforeWeekType | null>(null);
  const navigate = useNavigate();
  
  const studentBeforeWeek = `/exam/before/week/form/all?pageNum=${page - 1}&pageSize=20`;
  const examFormCount = "/exam/before/week/form/count";
  

  const [counterPage] = useCountPagination(examFormCount);

  const getListLearner = async () => {
    setLoading(true);
    try {
      let response = await getData(studentBeforeWeek);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      setLoading(false);
      navigate("/");
    }
  };

  const [storedValue, setValue] = useLocalStorage("user", null);
  const [roles] = storedValue.roles;

  useEffect(() => {
    getListLearner();
    window.scrollTo(0, 0);
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
            sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
          >
            <Typography variant="h3"> لیست فرم های آزمون</Typography>
          </Box>
          {/* //!component for searching student */}
          <Box sx={{ width: "50%", my: 3, boxShadow: "2px 2px 5px 2px #eee" }}>
            <SearchExam setSearchingStudentExam={setSearchingStudentExam} />
          </Box>
          {/* //! export excel */}
          <ExcelExport
            fileName={"excel export"}
            apiData={
              searchingStudentExam === null ? students : [searchingStudentExam.registrationForm]
            }
          />
          {/* //! export excel */}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left">
                    نام و نام خانوادگی
                  </StyledTableCell>
                  <StyledTableCell align="left">سال تولد</StyledTableCell>
                  <StyledTableCell align="left">رشته تحصیلی</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              {/*//! while searching show the search content */}
              {searchingStudentExam === null ? (
                <TableBody>
                  {students?.map((examRegisterUser: BeforeWeekType) => {
                    const { id, registrationForm } = examRegisterUser;
                    const { birthDate, family, firstName, studyField } =
                      registrationForm;
                    return (
                      <StyledTableRow
                        key={id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell
                          align="left"
                          sx={{ width: "25%", verticalAlign: "top" }}
                        >
                          <Typography variant="body1">
                            {firstName + " " + family}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "10%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2" textAlign={"left"}>
                            {birthDate}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "30%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2">{studyField}</Typography>
                        </StyledTableCell>

                        <StyledTableCell
                          align="left"
                          sx={{ width: "30%", verticalAlign: "top" }}
                        >
                          <ListItem sx={{ pt: 0 }}>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() =>
                                navigate(`/${roles}/before-week/${id}`)
                              }
                              sx={{ ml: "auto", mr: "auto" }}
                            >
                              جزییات
                            </Button>
                          </ListItem>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              ) : (
                <StyledTableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <StyledTableCell
                    align="left"
                    sx={{ width: "25%", verticalAlign: "top" }}
                  >
                    <Typography variant="body1">
                      {searchingStudentExam.registrationForm.firstName +
                        " " +
                        searchingStudentExam.registrationForm.family}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{
                      width: "10%",
                      verticalAlign: "top",
                    }}
                  >
                    <Typography variant="body2" textAlign={"left"}>
                      {searchingStudentExam.registrationForm.birthDate}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                    sx={{
                      width: "30%",
                      verticalAlign: "top",
                    }}
                  >
                    <Typography variant="body2">
                      {searchingStudentExam.registrationForm.studyField}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                    sx={{ width: "30%", verticalAlign: "top" }}
                  >
                    <ListItem sx={{ pt: 0 }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          navigate(
                            `/${roles}/before-week/${searchingStudentExam.registrationForm.id}`
                          )
                        }
                        sx={{ ml: "auto", mr: "auto" }}
                      >
                        جزییات
                      </Button>
                    </ListItem>
                  </StyledTableCell>
                </StyledTableRow>
              )}
              {/*//! while searching show the search content */}
            </Table>
          </TableContainer>
        </Container>
      </Box>
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
    </Box>
  );
};

export default BeforeWeek;
