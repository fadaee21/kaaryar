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
import React, { useEffect, useState } from "react";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import SearchAll from "../../components/search/SearchAll";
import RegTableBodyAll from "../../components/table/RegTableBodyAll";
import TableHeader from "../../components/table/TableHeader";
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
import { useHandleCheckBox } from "../../hooks/request/useHandleCheckBox";
import useGetListLearner from "../../hooks/request/useGetListLearner";
import { registerTableHeader } from "../../components/table/helper-header";

const RegisterFormTable = () => {
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);

  const [searchingStudentRegister, setSearchingStudentRegister] = useState<
    RegistrationForm[] | null
  >(null);

  const pageSize = 20;
  const allStudentReg = `/reg/form/all?pageNum=${page}&pageSize=${pageSize}`;
  const examFormCount = "/reg/form/count";
  const [, counterPage] = useCountPagination(examFormCount);
  const { getApproveMulti, loadingMulti } = useApproveMulti();

  const { students, getListLearner, loading } = useGetListLearner(
    allStudentReg,
    loadingMulti,
    page
  );

  useEffect(() => {
    getListLearner();
    window.scrollTo(0, 0);
    setChevronDir(false);
    // eslint-disable-next-line
  }, [page, loadingMulti]);
  //handle multi selected checkbox
  const { handleCheckBox, ids, setIds } = useHandleCheckBox();
  useEffect(() => {
    setSearchingStudentRegister(null);
    setIds([]);
    // eslint-disable-next-line
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
                    getApproveMulti(ids, "/reg/form/multiple", true);
                  }}
                  disabled={ids.length === 0}
                  sx={{ mr: 0.5 }}
                >
                  تایید کردن گروهی
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() =>
                    getApproveMulti(ids, "/reg/form/multiple", false)
                  }
                  disabled={ids.length === 0}
                  sx={{ mr: 0.5 }}
                >
                  رد کردن گروهی
                </Button>
                <ExcelExport
                  fileName={"Applicant Info"}
                  searchData={searchingStudentRegister?.map((i) => i)}
                  linkAll="/reg/form/all?pageNum=1&pageSize=100000"
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
                />
              </Box>
            </AccordionDetails>
          </AccordionStyled>
          {/* //!for empty response of search return TableEmpty */}
          {searchingStudentRegister?.length === 0 && <TableEmpty />}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              {/* //!for empty response of search don't return TableHeader */}
              {searchingStudentRegister?.length !== 0 && (
                <TableHeader headerItems={registerTableHeader} />
              )}

              {/*//! while searching show the search content */}
              {!searchingStudentRegister && (
                <TableBody>
                  {students.map((RegisterUser: any /*RegistrationForm*/) => {
                    return (
                      <RegTableBodyAll
                        key={RegisterUser.id}
                        id={RegisterUser.id}
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
                        familiarity={RegisterUser.familiarity}
                        province={RegisterUser.province}
                        createTime={RegisterUser.createTime}
                        course={RegisterUser.course}
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
                        familiarity={searchingStudentRegister?.familiarity}
                        province={searchingStudentRegister?.province}
                        createTime={searchingStudentRegister?.createTime}
                        course={searchingStudentRegister?.course}
                        education={searchingStudentRegister?.education}
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
          onChange={(_event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
          }}
        />
      )}
    </Box>
  );
};

export default RegisterFormTable;
