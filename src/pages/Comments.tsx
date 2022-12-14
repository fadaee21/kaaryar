import React, { useEffect, useState } from "react";
import LoadingProgress from "../components/LoadingProgress";
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
import { counterPagination } from "../utils/counterPagination";

const Comments = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = React.useState(false);

  const [openEditState, setOpenEditState] = React.useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [refreshByEdit, setRefreshByEdit] = useState(0);
  const [shareComment, setShareComment] = useState("");
  const handleClickOpenEdit = (id: number, comment: string) => {
    setOpenEditState(true);
    setEditId(id);
    setShareComment(comment);
  };

  const [idComment, setIdComment] = useState<number>();
  const { getListLearner, comments, loading, commentCounter } =
    useGetComments(page);
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

  console.log(refreshByEdit);

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
        <Container maxWidth="xl">
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
          >
            <Typography variant="h3"> ???????? ??????????</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left">??????????</StyledTableCell>
                  <StyledTableCell align="left">
                    ?????? ?? ?????? ????????????????
                  </StyledTableCell>
                  <StyledTableCell align="left">???????? ????????????</StyledTableCell>
                  <StyledTableCell align="left">??????????</StyledTableCell>
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
                        <Typography variant="body2">{comment}</Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        align="left"
                        sx={{ verticalAlign: "top" }}
                      >
                        <ListItem sx={{ pt: 0 }}>
                          <IconButton
                            onClick={() => handleClickOpenEdit(id, comment)}
                          >
                            <EditIcon color="primary" fontSize="small" />
                          </IconButton>
                          <IconButton onClick={() => handleClickOpen(id)}>
                            <DeleteIcon color="error" fontSize="small" />
                          </IconButton>
                        </ListItem>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
                <EditComment
                  editId={editId}
                  openEditState={openEditState}
                  setOpenEditState={setOpenEditState}
                  setRefreshByEdit={setRefreshByEdit}
                  shareComment={shareComment}
                />
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"??????  ??????"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      ?????? ???? ???????????? ?????? ?????? ???? ?????? ??????????
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDelete} autoFocus>
                      ??????
                    </Button>
                    <Button onClick={handleClose}>??????</Button>
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
        count={counterPagination(commentCounter,10)}
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
