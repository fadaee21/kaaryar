import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";
import LoadingProgress from "../../components/LoadingProgress";
import { SearchRegister } from "../../components/Searching";
// import SearchingGender from "../../components/SearchingGender";
import TableBodyAll from "../../components/table/TableBodyAll";
import TableBodySearch from "../../components/table/TableBodySearch";
import TableHeader from "../../components/table/TableHeader";
import useApproveMulti from "../../hooks/request/useApproveMulti";
import useCountPagination from "../../hooks/request/useCountPagination";
import useLocalStorage from "../../hooks/useLocalStorage";
import { RegistrationForm } from "../../model";
import { counterPagination } from "../../utils/counterPagination";

const RegisterFormTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkStateIds, setCheckStateIds] = useState("");
  const [ids] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [searchingStudentRegister, setSearchingStudentRegister] =
    useState<RegistrationForm | null>(null);
  const [filterGender, setFilterGender] = useState<RegistrationForm[] | null>();
  const navigate = useNavigate();
  const allStudentReg = `/reg/form/all?pageNum=${page - 1}&pageSize=20`;
  const examFormCount = "/reg/form/count";
  const [counterPage] = useCountPagination(examFormCount);
  const { getApproveMulti, successMulti } = useApproveMulti();

  const getListLearner = async () => {
    setLoading(true);
    try {
      let response = await getData(allStudentReg);
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

  //handle multi selected checkbox
  const handleCheckBox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
      if (e.target.checked) {
        ids.push(id);
      }
      if (!e.target.checked) {
        const findNum = (num: string) => num === id;
        const idsIndex = ids.findIndex(findNum);
        ids.splice(idsIndex, 1);
      }
      const result = ids.toString();
      setCheckStateIds(result);
    },
    []
  );

  useEffect(() => {
    getListLearner();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [page,successMulti]);

  if (loading) {
    return <LoadingProgress />;
  }
  console.log(searchingStudentRegister);

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

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader
                students={students}
                searchingStudent={searchingStudentRegister}
                setFilterGender={setFilterGender}
                filterGender={filterGender}
                checkStateIds={checkStateIds}
                getApproveMulti={getApproveMulti}
              />

              {/*//! while searching show the search content */}
              {!searchingStudentRegister && !filterGender && (
                <TableBody>
                  {students.map((RegisterUser: RegistrationForm) => {
                    return (
                      <TableBodyAll
                        key={RegisterUser.id}
                        id={RegisterUser.id}
                        roles={roles}
                        birthDate={RegisterUser.birthDate}
                        family={RegisterUser.family}
                        firstName={RegisterUser.firstName}
                        registrationCode={RegisterUser.registrationCode}
                        codeMeli={RegisterUser.codeMeli}
                        mobile={RegisterUser.mobile}
                        email={RegisterUser.email}
                        directNav="register-form"
                        gender={RegisterUser.gender}
                        checked={RegisterUser.checked}
                        handleCheckBox={handleCheckBox}
                      />
                    );
                  })}
                </TableBody>
              )}
              {/* show content if searching in the box */}
              {searchingStudentRegister && (
                <TableBody>
                  <TableBodyAll
                    roles={roles}
                    id={searchingStudentRegister?.id}
                    birthDate={searchingStudentRegister?.birthDate}
                    family={searchingStudentRegister?.family}
                    firstName={searchingStudentRegister?.firstName}
                    registrationCode={
                      searchingStudentRegister?.registrationCode
                    }
                    codeMeli={searchingStudentRegister?.codeMeli}
                    mobile={searchingStudentRegister?.mobile}
                    email={searchingStudentRegister?.email}
                    directNav="register-form"
                    gender={searchingStudentRegister?.gender}
                    checked={searchingStudentRegister?.checked}
                    handleCheckBox={handleCheckBox}
                  />
                </TableBody>
              )}
              {/* show content if defining the gender */}
              {filterGender && !searchingStudentRegister && (
                <TableBody>
                  {filterGender?.map((item) => {
                    return (
                      <TableBodyAll
                        roles={roles}
                        key={item.id}
                        id={item.id}
                        birthDate={item.birthDate}
                        family={item.family}
                        firstName={item.firstName}
                        registrationCode={item.registrationCode}
                        codeMeli={item.codeMeli}
                        mobile={item.mobile}
                        email={item.email}
                        directNav="register-form"
                        gender={item.gender}
                        checked={item.checked}
                        handleCheckBox={handleCheckBox}
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

export default RegisterFormTable;
