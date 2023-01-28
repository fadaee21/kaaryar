import React, { useEffect, useState } from "react";
import LoadingProgress from "../../components/LoadingProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { Comment } from "../../model";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { Container } from "@mui/system";
import {
  Alert,
  Box,
  IconButton,
  ListItem,
  Pagination,
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
import { useGetComments } from "../../hooks/request/useGetComments";
import { dateConverter } from "../../utils/dateConverter";
import { counterPagination } from "../../utils/counterPagination";
import { useNavigate, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuth } from "../../context/AuthProvider";

const Comments = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  // equality AuthRole With RoleWatch
  //if roleQuery was not same with roleAuth,you are not allowed to
  //edit or post comment,just you can see the comment

  const { auth } = useAuth();
  const roleAuth = auth.roles.toString();
  const navigate = useNavigate();

  const { getListComments, comments, loading, commentCounter } =
    useGetComments(page);
  console.log(comments);
  const handleClickOpenEdit = (id: any) => {
    navigate(`/${roleAuth}/all-comments/${id}/editing`);
  };
  const [idComment, setIdComment] = useState<number>();
  const {
    removeComment,
    refresh,
    errRemoveMsg,
    setErrRemoveMsg,
    successRemoveMsg,
    setSuccessRemoveMsg,
  } = useDeleteComment(idComment);

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setIdComment(id);
  };

  const handleDelete = () => {
    setOpen(false);
    removeComment();
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getListComments();
    // eslint-disable-next-line
  }, [page, refresh]);

  useEffect(() => {
    setTimeout(() => {
      setErrRemoveMsg("");
      setSuccessRemoveMsg("");
    }, 3000);
  }, [errRemoveMsg, setErrRemoveMsg, successRemoveMsg, setSuccessRemoveMsg]);

  if (roleAuth === "admin") {
    return (
      <p style={{ marginLeft: "auto", marginRight: "auto" }}>
        WAITING FOR CREATING API
      </p>
    );
  }
  if (loading) {
    return <LoadingProgress />;
  }
  return (
    <>
      <Box component={"article"} sx={{ my: 10 }}>
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
          >
            <Typography variant="h3"> فهرست نظرات</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left">تاریخ</StyledTableCell>
                  <StyledTableCell align="left">
                    نام و نام خانوادگی
                  </StyledTableCell>
                  <StyledTableCell align="left">نظر دهنده</StyledTableCell>
                  <StyledTableCell align="left">دوره آموزشی</StyledTableCell>
                  <StyledTableCell align="left">نظرات</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {comments.map((commentItem: Comment) => {
                  const {
                    id,
                    course,
                    studentUser,
                    comment,
                    createTime,
                    mentorUser,
                  } = commentItem;
                  return (
                    <StyledTableRow
                      key={id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ width: "10%", verticalAlign: "top" }}
                      >
                        <Typography variant="body2">
                          {dateConverter(createTime)}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ width: "15%", verticalAlign: "top" }}
                      >
                        <Typography variant="body1">
                          {studentUser.firstName + " " + studentUser.lastName}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ width: "15%", verticalAlign: "top" }}
                      >
                        <Typography variant="body2">
                          {mentorUser.firstName + " " + mentorUser.lastName}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ width: "15%", verticalAlign: "top" }}
                      >
                        <Typography variant="body2">
                          {course.courseName}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="left"
                        sx={{
                          width: "30%",
                          verticalAlign: "top",
                        }}
                      >
                        <Typography variant="body2">{comment}</Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="left"
                        sx={{ width: "5%", verticalAlign: "top" }}
                      >
                        <ListItem sx={{ pt: 0 }}>
                          <IconButton
                            onClick={() =>
                              navigate(`/${roleAuth}/all-comments/${id}`)
                            }
                          >
                            <VisibilityIcon fontSize="small" color="info" />
                          </IconButton>
                          <IconButton onClick={() => handleClickOpenEdit(id)}>
                            <EditIcon fontSize="small" color="primary" />
                          </IconButton>
                          <IconButton onClick={() => handleClickOpen(id)}>
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
                  <DialogTitle id="alert-dialog-title">
                    {"حذف  نظر"}
                  </DialogTitle>
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
          {errRemoveMsg && (
            <Alert severity="error" sx={{ width: "17rem", my: 2 }}>
              {errRemoveMsg}
            </Alert>
          )}
          {successRemoveMsg && (
            <Alert severity="success" sx={{ width: "17rem", my: 2 }}>
              {successRemoveMsg}
            </Alert>
          )}
        </Container>
      </Box>
      <Pagination
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 4,
        }}
        size="large"
        count={counterPagination(commentCounter, 10)}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={(event: React.ChangeEvent<unknown>, value: number) => {
          setPage(value);
        }}
      />
    </>
  );
};

export default Comments;
