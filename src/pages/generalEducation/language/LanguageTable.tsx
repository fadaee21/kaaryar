import {
  AccordionDetails,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../../styles/search/accordion";
import TableBodyLanguage from "../../../components/generalCourse/language/TableBodyLanguage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import style from "../../../styles/search/searchChevron.module.css";
import TableHeader from "../../../components/table/TableHeader";
import { useState } from "react";
import { fetcherGet } from "../../../api/axios";
import { EnglishShort } from "../../../model";
import useSWR from "swr";
import { language } from "../../../components/table/helper-header";
import LoadingProgress from "../../../components/LoadingProgress";

const ENGLISH_LIST =
  "/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=updated_at&moduleType=general&moduleSubType=english_module";

const LanguageTable = () => {
  const [chevronDir, setChevronDir] = useState(false);
  const {
    data: dataEng,
    isLoading: isLoadingEng,
    error: errorEng,
  } = useSWR<EnglishShort[]>(ENGLISH_LIST, fetcherGet);
  if (isLoadingEng) {
    return <LoadingProgress />;
  }
  if (errorEng) {
    console.log(errorEng);
    return <Typography>Error</Typography>;
  }

  return (
    <>
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
            {dataEng?.map((englishCourse,index) => (
              <TableBodyLanguage
                key={englishCourse.id}
                englishCourse={englishCourse}
                counter={index+1}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* //!for empty response of search return TableEmpty */}
      {/* {searchingStudentRegister?.length === 0 && <TableEmpty />} */}
    </>
  );
};

export default LanguageTable;
