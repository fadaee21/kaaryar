import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { postData } from "../api/axios";
import useGetImage from "../hooks/request/useGetImage";

const UploadImage: React.FC<any> = ({ id, disableProp }) => {
  const [paymentImage, setPaymentImage] = useState<any>("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  //get url and render the image:
  const { pic, getPicture } = useGetImage("/exam/after/week/image/get");
  const imageUploading = async () => {
    setSuccess(false);
    try {
      let dataContent = new FormData();
      dataContent.append("file", paymentImage);
      const response = await postData(`exam/image/payment/upload/${id}`, {
        data: dataContent,
      });
      const data = await response.data;
      if (response.status === 200) {
        getPicture(data.url);
        setSuccess(true);
        setMessage("تصویر با موفقیت ثبت شد");
      }
    } catch (error) {
      console.log(error);
      setMessage("تصویر ثبت نشد");
    }
    //error or success message handling
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    imageUploading();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Typography variant="body1">بارگذاری فیش پرداخت</Typography>
      <Box sx={{ my: 3 }}>
        {paymentImage &&
          (success ? (
            <Box
              component={"img"}
              alt="payment image"
              width={"300px"}
              src={pic}
            />
          ) : (
            <Box
              component={"img"}
              alt="payment image"
              width={"300px"}
              src={URL.createObjectURL(paymentImage)}
              sx={{ filter: "opacity(50%)" }}
            />
          ))}
        <Typography variant="subtitle2">{message}</Typography>
      </Box>

      <Box component={"form"} onSubmit={handleSubmit}>
        <Button
          variant="contained"
          component="label"
          sx={{ mx: 1 }}
          disabled={disableProp ? true : false}
          >
          برداشتن فیش
          <input
            name="instituteType"
            type="file"
            hidden
            onChange={(e: React.ChangeEvent<any>) => {
              setPaymentImage(e.target.files[0]);
            }}
          />
        </Button>
        <Button
          disabled={disableProp ? true : false}
          variant="contained"
          type="submit"
          endIcon={<CloudUploadIcon />}
        >
          ارسال
        </Button>
      </Box>
    </Box>
  );
};

export default UploadImage;
