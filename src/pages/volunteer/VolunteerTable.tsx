import {
  // AccordionDetails,
  Box,
  Container,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { ExcelExport } from "../../components/ExcelExport";
// import {
//   AccordionStyled,
//   AccordionSummaryStyled,
// } from "../../styles/search/accordion";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import style from "../../styles/search/searchChevron.module.css";
import TableBodyVolunteer from "../../components/volunteer/TableBodyVolunteer";
import { counterPagination } from "../../utils/counterPagination";
import LoadingProgress from "../../components/LoadingProgress";
import useCountPagination from "../../hooks/request/useCountPagination";
import { Profile } from "../../model";
import useEditProfile from "../../hooks/request/useEditProfile";
import TableHeader from "../../components/table/TableHeader";
import { volunteerTableHeader } from "../../components/table/helper-header";
import { itemCounterTable } from "../../utils/itemCounterTable";
import useSWR from "swr";
const Volunteer = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const addressLink = `/user/profile/all?pageNum=${page}&pageSize=${pageSize}`;
  const { data: dataCall, isLoading: loadingCall } =
    useSWR<Profile[]>(addressLink);

  // const [searchingVolunteer, setSearchingVolunteer] = useState([]);
  // const [volunteers, setvolunteers] = useState([]);
  // const [chevronDir, setChevronDir] = useState(false);
  const volunteerCount = "/user/profile/count";
  const [, counterPage] = useCountPagination(volunteerCount);
  const { loadingProfile } = useEditProfile();

  if (loadingCall || loadingProfile) {
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
            <Typography variant="h4"> فهرست پروفایل داوطلبان</Typography>
          </Box>
          {/* <AccordionStyled> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              mb: 1.5,
            }}
          >
            {/* <AccordionSummaryStyled
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => setChevronDir(!chevronDir)}
              >
                <Typography variant="button">جستجو</Typography>
                <ExpandMoreIcon
                  className={chevronDir ? style.rotate180 : style.rotate0}
                />
              </AccordionSummaryStyled> */}
            <ExcelExport
              fileName={"Applicant Info"}
              linkAll="/user/profile/all?pageNum=1&pageSize=100"
              searchData={null}
              useIn="volunteer"
            />
          </Box>
          {/* <AccordionDetails> */}
          {/* //!component for searching student */}
          {/* <Box
                sx={{
                  width: "100%",
                  my: 3,
                }}
              >
                <SearchAll
                setSearchingStudentSeeker={setSearchingStudentSeeker}
                searchPage="seekerWeek"
                chevronDir={chevronDir}
              />
              </Box>
            </AccordionDetails> */}
          {/* </AccordionStyled> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader headerItems={volunteerTableHeader} />
              {/*//! while searching show the search content */}
              {/* {!searchingVolunteer && ( */}
              {/* <TableBody>
                  <TableBodyVolunteer />
                </TableBody> */}
              {/* )} */}

              <TableBody>
                {dataCall?.map((item, i: number) => (
                  <TableBodyVolunteer
                    key={item.id}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    username={item.user.username}
                    role={item.role}
                    id={item.id}
                    counter={itemCounterTable(page, pageSize, i)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      {/* {!searchingVolunteer && ( */}
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
        onChange={(_event: ChangeEvent<unknown>, value: number) => {
          setPage(value);
        }}
      />
      {/* )} */}
    </Box>
  );
};

export default Volunteer;
