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
import TableBodyAll from "../../components/table/TableBodyAll";
import TableHeader from "../../components/table/TableHeader";
import useCountPagination from "../../hooks/request/useCountPagination";
import useLocalStorage from "../../hooks/useLocalStorage";
import { AfterWeekType } from "../../model";
import { counterPagination } from "../../utils/counterPagination";

const AfterWeekTable = () => {
  const [afterWeekStudents, setAfterWeekStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
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
  console.log(afterWeekStudents);

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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader />
              <TableBody>
                {afterWeekStudents.map((afterWeekStudent: AfterWeekType) => {
                  const {
                    id,
                    beforeWeekForm: { registrationForm },
                  } = afterWeekStudent;
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
                      directNav="after-week"
                    />
                  );
                })}
              </TableBody>
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
