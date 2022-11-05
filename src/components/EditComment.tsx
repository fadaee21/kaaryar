import { useEffect, useState } from "react";
import { Alert, IconButton, Input, LinearProgress, Slide } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { editComment } from "../api/axios";
import { editCommentProp } from "../model";
import React from "react";
import { TransitionProps } from "@mui/material/transitions/transition";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditComment: React.FC<editCommentProp> = ({
  editId,
  openEditState,
  setOpenEditState,
  setRefreshByEdit,
  shareComment,
}) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const editCommentFunc = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await editComment(`ta/survey/${editId}`, {
        data: {
          "comment": `${comment}`,
        },
      });
      console.log(comment);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setErrorMsg("ویرایش انجام نشد");
      console.log(error);
      setLoading(false);
      console.log(comment);
    }
  };

  const handleClose = () => {
    setOpenEditState(false);
    setErrorMsg("");
    setComment("");
  };
  const handleEdit = () => {
    editCommentFunc();
  };

  useEffect(() => {
    if (success) {
      setRefreshByEdit((prev) => prev + 1);
      handleClose();
      setSuccess(false);
      setComment("");
    }
    // eslint-disable-next-line
  }, [success]);

  return (
    <>
      <Dialog
        fullScreen
        open={openEditState}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="h6">
              ویرایش دیدگاه
            </Typography>
            <Button autoFocus color="inherit" onClick={handleEdit}>
              ارسال
            </Button>
          </Toolbar>
        </AppBar>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            m: 8,
          }}
        >
          <Input
            sx={{ width: "100%" }}
            multiline
            onChange={(e) => setComment(e.target.value)}
            value={comment || shareComment}
          />
          {loading && (
            <>
              <LinearProgress
                sx={{ mt: 5, width: "100%" }}
                color={"secondary"}
              />
              <LinearProgress
                sx={{ my: 2, width: "100%" }}
                color={"secondary"}
              />
            </>
          )}
          {errorMsg && (
            <Alert sx={{ my: 5 }} severity="error">
              {errorMsg}
            </Alert>
          )}
        </List>
      </Dialog>
    </>
  );
};
