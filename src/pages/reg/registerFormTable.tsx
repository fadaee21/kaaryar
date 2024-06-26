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
import { Group, RegistrationForm } from "../../model";
import { counterPagination } from "../../utils/counterPagination";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import TableEmpty from "../../components/table/TableEmpty";
import { useHandleCheckBox } from "../../hooks/request/useHandleCheckBox";
import useSWR from "swr";

import { registerTableHeader } from "../../components/table/helper-header";
import { itemCounterTable } from "../../utils/itemCounterTable";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { Navigate, useSearchParams } from "react-router-dom";
import {
  RELATED_PATH,
  RelatedPath,
} from "../../components/addNewCourseComp/CareerPathway";

const pageSize = 20;
const heightOfTable = 500;
const loadingBoxHeight = heightOfTable - 160;
const RegisterFormTable = () => {
  const [searchMode, setSearchMode] = useState(false);
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);
  let REGISTER_STUDENT;
  REGISTER_STUDENT = `/reg/form/all?pageNum=${page}&pageSize=${pageSize}`;

  let [searchParams] = useSearchParams();

  const hasQueryParams = () => {
    return !searchParams.keys().next().done;
  };

  useEffect(() => {
    setChevronDir(hasQueryParams());
    setSearchMode(hasQueryParams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasQueryParams()) {
    const searchLink = "/reg/search/param?pageNum=1&pageSize=10000";
    REGISTER_STUDENT = searchLink + `&${searchParams}`;
  }

  const examFormCount = "/reg/form/count";
  const [, counterPage] = useCountPagination(examFormCount);
  const {
    data,
    isLoading: loading,
    error,
    mutate,
  } = useSWR(REGISTER_STUDENT, {
    revalidateOnMount: true,
  });
  //these two data is used for search
  const { data: groupData, isLoading: loadingGroup } = useSWR<Group[]>(
    chevronDir
      ? "/modules/categories/short-details/all?orderAscending=true&orderBy=name"
      : null
  );
  const { data: selectedFieldOpt } = useSWR<RelatedPath[]>(RELATED_PATH);
  const { getApproveMulti, loadingMulti } = useApproveMulti(mutate);

  //handle multi selected checkbox
  const { handleCheckBox, ids, setIds } = useHandleCheckBox();
  useEffect(() => {
    setIds([]);
    // eslint-disable-next-line
  }, [loadingMulti]);

  if (error) {
    toast.error(handleError(error));
    if (error.response.status === 401) {
      return <Navigate to="/" replace />;
    }
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

          <AccordionStyled expanded={chevronDir}>
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
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="button">جستجو</Typography>
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
                  fileName={"Register Form Table"}
                  searchData={null}
                  linkAll={
                    hasQueryParams()
                      ? REGISTER_STUDENT
                      : "/reg/form/all?pageNum=1&pageSize=10000"
                  }
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
                {!loadingGroup ? (
                  <SearchAll
                    searchPage="reg"
                    groupData={groupData}
                    selectedFieldOpt={selectedFieldOpt}
                    loading={loading}
                    setSearchMode={setSearchMode}
                  />
                ) : (
                  <LoadingProgress usage="paper" />
                )}
              </Box>
            </AccordionDetails>
          </AccordionStyled>
          {/* //!for empty response of search return TableEmpty */}
          {data?.length === 0 && <TableEmpty />}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {loading || loadingMulti ? (
              <Box sx={{ m: 10, height: loadingBoxHeight }}>
                <LoadingProgress usage="paper" size={40} />
              </Box>
            ) : (
              <TableContainer sx={{ maxHeight: heightOfTable }}>
                <Table
                  stickyHeader
                  aria-label="simple table"
                  sx={{ tableLayout: "auto" }}
                >
                  {/* //!for empty response of search don't return TableHeader */}
                  {data?.length !== 0 && (
                    <TableHeader headerItems={registerTableHeader} />
                  )}

                  <TableBody>
                    {data?.map((RegisterUser: RegistrationForm, i: number) => {
                      return (
                        <RegTableBodyAll
                          key={RegisterUser.id}
                          id={RegisterUser.id}
                          family={RegisterUser.family}
                          firstName={RegisterUser.firstName}
                          // registrationCode={RegisterUser.registrationCode}
                          checked={RegisterUser.checked}
                          handleCheckBox={handleCheckBox}
                          checkBoxDisplay={
                            !!data &&
                            searchParams.get("approvalStatus") === "pending"
                          }
                          education={RegisterUser.education}
                          refer={RegisterUser.refer}
                          highSchoolYear={RegisterUser.highSchoolYear}
                          familiarity={RegisterUser.familiarity}
                          province={RegisterUser.province}
                          city={RegisterUser.city}
                          createdAt={RegisterUser.createdAt}
                          course={RegisterUser.course}
                          index={
                            searchMode ? i + 1 : itemCounterTable(page, pageSize, i)
                          }
                          decidedAt={RegisterUser.decidedAt}
                          careerPathwayName={
                            RegisterUser?.careerPathway?.name || "سایر"
                          }
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Container>
      </Box>
      {!searchMode && (
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
