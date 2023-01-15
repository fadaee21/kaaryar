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
import TablePic from "../../components/TablePic";
import { useAuth } from "../../context/AuthProvider";
import { MoodleUser } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";

const StudentListMoodleTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchingMoodleStudent, setSearchingMoodleStudent] = useState<
    MoodleUser[] | null
  >(null);
  const navigate = useNavigate();
  const allStudentMoodle = `moodle/user/all?pageNum=${page - 1}&pageSize=60`;
  //TODO:  take it from this page to a hook
  const getListLearner = async () => {
    setLoading(true);
    try {
      let response = await getData(allStudentMoodle);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      setLoading(false);
      navigate("/");
    }
  };

  const { auth } = useAuth();
  const roles = auth.roles.toString();

  useEffect(() => {
    getListLearner();
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
            <Typography variant="h4"> لیست مهارت جوها</Typography>
            {/* //! export excel */}
            <ExcelExport
              fileName={"excel export"}
              apiData={
                searchingMoodleStudent ? searchingMoodleStudent : students
              }
            />
            {/* //! export excel */}
          </Box>
          <Box
            sx={{
              width: "100%",
              my: 3,
            }}
          >
            <SearchAll
              setSearchingMoodleStudent={setSearchingMoodleStudent}
              searchPage="moodle"
            />
          </Box>
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
                  {students.map((moodleUser: MoodleUser) => {
                    const {
                      id,
                      firstName,
                      lastName,
                      username,
                      email,
                      picture,
                      city,
                      mobile,
                    } = moodleUser;
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
                      lastName,
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
          count={24}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
          }}
        />
      )}
    </Box>
  );
};
export default StudentListMoodleTable;
