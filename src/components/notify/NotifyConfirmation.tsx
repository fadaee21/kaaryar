import React, { FormEvent } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { GreyButton } from "../../styles/Button";
interface Props {
  open: boolean;
  title:string
  handleClose: () => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
}
export const NotifyConfirmation = ({
  open,
  handleClose,
  handleSubmit,
  title
}: Props) => {
  const submitButton = (e: FormEvent) => {
    handleSubmit(e);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          آیا از ذخیره تغییرات مطمئنید؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <GreyButton variant="outlined" onClick={handleClose}>
          انصراف
        </GreyButton>
        <Button
          variant="contained"
          type="submit"
          onClick={submitButton}
          autoFocus
        >
          بله
        </Button>
      </DialogActions>
    </Dialog>
  );
};
