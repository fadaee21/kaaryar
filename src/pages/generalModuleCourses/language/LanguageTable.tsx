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
import { EnglishShort } from "../../../model";
import useSWR from "swr";
import { language } from "../../../components/table/helper-header";
import LoadingProgress from "../../../components/LoadingProgress";
import SearchAllCourse from "../../../components/search-course/SearchAllCourse";
import TableEmpty from "../../../components/table/TableEmpty";
const SETTING_RESPONSE = "";
const ENGLISH_LIST = `/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=updated_at&moduleType=general&moduleSubType=english_module${SETTING_RESPONSE}`;

const LanguageTable = () => {
  const [chevronDir, setChevronDir] = useState(false);
  const [searchCourseEnglish, setSearchCourseEnglish] =
    useState<EnglishShort[]>();
  const {
    data: dataEng,
    isLoading: isLoadingEng,
    error: errorEng,
  } = useSWR<EnglishShort[]>(ENGLISH_LIST);
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
            <SearchAllCourse
              moduleSubType="english_module"
              moduleType="general"
              chevronDir={chevronDir}
              setSearchCourseCore={setSearchCourseEnglish}
              settingResponse={SETTING_RESPONSE}
            />
          </Box>
        </AccordionDetails>
      </AccordionStyled>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          {searchCourseEnglish?.length !== 0 && (
            <TableHeader headerItems={language} />
          )}
          <TableBody>
            {(searchCourseEnglish ? searchCourseEnglish : dataEng)?.map(
              (englishCourse, index) => (
                <TableBodyLanguage
                  key={englishCourse.id}
                  englishCourse={englishCourse}
                  counter={index}
                />
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* //!for empty response of search return TableEmpty */}
      {searchCourseEnglish?.length === 0 && <TableEmpty />}
    </>
  );
};

export default LanguageTable;
