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
import { PaperW } from "../../styles/addComment/formBox";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import { useDeleteComment } from "../../hooks/request/useDeleteComment";
import { useSWRConfig } from "swr";

const WatchComment = () => {
  const [open, setOpen] = useState(false);
  const { allComment, loading } = useGetOneComment();
  const [idComment, setIdComment] = useState<number>();
  const { removeComment } = useDeleteComment(idComment);
  const { mutate } = useSWRConfig();
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
    studentContribution,
    studentTask,
    sessionProblem,
    student: { firstName, family },
    commenter,
  } = allComment as Comment;

  const handleClickOpenEdit = () => {
    navigate("editing");
  };

  const handleBack = () => navigate(-1);

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setIdComment(id);
  };

  const handleDelete = async () => {
    setOpen(false);
    await removeComment();
    mutate(`/${roles}/survey/all`);
    navigate(`/${roles}/all-comments`);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ mb: 20 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 8,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            مشاهده نظر برای {`${firstName} ${family}`}
          </Typography>
          <Button
            endIcon={<DeleteIcon />}
            sx={{
              ml: "auto",
              ...(roles.toString() === "admin" && { display: "none" }),
            }}
            variant="contained"
            color="error"
            onClick={() => handleClickOpen(id)}
          >
            حذف نظر
          </Button>
          <Button
            sx={{
              mx: 1,
              ...(roles.toString() === "admin" && { display: "none" }),
            }}
            onClick={handleClickOpenEdit}
            endIcon={<EditIcon />}
            variant="outlined"
          >
            ویرایش نظر
          </Button>
          <Button
            onClick={handleBack}
            endIcon={<ArrowBackIcon />}
            variant="outlined"
            color="inherit"
            sx={{ ...(roles.toString() === "admin" && { ml: "auto" }) }}
          >
            بازگشت
          </Button>
        </Box>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={3}>
            <PaperW sx={{ minHeight: "8rem" }}>
              <Typography variant="body2">نام منتور</Typography>
              <Typography variant="body1">{`${commenter.firstName} ${commenter.family}`}</Typography>
            </PaperW>
          </Grid>
          <Grid item xs={3}>
            <PaperW sx={{ minHeight: "8rem" }}>
              <Typography variant="body2">نام مهارت آموز</Typography>
              <Typography variant="body1">{`${firstName} ${family}`}</Typography>
            </PaperW>
          </Grid>
          <Grid item xs={3}>
            <PaperW sx={{ minHeight: "8rem" }}>
              <Typography variant="body2">تاریخ جلسه</Typography>
              <Typography variant="body1">
                {/* in post Date of comment i must change type toISOstring,when fetch Date,it response with one day false! zero utc help to improve this fault */}
                {/* {dateConverter(zeroUTCOffset(new Date(sessionDate)))} */}
                {new Intl.DateTimeFormat("fa", { dateStyle: "full" })
                  .format(new Date(sessionDate))
                  .replace(",", "")
                  .split(" ")
                  .reverse()
                  .join(" ")}
              </Typography>
            </PaperW>
          </Grid>
          <Grid item xs={3}>
            <PaperW sx={{ minHeight: "8rem" }}>
              <Typography variant="body2">
                {descComment.allStudentPresent}
              </Typography>
              <Typography variant="body1">{studentPresent}</Typography>
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
              <Typography variant="body1">{studentContribution}</Typography>
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
    </Box>
  );
};

export default WatchComment;
