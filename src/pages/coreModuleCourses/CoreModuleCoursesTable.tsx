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
import { trainingCourseHeader } from "../../components/table/helper-header";
import TableBodyTrainingCourse from "../../components/coreCourse/table/TableBodyCoreModuleCourse";
import useSWR from "swr";
import LoadingProgress from "../../components/LoadingProgress";
import { ShortCoreModule } from "../../model";
import SearchAllCourse from "../../components/search-course/SearchAllCourse";
import TableEmpty from "../../components/table/TableEmpty";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
const SETTING_RESPONSE = "&hasCategory=true";
const MODULES_ALL_CORE = `/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=false&orderBy=start_date&moduleType=core${SETTING_RESPONSE}`;
const CoreModuleCoursesTable = () => {
  const [chevronDir, setChevronDir] = useState(false);
  const [searchCourseCore, setSearchCourseCore] = useState<ShortCoreModule[]>();
  const { data, error, isLoading } =
    useSWR<ShortCoreModule[]>(MODULES_ALL_CORE);

  if (isLoading) {
    return <LoadingProgress />;
  }
  if (error) {
    toast.error(handleError(error));
    console.log(error);
    return <Typography sx={{ mx: "auto" }}>Error Loading Page</Typography>;
  }
  console.log(searchCourseCore);
  return (
    <Box sx={{ m: 2 }}>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h4">فهرست دوره‌های تخصصی</Typography>
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
                <SearchAllCourse
                  moduleSubType="unassigned"
                  moduleType="core"
                  chevronDir={chevronDir}
                  setSearchCourseCore={setSearchCourseCore}
                  settingResponse={SETTING_RESPONSE}
                />
              </Box>
            </AccordionDetails>
          </AccordionStyled>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              {/* //!for empty response of search don't return TableHeader */}
              {searchCourseCore?.length !== 0 && (
                <TableHeader headerItems={trainingCourseHeader} />
              )}

              <TableBody>
                {(searchCourseCore ? searchCourseCore : data)?.map(
                  (moduleAll, inx) => (
                    <TableBodyTrainingCourse
                      counter={inx}
                      key={moduleAll.id}
                      moduleAll={moduleAll}
                    />
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* //!for empty response of search return TableEmpty */}
          {searchCourseCore?.length === 0 && <TableEmpty />}
        </Container>
      </Box>
    </Box>
  );
};

export default CoreModuleCoursesTable;
