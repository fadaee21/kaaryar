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
import { SearchExam } from "../../components/Searching";
import TableBodyAll from "../../components/table/TableBodyAll";
import TableBodySearch from "../../components/table/TableBodySearch";
import TableHeader from "../../components/table/TableHeader";
import useCountPagination from "../../hooks/request/useCountPagination";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BeforeWeekType } from "../../model";

import { counterPagination } from "../../utils/counterPagination";

const BeforeWeekTable = () => {
  const [students, setStudents] = useState<BeforeWeekType[]>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchingStudentExam, setSearchingStudentExam] =
    useState<BeforeWeekType | null>(null);
  const navigate = useNavigate();

  const studentBeforeWeek = `/exam/before/week/form/all?pageNum=${
    page - 1
  }&pageSize=20`;
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
// eslint-disable-next-line
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
              searchingStudentExam === null
                ? students
                : [searchingStudentExam.registrationForm]
            }
          />
          {/* //! export excel */}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader />
              {/*//! while searching show the search content */}
              {searchingStudentExam === null ? (
                <TableBody>
                  {students?.map((examRegisterUser: BeforeWeekType) => {
                    const { id, registrationForm } = examRegisterUser;
                    const {
                      birthDate,
                      family,
                      firstName,
                      registrationCode,
                      codeMeli,
                      mobile,
                      email,
                    } = registrationForm;
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
                        directNav="before-week"
                      />
                    );
                  })}
                </TableBody>
              ) : (
                <TableBody>
                  <TableBodySearch
                    roles={roles}
                    id={searchingStudentExam.registrationForm.id}
                    birthDate={searchingStudentExam.registrationForm.birthDate}
                    family={searchingStudentExam.registrationForm.family}
                    firstName={searchingStudentExam.registrationForm.firstName}
                    registrationCode={
                      searchingStudentExam.registrationForm.registrationCode
                    }
                    codeMeli={searchingStudentExam.registrationForm.codeMeli}
                    mobile={searchingStudentExam.registrationForm.mobile}
                    email={searchingStudentExam.registrationForm.email}
                    directNav="before-week"
                  />
                </TableBody>
              )}
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

export default BeforeWeekTable;
