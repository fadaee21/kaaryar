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
import LoadingProgress from "../../components/LoadingProgress";
import { SearchAfter } from "../../components/Searching";
import TableBodyAll from "../../components/table/TableBodyAll";
import TableHeader from "../../components/table/TableHeader";
import useCountPagination from "../../hooks/request/useCountPagination";
import useLocalStorage from "../../hooks/useLocalStorage";
import { AfterWeekType } from "../../model";
import { counterPagination } from "../../utils/counterPagination";

const AfterWeekTable = () => {
  const [afterWeekStudents, setAfterWeekStudents] = useState<AfterWeekType[]>(
    []
  );
  const [filterGender, setFilterGender] = useState<AfterWeekType[] | null>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchingStudentAfter, setSearchingStudentAfter] =
    useState<AfterWeekType | null>(null);

  const navigate = useNavigate();
  const allStudentAfterWeek = `/exam/after/week/form/all?pageNum=${
    page - 1
  }&pageSize=20`;
  const examFormCount = "/exam/after/week/form/count";
  const [counterPage] = useCountPagination(examFormCount);
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
            <Typography variant="h3"> لیست هفته پذیرش</Typography>
          </Box>
          {/* //!component for searching student */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              my: 3,
              boxShadow: "2px 2px 5px 2px #eee",
            }}
          >
            <SearchAfter setSearchingStudentAfter={setSearchingStudentAfter} />
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader
                students={afterWeekStudents
                  .map((i) => i.beforeWeekForm)
                  .map((i) => i.registrationForm)}
                searchingStudent={
                  searchingStudentAfter?.beforeWeekForm?.registrationForm
                }
                setFilterGender={setFilterGender}
                filterGender={filterGender}
              />
              {/*//! while searching show the search content */}
              {searchingStudentAfter === null && !filterGender && (
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
              {searchingStudentAfter && (
                <TableBody>
                  <TableBodyAll
                    roles={roles}
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
                </TableBody>
              )}
              {!searchingStudentAfter && filterGender && (
                <TableBody>
                  {filterGender?.map((item) => {
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
                    } = item;
                    return (
                      <TableBodyAll
                        roles={roles}
                        key={id}
                        id={id}
                        birthDate={birthDate}
                        family={family}
                        firstName={firstName}
                        registrationCode={registrationCode}
                        codeMeli={codeMeli}
                        mobile={mobile}
                        email={email}
                        gender={gender}
                        checked={afterWeekChecked}
                        directNav="register-form"
                      />
                    );
                  })}
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

export default AfterWeekTable;
