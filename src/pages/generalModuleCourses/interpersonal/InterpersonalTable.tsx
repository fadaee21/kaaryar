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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import style from "../../../styles/search/searchChevron.module.css";
import TableHeader from "../../../components/table/TableHeader";
import { useState } from "react";
import { WorkshopShort } from "../../../model";
import useSWR from "swr";
import LoadingProgress from "../../../components/LoadingProgress";

import { vocational } from "../../../components/table/helper-header";
import TableBodyVocational from "../../../components/generalCourse/vocational-interpersonal/TableBodyVocational";
import SearchAllCourse from "../../../components/search-course/SearchAllCourse";
import TableEmpty from "../../../components/table/TableEmpty";
const SETTING_RESPONSE = "&hasCategory=true";
const INTERPERSONAL_LIST = `/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=updated_at&moduleType=general&moduleSubType=interpersonal_skills${SETTING_RESPONSE}`;

const InterpersonalTable = () => {
  const [chevronDir, setChevronDir] = useState(false);
  const [searchCourseInterPersonal, setSearchCourseInterPersonal] =
    useState<WorkshopShort[]>();
  const { data, isLoading, error } =
    useSWR<WorkshopShort[]>(INTERPERSONAL_LIST);

  if (isLoading) {
    return <LoadingProgress />;
  }
  if (error) {
    console.log(error);
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
            <SearchAllCourse
              moduleSubType="interpersonal_skills"
              moduleType="general"
              chevronDir={chevronDir}
              setSearchCourseCore={setSearchCourseInterPersonal}
              settingResponse={SETTING_RESPONSE}
            />
          </Box>
        </AccordionDetails>
      </AccordionStyled>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          {searchCourseInterPersonal?.length !== 0 && (
            <TableHeader headerItems={vocational} />
          )}

          <TableBody>
            {(searchCourseInterPersonal
              ? searchCourseInterPersonal
              : data
            )?.map((interpersonal, index) => (
              <TableBodyVocational
                key={interpersonal.id}
                vocational={interpersonal}
                counter={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* //!for empty response of search return TableEmpty */}
      {searchCourseInterPersonal?.length === 0 && <TableEmpty />}
    </>
  );
};

export default InterpersonalTable;
