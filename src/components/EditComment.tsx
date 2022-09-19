import React, { useEffect, useState } from "react";
import { Box, IconButton, Input } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useEditComment } from "../hooks/request/useEditComment";

interface editProp {
  editId: number;
  setOpenEditState: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshByEdit: React.Dispatch<React.SetStateAction<number>>;
}


//! in this component error and loading not handle

export const EditComment: React.FC<editProp> = ({
  editId,
  setOpenEditState,
  setRefreshByEdit,
}) => {
  const [comment, setComment] = useState("");
  const { editCommentFunc, errorMsg, loading } = useEditComment(
    comment,
    editId
  );

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    editCommentFunc();
    setRefreshByEdit((prev) => prev + 1);
    setOpenEditState(false);
  };


  return (
    <Box
      component={"form"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <Input
        id="input-edit-comment"
        multiline
        onChange={(e) => setComment(e.target.value)}
        type="text"
        autoComplete="off"
      />
      <IconButton type="submit" onClick={handleEdit}>
        <CheckIcon color="primary" fontSize="small" />
      </IconButton>
    </Box>
  );
};
