import { useState } from "react";
import useSWR from "swr";
import LoadingProgress from "../../components/LoadingProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Comment } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { Container } from "@mui/system";
import {
  Box,
  IconButton,
  ListItem,
  // Pagination,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteComment } from "../../hooks/request/useDeleteComment";
// import { counterPagination } from "../../utils/counterPagination";
import { Link, useNavigate, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuth } from "../../context/AuthProvider";
import TableHeader from "../../components/table/TableHeader";
import { commentsTableHeader } from "../../components/table/helper-header";
import { persianDate } from "../../utils/persianDate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { roleConverter } from "../../utils/roleConverter";

const TableCommentsInModule = () => {
  // const [chevronDir, setChevronDir] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    auth: { roles, username },
    adminVisibility,
  } = useAuth();
  const role = roles.toString();
  const PATH = `/${role}/all-comments`;
  const { student_id, module_id } = useParams();
  const COMMENTS_IN_MODULE_URL = `/total/student/survey/all/${student_id}?${module_id}`;
  const STUDENT_DETAIL_PATH = `/${role}/student/${student_id}`;
  const STUDENT_MODULE_PATH = `/${role}/core-course/${module_id}`;
  const {
    data: commentsTable,
    mutate,
    error: commentsTableError,
    isLoading: commentsTableLoading,
  } = useSWR(COMMENTS_IN_MODULE_URL);

  // const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handleClickOpenEdit = (id: any) => {
    navigate(`${PATH}/${id}/editing`);
  };
  const [idComment, setIdComment] = useState<number>();
  const { removeComment } = useDeleteComment(idComment);

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setIdComment(id);
  };

  //the bottleneck of this component was deleting,because after deleting in search table you should see the latest content and that's why i have to setSearchingComments(true) that swr let mutate searched data
  const handleDelete: () => void = async () => {
    setOpen(false);
    await removeComment();
    // refreshData();
    mutate();
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (commentsTableError) {
    toast.error(handleError(commentsTableError));
  }

  if (commentsTableLoading) {
    return <LoadingProgress />;
  }

  const student = commentsTable[0].student;
  const fullName = student.firstName + " " + student.family;
  return (
    <Box component={"article"} sx={{ m: 2, mb: 8 }}>
      <Container maxWidth="xl">
        <Box
          component={"div"}
          sx={{ display: "flex", alignItems: "center", mb: 6, width: "100%" }}
        >
          <Typography variant="h5">{`مهارت‌آموزان من > ${fullName} > نظرات`}</Typography>
          <Button
            sx={{ ml: "auto", mr: 2, py: 1, px: 5 }}
            size="small"
            variant="contained"
            onClick={() =>
              navigate(`/${roles}/student/${student.id}/add-comment/`, {
                state: {
                  student: student,
                },
              })
            }
          >
            افزودن نظر جدید
          </Button>
          <Button
            variant="outlined"
            sx={{ px: 5 }}
            color="inherit"
            endIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            بازگشت
          </Button>
        </Box>
        <Typography variant="body1" sx={{ my: 8 }}>
          {`          اینجا، می‌توانید تمام نظراتی که در دوره‌ی ${commentsTable[0]?.module?.name} روی ${fullName} ثبت شده است، ببینید.`}
        </Typography>
        {/* <AccordionStyled expanded={chevronDir}>
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
          </Box>
          <AccordionDetails>
            <Box
              sx={{
                width: "100%",
                my: 3,
              }}
            ></Box>
          </AccordionDetails>
        </AccordionStyled> */}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHeader headerItems={commentsTableHeader} />
            <TableBody>
              {commentsTable?.map((commentItem: Comment) => {
                const {
                  id,
                  module,
                  student,
                  commenter,
                  commenterRole,
                  sessionDate,
                  studentPresent,
                  sessionProblem,
                } = commentItem;
                const notAuthorizedUser = commenter?.username !== username;
                return (
                  <StyledTableRow
                    key={id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {/* <StyledTableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ width: "10%", verticalAlign: "center" }}
                    >
                      {persianDate(createdAt)}
                    </StyledTableCell> */}
                    <StyledTableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ width: "10%", verticalAlign: "center" }}
                    >
                      {persianDate(sessionDate)}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        width: "15%",
                        verticalAlign: "center",
                      }}
                    >
                      <Typography variant="body1">
                        <Link to={STUDENT_DETAIL_PATH}>
                          {student.firstName + " " + student.family}
                        </Link>
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ width: "15%", verticalAlign: "center" }}
                    >
                      <Typography variant="body1">
                        {commenter?.firstName + " " + commenter?.family}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell
                      align="center"
                      sx={{ width: "15%", verticalAlign: "center" }}
                    >
                      <Typography variant="body1">
                        {roleConverter(commenterRole)}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell
                      align="center"
                      sx={{ width: "15%", verticalAlign: "center" }}
                    >
                      <Typography variant="body1">
                        <Link to={STUDENT_MODULE_PATH}>{module?.name}</Link>
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ width: "15%", verticalAlign: "center" }}
                    >
                      <Typography variant="body1">
                        {sessionProblem.length ? sessionProblem : "-"}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ width: "15%", verticalAlign: "center" }}
                    >
                      <Typography variant="body1">
                        {studentPresent.length
                          ? studentPresent === "بله"
                            ? "حاضر"
                            : "غایب"
                          : "-"}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell
                      align="center"
                      sx={{
                        width: "10%",
                        verticalAlign: "center",
                      }}
                    >
                      <ListItem
                        sx={{ pt: 0, justifyContent: "center" }}
                        alignItems="center"
                      >
                        <IconButton onClick={() => navigate(`${PATH}/${id}`)}>
                          <VisibilityIcon fontSize="small" color="info" />
                        </IconButton>
                        <IconButton
                          sx={{
                            ...(adminVisibility && {
                              display: "none",
                            }),
                            ...(notAuthorizedUser && {
                              display: "none",
                            }),
                          }}
                          onClick={() => handleClickOpenEdit(`${id}`)}
                          disabled={notAuthorizedUser}
                        >
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                        <IconButton
                          sx={{
                            ...(adminVisibility && {
                              display: "none",
                            }),
                            ...(notAuthorizedUser && {
                              display: "none",
                            }),
                          }}
                          onClick={() => handleClickOpen(id)}
                          disabled={notAuthorizedUser}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </ListItem>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"حذف  نظر"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    آیا می خواهید این نظر را حذف کنید؟
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDelete} autoFocus>
                    بله
                  </Button>
                  <Button onClick={handleClose}>خیر</Button>
                </DialogActions>
              </Dialog>
            </TableBody>
          </Table>
        </TableContainer>
        {/* //!for empty response of search return TableEmpty */}
        {/* {searchResult?.length === 0 && <TableEmpty />} */}
      </Container>
      {/* {!searchResult && adminVisibility && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 4,
          }}
          size="large"
          count={counterPagination(commentCounter?.count, pageSize)}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(_event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
          }}
        />
      )} */}
    </Box>
  );
};

export default TableCommentsInModule;
