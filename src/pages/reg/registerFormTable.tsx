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
import { SearchRegister } from "../../components/Searching";
import TableBodyAll from "../../components/table/TableBodyAll";
import TableBodySearch from "../../components/table/TableBodySearch";
import TableHeader from "../../components/table/TableHeader";
import useCountPagination from "../../hooks/request/useCountPagination";
import useLocalStorage from "../../hooks/useLocalStorage";
import { RegistrationForm } from "../../model";
import { counterPagination } from "../../utils/counterPagination";

const RegisterFormTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchingStudentRegister, setSearchingStudentRegister] =
    useState<RegistrationForm | null>(null);

  const navigate = useNavigate();
  const allStudentMoodle = `/reg/form/all?pageNum=${page - 1}&pageSize=20`;
  const examFormCount = "/reg/form/count";
  const [counterPage] = useCountPagination(examFormCount);
  const getListLearner = async () => {
    setLoading(true);
    try {
      let response = await getData(allStudentMoodle);
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
            <Typography variant="h3"> لیست فرم های پذیرش</Typography>
          </Box>
          {/* //!component for searching student */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              my: 3,
              boxShadow: "2px 2px 5px 2px #eee",
            }}
          >
            <SearchRegister
              setSearchingStudentRegister={setSearchingStudentRegister}
            />
          </Box>
          {/* //! export excel */}
          <ExcelExport
            fileName={"excel export"}
            apiData={
              searchingStudentRegister === null
                ? students
                : [searchingStudentRegister]
            }
          />
          {/* //! export excel */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader />

              {/*//! while searching show the search content */}
              {searchingStudentRegister === null ? (
                <TableBody>
                  {students.map((RegisterUser: RegistrationForm) => {
                    const {
                      birthDate,
                      family,
                      firstName,
                      registrationCode,
                      codeMeli,
                      mobile,
                      email,
                      id,
                      gender,
                      checked
                    } = RegisterUser;
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
                        directNav="register-form"
                        gender={gender}
                        checked={checked}
                      />
                    );
                  })}
                </TableBody>
              ) : (
                <TableBody>
                  <TableBodySearch
                    roles={roles}
                    id={searchingStudentRegister.id}
                    birthDate={searchingStudentRegister.birthDate}
                    family={searchingStudentRegister.family}
                    firstName={searchingStudentRegister.firstName}
                    registrationCode={searchingStudentRegister.registrationCode}
                    codeMeli={searchingStudentRegister.codeMeli}
                    mobile={searchingStudentRegister.mobile}
                    email={searchingStudentRegister.email}
                    directNav="register-form"
                    gender={searchingStudentRegister.gender}
                    checked={searchingStudentRegister.checked}
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

export default RegisterFormTable;
