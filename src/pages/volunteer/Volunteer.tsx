import {
  AccordionDetails,
  Box,
  Container,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ExcelExport } from "../../components/ExcelExport";
import TableHeader from "../../components/volunteer/table/TableHeader";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import style from "../../styles/search/searchChevron.module.css";
import TableBodyVolunteer from "../../components/volunteer/table/TableBodyVolunteer";

const Volunteer = () => {
  const [searchingVolunteer, setSearchingVolunteer] = useState([]);
  const [volunteers, setvolunteers] = useState([]);
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);

  return (
    <Box sx={{ m: 2 }}>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h4"> فهرست پروفایل داوطلبان</Typography>
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
              <ExcelExport
                fileName={"Applicant Info"}
                apiData={
                  []
                  // searchingVolunteer
                  //   ? searchingVolunteer?.map(
                  //       (i) => i.beforeWeekForm.registrationForm
                  //     )
                  //   : volunteers?.map((i) => i.beforeWeekForm.registrationForm)
                }
              />
            </Box>
            <AccordionDetails>
              {/* //!component for searching student */}
              <Box
                sx={{
                  width: "100%",
                  my: 3,
                }}
              >
                {/* <SearchAll
                setSearchingStudentSeeker={setSearchingStudentSeeker}
                searchPage="seekerWeek"
                chevronDir={chevronDir}
              /> */}
              </Box>
            </AccordionDetails>
          </AccordionStyled>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader />
              {/*//! while searching show the search content */}
              {!searchingVolunteer && (
                <TableBody>
                  <TableBodyVolunteer />
                </TableBody>
              )}

              <TableBody>
                <TableBodyVolunteer />
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      {!searchingVolunteer && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 4,
          }}
          size="large"
          // count={counterPagination(counterPage, 20)}
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

export default Volunteer;
