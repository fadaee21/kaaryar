import {
  Button,
  ButtonGroup,
  ListItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import SearchAll from "../../components/search/SearchAll";
import TablePic, { TablePic2 } from "../../components/TablePic";
import { useAuth } from "../../context/AuthProvider";
import {
  MoodleUser,
  // MoodleUser,
  MoodleUserAssignee,
} from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import styleRot from "../../styles/search/searchChevron.module.css";
import useMoodleAssignee from "../../hooks/request/useMoodleAssignee";

const StudentListMoodleTable = () => {
  const [page, setPage] = useState(1);
  const [chevronDir, setChevronDir] = useState(false);
  const [searchingMoodleStudent, setSearchingMoodleStudent] = useState<
    MoodleUser[] | null
  >(null);

  const { getListAssignee, students, loading } = useMoodleAssignee();

  const { auth } = useAuth();
  const roles = auth.roles.toString();
  const navigate = useNavigate();
  useEffect(() => {
    getListAssignee();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [page]);

  if (loading) {
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
            <Typography variant="h4"> فهرست مهارت آموزان</Typography>
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
                  className={chevronDir ? styleRot.rotate180 : styleRot.rotate0}
                />

                {/* //! export excel */}
              </AccordionSummaryStyled>
              <ExcelExport
                fileName={"excel export"}
                apiData={
                  searchingMoodleStudent ? searchingMoodleStudent : students
                }
              />
            </Box>
            <AccordionDetails>
              {/* //! export excel */}
              <Box
                sx={{
                  width: "100%",
                  my: 3,
                }}
              >
                <SearchAll
                  setSearchingMoodleStudent={setSearchingMoodleStudent}
                  searchPage="moodle"
                  chevronDir={chevronDir}
                />
              </Box>
            </AccordionDetails>
          </AccordionStyled>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left">
                    نام و نام خانوادگی
                  </StyledTableCell>
                  <StyledTableCell align="left">نام کاربری</StyledTableCell>
                  <StyledTableCell align="left">شهر</StyledTableCell>
                  <StyledTableCell align="left">موبایل</StyledTableCell>
                  <StyledTableCell align="left">ایمیل</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              {!searchingMoodleStudent && (
                <TableBody>
                  {students.map((moodleUser: MoodleUserAssignee, i: React.Key | null | undefined) => {
                    const {
                      id,
                      studentId,
                      // firstName,
                      // lastName,
                      // username,
                      // email,
                      // picture,
                      // city,
                      // mobile,
                      studentName,
                      studentFamily,
                    } = moodleUser;
                    return (
                      <StyledTableRow
                        //TODO: id from moodle Assignee is not unique for now insert index for key
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell
                          align="left"
                          sx={{ width: "5%", verticalAlign: "top" }}
                        >
                          <TablePic2
                            studentId={studentId}
                            lastName={studentFamily}
                          />
                          {/* <TablePic picture={picture} lastName={lastName} /> */}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "25%",
                            verticalAlign: "top",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            navigate(`/${roles}/student/${studentId}`)
                          }
                        >
                          <Typography variant="body1">
                            {studentName + " " + studentFamily}
                            {/* {firstName + " " + lastName} */}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "10%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2" textAlign={"left"}>
                            {/* {username} */}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "30%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2">
                            {/* {city} */}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "30%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2">
                            {/* {mobile} */}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "30%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2">
                            {/* {email} */}
                          </Typography>
                        </StyledTableCell>

                        {/* <StyledTableCell
                        align="left"
                        sx={{ width: "30%", verticalAlign: "top" }}
                      >
                        <ListItem sx={{ pt: 0 }}> */}
                        {/* <ButtonGroup
                            variant="contained"
                            color="secondary"
                            size="small"
                            aria-label="small button group"
                          >
                            <Button
                              onClick={() =>
                                navigate(`/${roles}/student/${id}`)
                              }
                            >
                              جزییات
                            </Button>
                            <Button>ویرایش</Button>
                          </ButtonGroup> */}
                        {/* </ListItem>
                      </StyledTableCell> */}
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              )}
              <TableBody>
                {searchingMoodleStudent?.map(
                  (searchingMoodleStudent: MoodleUser) => {
                    const {
                      id,
                      // studentId,
                      firstName,
                      lastName,
                      username,
                      email,
                      picture,
                      city,
                      mobile,
                      // studentName,
                      // studentFamily,
                    } = searchingMoodleStudent;

                    return (
                      <StyledTableRow
                        key={id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell
                          align="left"
                          sx={{ width: "5%", verticalAlign: "top" }}
                        >
                          <TablePic picture={picture} lastName={lastName} />
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "25%",
                            verticalAlign: "top",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/${roles}/student/${id}`)}
                        >
                          <Typography variant="body1">
                            {firstName + " " + lastName}
                            {/* {studentName + " " + studentFamily} */}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "10%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2" textAlign={"left"}>
                            {username}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "30%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2">{city}</Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "30%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2">{mobile}</Typography>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "30%",
                            verticalAlign: "top",
                          }}
                        >
                          <Typography variant="body2">{email}</Typography>
                        </StyledTableCell>

                        {/* <StyledTableCell
                        align="left"
                        sx={{ width: "30%", verticalAlign: "top" }}
                      >
                        <ListItem sx={{ pt: 0 }}> */}
                        {/* <ButtonGroup
                            variant="contained"
                            color="secondary"
                            size="small"
                            aria-label="small button group"
                          >
                            <Button
                              onClick={() =>
                                navigate(`/${roles}/student/${id}`)
                              }
                            >
                              جزییات
                            </Button>
                            <Button>ویرایش</Button>
                          </ButtonGroup> */}
                        {/* </ListItem>
                      </StyledTableCell> */}
                      </StyledTableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      {/* {!searchingMoodleStudent && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 4,
          }}
          size="large"
          count={24}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
          }}
        />
      )} */}
    </Box>
  );
};
export default StudentListMoodleTable;
