import Container from "@mui/material/Container";
import useSWR from "swr";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { VolunteerProfile } from "../../model";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";

import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TableHeader from "../../components/table/TableHeader";
import { volunteerStudentTableHeader } from "../../components/table/helper-header";
import StudentVolunteerRowComp from "../../components/volunteer/VolunteerDetailComp/student-volunteer/StudentVolunteerRowComp";
const StudentVolunteerInModule = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const {
    data: dataCall,
    isLoading: loadingCall,
    error: errorCall,
  } = useSWR<VolunteerProfile>(`/user/profile/username/${username}`);

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
            <Typography variant="h5">{`${dataCall?.firstName} ${dataCall?.lastName} > دوره‌های فعالیت > نام دوره!! > مهارت‌آموزان`}</Typography>
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

export default StudentVolunteerInModule;
