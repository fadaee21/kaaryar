import { Avatar } from "@mui/material";
import React from "react";
import useGetImage from "../hooks/request/useGetImage";
import { stringAvatar } from "../utils/avatarColor";

const TablePic = ({ picture, lastName }: any) => {
  const { pic, getPicture } = useGetImage(picture);
  React.useEffect(() => {
    if (picture !== null) {
      getPicture();
    }
  }, []);

  return (
    <>
      {pic !== null ? (
        <Avatar src={pic} />
      ) : (
        <Avatar {...stringAvatar(lastName)} />
      )}
    </>
  );
};

export default TablePic;
