import React, { useEffect, useState } from "react";
import LoadingProgress from "../components/LoadingProgress";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { Comment } from "../model";
import { StyledTableCell, StyledTableRow } from "../styles/table";
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
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteComment } from "../hooks/request/useDeleteComment";
import { useGetComments } from "../hooks/request/useGetComments";
import { dateConverter } from "../utils/dateConverter";
import { EditComment } from "../components/EditComment";

const TaComments = () => {
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);

  const [openEditState, setOpenEditState] = React.useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [refreshByEdit, setRefreshByEdit] = useState(0);

  const handleClickOpenEdit = (id: number) => {
    setOpenEditState(!openEditState);
    setEditId(id);
  };

  const [idComment, setIdComment] = useState<number>();
  const navigate = useNavigate();
  const { getListLearner, comments, loading } = useGetComments(page);
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
    getListLearner();
    // eslint-disable-next-line
  }, [page, refresh, refreshByEdit]);

  useEffect(() => {
    setTimeout(() => {
      setErrRemoveMsg("");
      setSuccessRemoveMsg("");
    }, 3000);
  }, [errRemoveMsg, setErrRemoveMsg, successRemoveMsg, setSuccessRemoveMsg]);

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <>
      <Box component={"article"} sx={{ my: 10 }}>
        <Container maxWidth="lg">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
          >
            <Typography variant="h3"> لیست نظرات</Typography>
            <Button
              variant="contained"
              color="info"
              onClick={() => navigate("/add-comment")}
            >
              {" "}
              افزودن نظر جدید
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left">تاریخ</StyledTableCell>
                  <StyledTableCell align="left">
                    نام و نام خانوادگی
                  </StyledTableCell>
                  <StyledTableCell align="left">دوره آموزشی</StyledTableCell>
                  <StyledTableCell align="left">نظرات</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {comments.map((commentItem: Comment) => {
                  const { id, course, studentUser, comment, createTime } =
                    commentItem;
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
                        sx={{ width: "20%", verticalAlign: "top" }}
                      >
                        <Typography variant="body2">
                          {dateConverter(createTime)}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ width: "20%", verticalAlign: "top" }}
                      >
                        <Typography variant="body1">
                          {studentUser.firstName + " " + studentUser.lastName}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ verticalAlign: "top" }}
                      >
                        <Typography variant="body2" textAlign={"right"}>
                          {course.courseName}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="left"
                        sx={{ width: "50%", verticalAlign: "top" }}
                      >
                        {!openEditState ? (
                          <Typography variant="body2">{comment}</Typography>
                        ) : editId === id ? (
                          <EditComment
                            editId={editId}
                            setOpenEditState={setOpenEditState}
                            setRefreshByEdit={setRefreshByEdit}
                          />
                        ) : (
                          <Typography variant="body2">{comment}</Typography>
                        )}
                      </StyledTableCell>

                      <StyledTableCell
                        align="left"
                        sx={{ verticalAlign: "top" }}
                      >
                        <ListItem sx={{ pt: 0 }}>
                          <IconButton onClick={() => handleClickOpenEdit(id)}>
                            {!openEditState ? (
                              <EditIcon color="primary" fontSize="small" />
                            ) : editId === id ? (
                              <CloseIcon color="error" fontSize="small" />
                            ) : (
                              <EditIcon color="primary" fontSize="small" />
                            )}
                          </IconButton>
                          <IconButton onClick={() => handleClickOpen(id)}>
                            <DeleteIcon color="error" fontSize="small" />
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
        count={1}
        variant="outlined"
        shape="rounded"
        onChange={(event: React.ChangeEvent<unknown>, value: number) => {
          setPage(value - 1);
        }}
      />
    </>
  );
};

export default TaComments;
