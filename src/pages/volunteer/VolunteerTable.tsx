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
import { ChangeEvent, useState } from "react";
import { ExcelExport } from "../../components/ExcelExport";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import SearchVolunteer from "../../components/volunteer/SearchVolunteer";
const Volunteer = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const PROFILE_VOLUNTEER  = `/user/profile/all?pageNum=${page}&pageSize=${pageSize}`;
  const { data: dataCall, isLoading: loadingCall } =
    useSWR<Profile[]>(PROFILE_VOLUNTEER);

  const [searchingVolunteer, setSearchingVolunteer] = useState<
    Profile[] | null
  >(null);
  const [chevronDir, setChevronDir] = useState(false);
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
            <Typography variant="h4"> داوطلبان کاریار</Typography>
          </Box>
          <AccordionStyled expanded={chevronDir}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                mb: 1.5,
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
                linkAll="/user/profile/all?pageNum=1&pageSize=100"
                searchData={null}
                useIn="volunteer"
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
                <SearchVolunteer
                setSearchingVolunteer={setSearchingVolunteer}
                chevronDir={chevronDir}
              />
              </Box>
            </AccordionDetails>
          </AccordionStyled>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader headerItems={volunteerTableHeader} />

              <TableBody>
                {(searchingVolunteer ? searchingVolunteer : dataCall)?.map(
                  (item, i: number) => (
                    <TableBodyVolunteer
                      key={item.id}
                      firstName={item.firstName}
                      lastName={item.lastName}
                      username={item.user.username}
                      role={item.role}
                      id={item.id}
                      picture={item.picture}
                      counter={itemCounterTable(page, pageSize, i)}
                      isActive={item.isActive}
                    />
                  )
                )}
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
          count={counterPagination(counterPage, pageSize)}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(_event: ChangeEvent<unknown>, value: number) => {
            setPage(value);
          }}
        />
      )}
    </Box>
  );
};

export default Volunteer;
