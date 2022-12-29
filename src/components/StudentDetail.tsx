import { Avatar, Button, ButtonGroup, Container, Grid } from "@mui/material";
import React from "react";
import useGetImage from "../hooks/request/useGetImage";
import { MoodleUser } from "../model";
import { DetailTypography } from "../styles/studentDetail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

interface Student {
  student: MoodleUser | null;
}

const StudentDetail = ({ student }: Student) => {
  const { pic, getPicture } = useGetImage();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (student!.picture !== null) {
      getPicture(student!.picture?.address);
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          marginRight: 5,
        }}
      >
        <ButtonGroup
          variant="contained"
          color="secondary"
          size="small"
          aria-label="small button group"
        >
          <Button
            onClick={() =>
              navigate("add-comment", {
                state: {
                  student: student,
                },
              })
            }
          >
            ثبت نظر
          </Button>
          <Button endIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
            بازگشت
          </Button>
        </ButtonGroup>
      </Box>
      <Container maxWidth="lg">
        <Grid container>
          <Grid
            item
            sm={4}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {pic !== undefined ? (
              <Avatar
                sx={{
                  width: "8rem",
                  height: "8rem",
                  borderRadius: "50%",
                  m: 1,
                }}
                src={pic!}
                alt="profile image"
              />
            ) : (
              <AccountCircleIcon sx={{ fontSize: 150 }} />
            )}
          </Grid>
          <Grid
            item
            sm={8}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Grid container>
              <Grid item md={6}>
                <DetailTypography variant="body1">
                  <b> نام : </b>
                  {student?.firstName}
                </DetailTypography>
                <DetailTypography variant="body1">
                  <b> نام خانوادگی : </b>
                  {student?.lastName}
                </DetailTypography>
                <DetailTypography variant="body1">
                  <b> نام کاربری : </b>
                  {student?.username}
                </DetailTypography>
                <DetailTypography variant="body1">
                  <b> تلفن ثابت : </b>
                  {student?.phone}
                </DetailTypography>
                <DetailTypography variant="body1">
                  <b> تلفن همراه : </b>
                  {student?.mobile}
                </DetailTypography>
                <DetailTypography variant="body1">
                  <b> موسسه : </b>
                  {student?.institution}
                </DetailTypography>
              </Grid>
              <Grid item md={6}>
                <DetailTypography variant="body2">
                  <b> ایمیل : </b>
                  {student?.email}
                </DetailTypography>
                <DetailTypography variant="body2">
                  <b> کشور : </b>
                  {student?.country}
                </DetailTypography>
                <DetailTypography variant="body2">
                  <b> شهر : </b>
                  {student?.city}
                </DetailTypography>
                <DetailTypography variant="body2">
                  <b> محل سکونت : </b>
                  {student?.address}
                </DetailTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default StudentDetail;
