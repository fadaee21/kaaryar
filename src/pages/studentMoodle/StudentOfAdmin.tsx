import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExcelExport } from "../../components/ExcelExport";
import LoadingProgress from "../../components/LoadingProgress";
import SearchAll from "../../components/search/SearchAll";
import TablePic from "../../components/table/TablePic";
import { useAuth } from "../../context/AuthProvider";
import {
  // moodleJustStudent,
  MoodleUser,
} from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "../../styles/search/accordion";
import styleRot from "../../styles/search/searchChevron.module.css";
import useMoodle from "../../hooks/request/useMoodle";
import useCountPagination from "../../hooks/request/useCountPagination";
import { counterPagination } from "../../utils/counterPagination";
import TableEmpty from "../../components/table/TableEmpty";

const StudentOfAdmin = () => {
  const [page, setPage] = useState(1);
  const pageSize = 25;
  const adminStudent = `moodle/user/student/all?pageNum=${page}&pageSize=${pageSize}`;

  const studentCount = "moodle/user/student/count";
  const [, counterPage] = useCountPagination(studentCount);
  const [chevronDir, setChevronDir] = useState(false);
  const [searchingMoodleStudent, setSearchingMoodleStudent] = useState<
    MoodleUser[] | null
  >(null);

  const { students, loading } = useMoodle(adminStudent, page);

  const { auth } = useAuth();
  const roles = auth.roles.toString();
  const navigate = useNavigate();

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
                linkAll="moodle/user/student/all?pageNum=1&pageSize=100000"
                searchData={searchingMoodleStudent}
                useIn="studentOfAdmin"
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
          {/* //!for empty response of search return TableEmpty */}
          {searchingMoodleStudent?.length === 0 && <TableEmpty />}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              {/* //!for empty response of search don't return TableHeader */}
              {searchingMoodleStudent?.length !== 0 && (
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
              )}
              {!searchingMoodleStudent && (
                <TableBody>
                  {students.map((moodleUser: MoodleUser, i: React.Key) => {
                    const {
                      id,
                      firstName,
                      family,
                      username,
                      email,
                      picture,
                      city,
                      mobile,
                    } = moodleUser;
                    return (
                      <StyledTableRow
                        //TODO:add id as key not index
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell
                          align="left"
                          sx={{ width: "5%", verticalAlign: "top" }}
                        >
                          {/* //TODO: add picture */}
                          {/* <TablePic picture={picture} lastName={family} /> */}
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
                            {firstName + " " + family}
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
                  })}
                </TableBody>
              )}
              <TableBody>
                {searchingMoodleStudent?.map(
                  (searchingMoodleStudent: MoodleUser) => {
                    const {
                      id,
                      firstName,
                      family,
                      username,
                      email,
                      picture,
                      city,
                      mobile,
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
                          {/* <TablePic picture={picture} lastName={family} /> */}
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
                            {firstName + " " + family}
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
      {!searchingMoodleStudent && (
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
          onChange={(_event, value: number) => {
            setPage(value);
            setChevronDir(false); //after changing the page close search bar
          }}
        />
      )}
    </Box>
  );
};
export default StudentOfAdmin;
