import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";

import { toast } from "react-toastify";
import useGetImage from "../../hooks/request/useGetImage";
import { editAxios, removeData } from "../../api/axios";

const UploadVolunteerImage = ({ setUserProfile, imageServer,id }: any) => {
  const [profileImage, setProfileImage] = useState<any>(null);
  const [, setSuccess] = useState(false);
  const [showImage, setShowImage] = useState(false); // handling showing image or not
  const { getPicture, pic } = useGetImage("/exam/after/week/image/get");
  const imageUploading = async (dataContent: FormData) => {
    setSuccess(false);
    try {
      const response = await editAxios(`/user/profile/image/upload`, {
        data: dataContent,
      });
      const data = await response.data;
      if (response.status === 200) {
        setUserProfile((prev: any) => ({ ...prev, profileImage: data.url }));
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeImage = async (id: number) => {
    try {
      await removeData(`/user/profile/image/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    imageServer.length > 5 && getPicture(imageServer);
    // if one of the profileImage or serverImage exist show image otherwise let user to choose an image
    if (profileImage || imageServer) {
      setShowImage(true);
    }
  }, [getPicture, imageServer, profileImage]);

  const pickImage = (e: React.ChangeEvent<any>) => {
    const image = e.target.files[0];
    if (image.size > 5000000) {
      toast.error("حجم فایل بیشتر از ۵ مگابایت است");
      return;
    }
    const validPrefix = ["image/jpg", "image/jpeg", "image/png"];
    if (!validPrefix.includes(image.type)) {
      toast.error("فرمت فایل قابل قبول نیست");
      return;
    }
    setShowImage(true);
    let dataContent = new FormData();
    dataContent.append("image", image);
    // console.log(dataContent);
    imageUploading(dataContent);
    setProfileImage(image);
  };

  return (
    <>
      <Typography variant="body2" sx={{ my: 1 }}>
        عکس پروفایل
      </Typography>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          width: "25rem",
          height: "11rem",
          p: 2,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        }}
      >
        {showImage ? (
          <>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                removeImage(id);
                setProfileImage(null);
                setUserProfile((prev: any) => ({
                  ...prev,
                  profileImage: "",
                }));
                setShowImage(false);

              }}
              sx={{ px: 4, mb: 1, height: "fit-content" }}
              endIcon={<DeleteIcon />}
            >
              حذف این عکس
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                width: 150,
              }}
            >
              <Box
                component="img"
                alt="profile image"
                width={80}
                height={80}
                sx={{
                  objectFit: "cover",
                  objectPosition: "center center",
                  borderRadius: 2,
                  mb: 1,
                }}
                src={profileImage ? URL.createObjectURL(profileImage) : pic}
              />
              <Typography
                variant="caption"
                sx={{
                  width: "100%",
                  whiteSpace: "nowrap",
                  textAlign: "right",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  direction: "rtl",
                }}
              >
                {profileImage?.name}
              </Typography>
            </Box>
          </>
        ) : (
          <Box>
            <Button
              variant="outlined"
              component="label"
              sx={{ display: "block", mb: 1, textAlign: "center" }}
            >
              فایل مورد نظر را انتخاب کنید
              <input
                name="ProfileImage"
                type="file"
                hidden
                onChange={pickImage}
              />
            </Button>
            <Typography variant="caption">
              * لطفاً عکسی در اندازهٔ مربع و در یکی از فرمت‌های PNG, JPEG, JPG
              انتخاب کنید. دقت کنید که حجم فایل بیشتر از ۵ مگابایت نباشد.{" "}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default memo(UploadVolunteerImage);
