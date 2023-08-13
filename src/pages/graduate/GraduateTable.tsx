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
import { ExcelExport } from "../../components/ExcelExport";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableBodyG from "../../components/graduate/table/TableBodyG";
import TableHeader from "../../components/table/TableHeader";
import { graduateTableHeader } from "../../components/table/helper-header";

const GraduateTable = () => {
  const [chevronDir, setChevronDir] = useState(false);
  return (
    <Box sx={{ m: 2 }}>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h4"> فهرست فارغ‌التحصیلان</Typography>
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

              <ExcelExport
                fileName={"Applicant Info"}
                searchData={[]}
                linkAll=""
                useIn="reg"
              />
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
              <TableHeader headerItems={graduateTableHeader} />
              <TableBody>
                <TableBodyG />
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

export default GraduateTable;
