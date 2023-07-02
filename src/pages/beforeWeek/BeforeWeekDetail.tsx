import { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { BeforeWeekType, RegistrationForm } from "../../model";
import { Box, Button, Container, Divider, useMediaQuery } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import BeforeWeekDetailShow from "../../components/beforeWeek/BeforeWeekDetailShowComp";
import AlertDialog from "../../components/modal/AlertDialog";
import { useApproveWeek } from "../../hooks/request/useApprove";
import RegisterFormDetailComp from "../../components/RegisterFormDetail/RegisterFormDetailComp";

const BeforeWeekDetail = () => {
  const [student, setStudent] = useState<BeforeWeekType>();
  const [loading, setLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<
    "approve" | "disApprove" | undefined
  >(undefined);
  const { successObject, getApproveWeek, loadingRegWeek } = useApproveWeek();
  const handleOpenAlert = (alert: "approve" | "disApprove") => {
    console.log(alert);
    setAlertType(alert);
    setOpenAlert(true);
  };
  const handleCloseAlert = () => setOpenAlert(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const approveLink = "/exam/before/week/form/approve";
  const studentId = `/exam/before/week/form/${id}`;

  const getStudent = async () => {
    setLoading(true);
    try {
      let response = await getData(studentId);
      setStudent(response.data);
    } catch (error) {
      //TODO:handle Error
      console.log("catch block of error");
      console.log(error);
      navigate("/");
    }
    setLoading(false);
  };

  useEffect(() => {
    getStudent();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  const handleApprove = () => {
    getApproveWeek(id, { setApproved: true }, approveLink);
  };
  const handleDisApprove = () => {
    getApproveWeek(id, { setApproved: false }, approveLink);
  };

  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  if (loading || loadingRegWeek) {
    return <LoadingProgress />;
  }

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
        <Button
          variant="contained"
          endIcon={<ArrowBackIcon />}
          color="secondary"
          size="small"
          onClick={() => navigate(-1)}
        >
          بازگشت
        </Button>
      </Box>
      <Container maxWidth="lg">
        <RegisterFormDetailComp
          student={student?.registrationForm as RegistrationForm}
        />
        <Divider />
        <BeforeWeekDetailShow
          typeComp="exam"
          student={student}
          matches={matches}
          id={id}
          successObject={successObject}
          handleOpenAlert={handleOpenAlert}
        />
        <Divider />
      </Container>
      <AlertDialog
        handleCloseAlert={handleCloseAlert}
        openAlert={openAlert}
        firstName={student?.registrationForm.firstName}
        family={student?.registrationForm.family}
        alertType={alertType}
        handleApprove={
          alertType === "approve" ? handleApprove : handleDisApprove
        }
        alertPage="ارزیابی"
      />
    </>
  );
};

export default BeforeWeekDetail;
