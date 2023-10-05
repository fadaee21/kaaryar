import Container from "@mui/material/Container";
import useSWR from "swr";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { ShortCoreModule, VolunteerProfile } from "../../model";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import StudentVolunteerComp from "../../components/volunteer/VolunteerDetailComp/student-volunteer/StudentVolunteerRowComp";
import CoreModuleCourseComp from "../../components/coreCourse/detail/CoreModuleCourseComp";
import StudentVolunteerRowComp from "../../components/volunteer/VolunteerDetailComp/student-volunteer/StudentVolunteerRowComp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionDetails,
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import TableHeader from "../../components/table/TableHeader";
import { useState } from "react";
import { volunteerStudentTableHeader } from "../../components/table/helper-header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StudentVolunteerAll = () => {
  const [chevronDir, setChevronDir] = useState(false);
  const { username } = useParams();
  const {
    data: dataCall,
    isLoading: loadingCall,
    error: errorCall,
  } = useSWR<VolunteerProfile>(`/user/profile/username/${username}`);
  const navigate = useNavigate();
  if (loadingCall) {
    return <LoadingProgress />;
  }
  if (errorCall) {
    toast.error(handleError(errorCall));
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxWidth="xl">
      <header>
        <Stack direction="row" sx={{ alignItems: "center", height: 100 }}>
          <Stack sx={{ mr: "auto" }}>
            <Typography variant="h5">{`${dataCall?.firstName} ${dataCall?.lastName} > مهارت‌آموزان`}</Typography>
          </Stack>
          <Button
            variant="outlined"
            sx={{ px: 5 }}
            color="inherit"
            endIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            بازگشت
          </Button>
        </Stack>
      </header>
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
          {/* <ExcelExport
                fileName={"Applicant Info"}
                linkAll="/user/profile/all?pageNum=1&pageSize=100"
                searchData={null}
                useIn="volunteer"
              /> */}
        </Box>
        <AccordionDetails>
          {/* //!component for searching student */}
          <Box
            sx={{
              width: "100%",
              my: 3,
            }}
          >
            {/* <SearchVolunteer
                setSearchingVolunteer={setSearchingVolunteer}
                chevronDir={chevronDir}
              /> */}
          </Box>
        </AccordionDetails>
      </AccordionStyled>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHeader headerItems={volunteerStudentTableHeader} />

          <TableBody>
            {/* {(searchingVolunteer ? searchingVolunteer : dataCall)?.map(
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
                )} */}
            {[{}, {}, {}].map((item, inx) => (
              <StudentVolunteerRowComp {...item} counter={inx + 1} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StudentVolunteerAll;
