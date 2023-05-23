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
import TableBodyDummyTrainingCourse from "../../components/trainingCourse/table/TableBodyDummyTrainingCourse";


const TrainingCourseTable = () => {
  const [chevronDir, setChevronDir] = useState(false);
  return (
    <Box sx={{ m: 2 }}>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h4">فهرست دوره‌های آموزشی</Typography>
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
              <TableHeader headerItems={trainingCourseHeader} />
              <TableBody>
                <TableBodyDummyTrainingCourse />
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

export default TrainingCourseTable;
