import {
  AccordionDetails,
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { useState } from "react";
//   import { ExcelExport } from "../../components/ExcelExport";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import style from "../../styles/search/searchChevron.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TableHeader from "../../components/table/TableHeader";
import { language, workshops } from "../../components/table/helper-header";
import TableBodyLanguage from "../../components/language/table/TableBodyLanguage";
import TableBodyWorksShops from "../../components/workshops/table/TableBodyWorksShops";
import useSWR from "swr";
import { EnglishShort, WorkshopShort } from "../../model";
import { fetcherGet } from "../../api/axios";
import LoadingProgress from "../../components/LoadingProgress";

const GeneralEducationTable = () => {
  const [chevronDir, setChevronDir] = useState(false);
  const WORKSHOP_LIST =
    "/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=id&moduleType=general&moduleSubType=workshop";
  const ENGLISH_LIST =
    "/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=id&moduleType=general&moduleSubType=english_module";
  const { data, isLoading, error } = useSWR<WorkshopShort[]>(
    WORKSHOP_LIST,
    fetcherGet
  );
  const {
    data: dataEng,
    isLoading: isLoadingEng,
    error: errorEng,
  } = useSWR<EnglishShort[]>(ENGLISH_LIST, fetcherGet);

  if (isLoading || isLoadingEng) {
    return <LoadingProgress />;
  }
  if (error || errorEng) {
    console.log(error);
    console.log(errorEng);
  }

  return (
    <Box sx={{ m: 2 }}>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h4">فهرست آموزش‌های عمومی</Typography>
          </Box>
          {/* workshop */}
          <Box
            component={"div"}
            // sx={{ display: "flex", justifyContent: "space-between"}}
          >
            <Typography variant="h5">کارگاه‌های جانبی</Typography>
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

              {/* <ExcelExport
                  fileName={"Applicant Info"}
                  searchData={[]}
                  linkAll=""
                  useIn="reg"
                /> */}
            </Box>
            <AccordionDetails>
              <Box
                sx={{
                  width: "100%",
                  my: 3,
                }}
              >
                {/* //!component for searching student */}
                {/* <SearchAll
                    setSearchingStudentRegister={setSearchingStudentRegister}
                    searchPage="reg"
                    chevronDir={chevronDir}
                    stateWaiting={stateWaiting}
                    setStateWaiting={setStateWaiting}
                    statusState={statusState}
                    setStatusState={setStatusState}
                  /> */}
              </Box>
            </AccordionDetails>
          </AccordionStyled>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader headerItems={workshops} />
              <TableBody>
                {data?.map((workshops) => (
                  <TableBodyWorksShops
                    key={workshops.id}
                    workshops={workshops}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* language */}
          <Box component={"div"} sx={{ mt: 20 }}>
            <Typography variant="h5">دوره‌های زبان انگلیسی</Typography>
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

              {/* <ExcelExport
                  fileName={"Applicant Info"}
                  searchData={[]}
                  linkAll=""
                  useIn="reg"
                /> */}
            </Box>
            <AccordionDetails>
              <Box
                sx={{
                  width: "100%",
                  my: 3,
                }}
              >
                {/* //!component for searching student */}
                {/* <SearchAll
                    setSearchingStudentRegister={setSearchingStudentRegister}
                    searchPage="reg"
                    chevronDir={chevronDir}
                    stateWaiting={stateWaiting}
                    setStateWaiting={setStateWaiting}
                    statusState={statusState}
                    setStatusState={setStatusState}
                  /> */}
              </Box>
            </AccordionDetails>
          </AccordionStyled>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader headerItems={language} />
              <TableBody>
                {dataEng?.map((englishCourse) => (
                  <TableBodyLanguage
                    key={englishCourse.id}
                    englishCourse={englishCourse}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* //!for empty response of search return TableEmpty */}
          {/* {searchingStudentRegister?.length === 0 && <TableEmpty />} */}
        </Container>
      </Box>
    </Box>
  );
};

export default GeneralEducationTable;
