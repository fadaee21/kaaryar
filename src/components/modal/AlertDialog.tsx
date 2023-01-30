import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Typography } from "@mui/material";
import { GreyButton } from "../../styles/Button";

export default function AlertDialog({
  handleCloseAlert,
  openAlert,
  firstName,
  family,
  handleApprove,
  alertType,
  alertPage,
}: any) {
  const handleAgree = () => {
    handleApprove();
    handleCloseAlert();
  };

  return (
    <Dialog
      open={openAlert}
      onClose={handleCloseAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ width: "35rem", mx: "auto" }}
    >
      {alertType === "approve" && (
        <>
          <DialogTitle id="alert-dialog-title">
            <Typography sx={{fontWeight:"700"}} variant="h5" component="p">تایید {alertPage}</Typography>
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-description"> */}
            <Typography variant="h6" component="p"  gutterBottom>
              آیا می خواهید {alertPage} {firstName} {family} را تایید کنید؟
            </Typography>
            <Typography variant="body2">
              با این کار، یک ایمیل به متقاضی ارسال می شود و از این راه به او
              اطلاع رسانی خواهد شد.
            </Typography>
            {/* </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <GreyButton variant="outlined" onClick={handleCloseAlert}>
              انصراف
            </GreyButton>
            <Button variant="contained" onClick={handleAgree} autoFocus>
              تایید کردن
            </Button>
          </DialogActions>
        </>
      )}
      {alertType === "disApprove" && (
        <>
          <DialogTitle id="alert-dialog-title">
            <Typography sx={{fontWeight:"700"}} variant="h5" component="p">رد {alertPage}</Typography>
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-description"> */}
            <Typography variant="h6" component="p" gutterBottom>
              آیا می خواهید {alertPage} {firstName} {family} را رد کنید؟
            </Typography>
            <Typography variant="body2">
              با این کار، یک ایمیل به متقاضی ارسال می شود و از این راه به او
              اطلاع رسانی خواهد شد.
            </Typography>
            {/* <Typography variant="body2" gutterBottom>
              شما می توانید در ضمیمه این ایمیل، توضیحات اضافه ای مبنی بر علت رد
              شدن، اضافه کنید
            </Typography>
            <TextField
              autoFocus
              placeholder="متن توضیحات را اینجا بنویسید"
              margin="dense"
              id="explanation"
              type="text"
              fullWidth
              variant="outlined"
            /> */}
            {/* </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <GreyButton variant="outlined" onClick={handleCloseAlert}>
              انصراف
            </GreyButton>
            <Button
              variant="contained"
              color="error"
              onClick={handleAgree}
              autoFocus
            >
              رد کردن
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
