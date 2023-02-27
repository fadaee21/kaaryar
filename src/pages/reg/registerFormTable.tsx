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
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import SearchAll from "../../components/search/SearchAll";
import RegTableBodyAll from "../../components/table/RegTableBodyAll";
import TableHeader from "../../components/table/TableHeader";
import { useAuth } from "../../context/AuthProvider";
import useApproveMulti from "../../hooks/request/useApproveMulti";
import useCountPagination from "../../hooks/request/useCountPagination";
import { RegistrationForm } from "../../model";
import { counterPagination } from "../../utils/counterPagination";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import style from "../../styles/search/searchChevron.module.css";
import TableEmpty from "../../components/table/TableEmpty";
import { addComma } from "../../utils/addComma";

const RegisterFormTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [checkStateIds, setCheckStateIds] = useState<string>("");
  const [ids, setIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);
  // these two below state level up from search component because i have to handle these state values after trigger useApproveMulti, also these just use for this page
  const [stateWaiting, setStateWaiting] = useState<boolean | null>(null); //this state is for handling statusState===null
  const [statusState, setStatusState] = useState<boolean | null>(null);

  const [searchingStudentRegister, setSearchingStudentRegister] = useState<
    RegistrationForm[] | null
  >(null);

  const navigate = useNavigate();
  const pageSize = 20;
  const allStudentReg = `/reg/form/all?pageNum=${
    page - 1
  }&pageSize=${pageSize}`;
  const examFormCount = "/reg/form/count";
  const [, counterPage] = useCountPagination(examFormCount);
  const { getApproveMulti, loadingMulti } = useApproveMulti();

  const getListLearner = async () => {
    setLoading(true);
    try {
      let response = await getData(allStudentReg);
      let data = await response.data;
      setStudents(data);
      //empty checkBox state if you have
      setIds([]);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      navigate("/");
      setIds([]);
    }
    setLoading(false);
  };

  const { auth } = useAuth();
  const roles = auth.roles.toString();

  //handle multi selected checkbox
  const handleCheckBox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
      if (e.target.checked) {
        setIds((old) => [...old, id]);
      }
      if (!e.target.checked) {
        setIds((current) => {
          return current.filter((item) => item !== id);
        });
      }
    },
    []
  );


  useEffect(() => {
    getListLearner();
    window.scrollTo(0, 0);
    setChevronDir(false);
    // eslint-disable-next-line
  }, [page, loadingMulti]);

  useEffect(() => {
    setSearchingStudentRegister(null);
    setStateWaiting(null);
    setStatusState(null);
    setIds([]);
  }, [loadingMulti]);

  if (loading || loadingMulti) {
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
            <Typography variant="h4"> فهرست ثبت نام</Typography>
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
              <Box sx={{ ml: "auto" }}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    getApproveMulti(
                      ids.toString(),
                      "/reg/form/multiple/approve"
                    );
                  }}
                  disabled={ids.toString() === ""}
                  sx={{ mr: 0.5 }}
                >
                  تایید کردن گروهی
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() =>
                    getApproveMulti(
                      ids.toString(),
                      "/reg/form/multiple/disapprove"
                    )
                  }
                  disabled={ids.toString() === ""}
                  sx={{ mr: 0.5 }}
                >
                  رد کردن گروهی
                </Button>
                <ExcelExport
                  fileName={"Applicant Info"}
                  searchData={searchingStudentRegister?.map((i) => i)}
                  linkAll="/reg/form/all?pageNum=0&pageSize=1000000"
                  useIn="reg"
                />
              </Box>
            </Box>
            <AccordionDetails>
              <Box
                sx={{
                  width: "100%",
                  my: 3,
                }}
              >
                {/* //!component for searching student */}
                <SearchAll
                  setSearchingStudentRegister={setSearchingStudentRegister}
                  searchPage="reg"
                  chevronDir={chevronDir}
                  stateWaiting={stateWaiting}
                  setStateWaiting={setStateWaiting}
                  statusState={statusState}
                  setStatusState={setStatusState}
                />
              </Box>
            </AccordionDetails>
          </AccordionStyled>
          {/* //!for empty response of search return TableEmpty */}
          {searchingStudentRegister?.length === 0 && <TableEmpty />}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              {/* //!for empty response of search don't return TableHeader */}
              {searchingStudentRegister?.length !== 0 && <TableHeader />}

              {/*//! while searching show the search content */}
              {!searchingStudentRegister && (
                <TableBody>
                  {students.map((RegisterUser: any /*RegistrationForm*/) => {
                    return (
                      <RegTableBodyAll
                        key={RegisterUser.id}
                        id={RegisterUser.id}
                        roles={roles}
                        family={RegisterUser.family}
                        firstName={RegisterUser.firstName}
                        registrationCode={RegisterUser.registrationCode}
                        directNav="register-form"
                        checked={RegisterUser.checked}
                        handleCheckBox={handleCheckBox}
                        checkBoxDisplay={false}
                        education={RegisterUser.education}
                        refer={RegisterUser.refer}
                        highSchoolYear={RegisterUser.highSchoolYear}
                        familiarity={addComma(RegisterUser.familiarity)}
                        province={RegisterUser.province}
                        createTime={RegisterUser.createTime}
                      />
                    );
                  })}
                </TableBody>
              )}
              {/* show content if searching in the box */}
              <TableBody>
                {searchingStudentRegister?.map(
                  (searchingStudentRegister: any) => {
                    return (
                      <RegTableBodyAll
                        roles={roles}
                        key={searchingStudentRegister?.id}
                        id={searchingStudentRegister?.id}
                        family={searchingStudentRegister?.family}
                        firstName={searchingStudentRegister?.firstName}
                        registrationCode={
                          searchingStudentRegister?.registrationCode
                        }
                        directNav="register-form"
                        checked={searchingStudentRegister?.checked}
                        handleCheckBox={handleCheckBox}
                        checkBoxDisplay={true}
                        refer={searchingStudentRegister?.refer}
                        highSchoolYear={
                          searchingStudentRegister?.highSchoolYear
                        }
                        familiarity={addComma(
                          searchingStudentRegister?.familiarity
                        )}
                        province={searchingStudentRegister?.province}
                        createTime={searchingStudentRegister?.createTime}
                      />
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      {!searchingStudentRegister && (
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

export default RegisterFormTable;
