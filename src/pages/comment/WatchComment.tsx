import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import LoadingProgress from "../../components/LoadingProgress";
import useGetOneComment from "../../hooks/request/useGetOneComment";
import { Container } from "@mui/system";
import { Comment } from "../../model";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { descComment } from "../../components/comment/commentOptions";
import { dateConverter } from "../../utils/dateConverter";
import { PaperW } from "../../styles/addComment/formBox";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import { useDeleteComment } from "../../hooks/request/useDeleteComment";

const WatchComment = () => {
  const [open, setOpen] = useState(false);
  const { allComment, loading } = useGetOneComment();
  const [idComment, setIdComment] = useState<number>();
  const { removeComment } = useDeleteComment(idComment);

  const navigate = useNavigate();
  const {
    auth: { roles },
  } = useAuth();
  if (loading) {
    return <LoadingProgress />;
  }
  const {
    id,
    comment,
    sessionDate,
    studentPresent,
    studentContribute,
    studentTask,
    sessionProblem,
    studentUser: { firstName, lastName },
    mentorUser,
  } = allComment as Comment;

  const handleClickOpenEdit = () => {
    navigate(`/${roles}/all-comments/${id}/editing`);
  };

  const handleBack = () => navigate(-1);

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setIdComment(id);
  };

  const handleDelete = () => {
    setOpen(false);
    removeComment();
    navigate(`/${roles}/all-comments`);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 8,
            display: "flex",
            justifyContent: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            مشاهده نظر برای {`${firstName} ${lastName}`}
          </Typography>
          <Button
            endIcon={<DeleteIcon />}
            sx={{ ml: "auto" }}
            variant="contained"
            color="error"
            onClick={() => handleClickOpen(id)}
          >
            حذف نظر
          </Button>
          <Button
            onClick={handleClickOpenEdit}
            endIcon={<EditIcon />}
            sx={{ mx: 1 }}
            variant="outlined"
          >
            ویرایش نظر
          </Button>
          <Button
            onClick={handleBack}
            endIcon={<ArrowBackIcon />}
            variant="outlined"
            color="inherit"
          >
            بازگشت
          </Button>
        </Box>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={3}>
            <PaperW>
              <Typography variant="body2">نام منتور</Typography>
              <Typography variant="body1">{`${mentorUser.firstName} ${mentorUser.lastName}`}</Typography>
            </PaperW>
          </Grid>
          <Grid item xs={3}>
            <PaperW>
              <Typography variant="body2">نام مهارت آموز</Typography>
              <Typography variant="body1">{`${firstName} ${lastName}`}</Typography>
            </PaperW>
          </Grid>
          <Grid item xs={3}>
            <PaperW>
              <Typography variant="body2">تاریخ جلسه</Typography>
              <Typography variant="body1">
                {dateConverter(sessionDate)}
              </Typography>
            </PaperW>
          </Grid>
          <Grid item xs={3}>
            <PaperW>
              <Typography variant="body2">
                {descComment.allStudentPresent}
              </Typography>
              <Typography variant="body1">
                {studentPresent === true
                  ? "بله"
                  : studentPresent === null
                  ? "فقط بخشی از جلسه را حضور داشت"
                  : "خیر"}
              </Typography>
            </PaperW>
          </Grid>
          <Grid item xs={12}>
            <PaperW>
              <Typography variant="body2" gutterBottom>
                لطفا گزارش کوتاهی از جلسه بنویسید
                <Typography variant="caption">
                  (احساس خودتان، وضعیت مهارت آموز از نظر شما، تکالیف و
                  پیشنهاداتی که به مهارت آموز داده‌اید و غیره)
                </Typography>
              </Typography>
              <Typography variant="body1">{comment}</Typography>
            </PaperW>
          </Grid>
          <Grid item xs={4}>
            <PaperW>
              <Typography variant="body2">
                {descComment.allStudentContribute}
              </Typography>
              <Typography variant="body1">{studentContribute}</Typography>
            </PaperW>
          </Grid>
          <Grid item xs={4}>
            <PaperW>
              <Typography variant="body2">
                {descComment.allStudentTask}
              </Typography>
              <Typography variant="body1">{studentTask}</Typography>
            </PaperW>
          </Grid>
          <Grid item xs={4}>
            <PaperW>
              <Typography variant="body2">
                {descComment.allSessionProblem}
              </Typography>
              <Typography variant="body1">{sessionProblem}</Typography>
            </PaperW>
          </Grid>
        </Grid>
      </Container>
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
    </>
  );
};

export default WatchComment;
