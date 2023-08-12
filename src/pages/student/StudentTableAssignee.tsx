import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { Navigate, useNavigate } from "react-router-dom";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import { useAuth } from "../../context/AuthProvider";
import { MoodleUser } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { AccordionStyled } from "../../styles/search/accordion";
import useSWR from "swr";
import TableHeader from "../../components/table/TableHeader";
import { studentTableHeader } from "../../components/table/helper-header";
import TablePic from "../../components/table/TablePic";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
//^this component list related student for mentor and ta
const StudentTableAssignee = () => {
  const { auth } = useAuth();
  const roles = auth.roles.toString();
  const { data, isLoading, error } = useSWR<MoodleUser[]>(
    `/${roles}/user/student`
  );
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingProgress />;
  }

  if (error) {
    toast.error(handleError(error));
    if (error.response.status === 401) {
      return <Navigate to="/" replace />;
    }
  }

  return (
    <Box sx={{ m: 2, mb: 10 }}>
      <Box component={"article"}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 6 }}
          >
            <Typography variant="h4"> فهرست مهارت آموزان</Typography>
          </Box>

          <AccordionStyled>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                mb: 1.5,
              }}
            >
              {/* //! export excel */}

              <ExcelExport
                fileName={"excel export"}
                linkAll={`/${roles}/user/student`}
                searchData={null}
                useIn="studentListMoodleTable"
              />
            </Box>
          </AccordionStyled>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHeader headerItems={studentTableHeader} />
              <TableBody>
                {data?.map((moodleUser: MoodleUser, i: number) => {
                  const {
                    id,
                    firstName,
                    family,
                    username,
                    picture,
                    city,
                    statusForm,
                    registrationForm,
                  } = moodleUser;
                  return (
                    <StyledTableRow
                      key={id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`${id}`)}
                      >
                        <Typography variant="body2">{i + 1}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TablePic picture={picture} lastName={family} />
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`${id}`)}
                      >
                        <Typography variant="body1">
                          {firstName + " " + family}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2" textAlign={"center"}>
                          {username}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {registrationForm?.city || city || "-"}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {registrationForm?.province || "-"}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {registrationForm?.course ?? "-"}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {registrationForm?.refer || "-"}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {statusForm?.trainingStatus?.value ?? "-"}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {statusForm?.nextTrainingStep?.value ?? "-"}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {statusForm?.referralToFinance?.value ?? "-"}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          verticalAlign: "center",
                        }}
                      >
                        <Typography variant="body2">
                          {statusForm?.kaaryarAssessment?.value ?? "-"}
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};
export default StudentTableAssignee;
