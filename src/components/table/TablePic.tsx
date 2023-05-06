import { Avatar } from "@mui/material";
import React from "react";
import { getData } from "../../api/axios";
import useGetImage from "../../hooks/request/useGetImage";
import { stringAvatar } from "../../utils/avatarColor";

type Prop = {
  picture: {
    imageAddress: string;
  };
  lastName: string;
};
type Prop2 = {
  studentId: number;
  lastName: string;
};

const TablePic = ({ picture, lastName }: Prop) => {
  const { pic, getPicture } = useGetImage("/exam/after/week/image/get");
  React.useEffect(() => {
    if (picture !== null) {
      getPicture(picture?.imageAddress);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {pic !== undefined ? (
        <Avatar src={pic} />
      ) : (
        <Avatar {...stringAvatar(lastName)} />
      )}
    </>
  );
};

export default TablePic;

export const TablePic2 = ({ studentId, lastName }: Prop2) => {
  const { pic, getPicture } = useGetImage("/exam/after/week/image/get");
  React.useEffect(() => {
    const getLink = async () => {
      try {
        const res = await getData(`/moodle/user/image/${studentId}`);
        const data = await res.data;
        data?.imageAddress && getPicture(data.imageAddress);
      } catch (error) {
        console.log(error);
      }
    };
    getLink();
  }, [getPicture, studentId]);

  return (
    <>
      {pic !== undefined ? (
        <Avatar src={pic} />
      ) : (
        <Avatar {...stringAvatar(lastName)} />
      )}
    </>
  );
};
