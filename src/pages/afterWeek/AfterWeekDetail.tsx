import { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { AfterWeekType, BeforeWeekType, RegistrationForm } from "../../model";
import { Box, Button, Container, Divider, useMediaQuery } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import BeforeWeekDetailShowComp from "../../components/beforeWeek/BeforeWeekDetailShowComp";
import AfterWeekDetailShowComp from "../../components/afterWeek/AfterWeekDetailShowComp";
import AlertDialog from "../../components/modal/AlertDialog";
import { useApproveWeek } from "../../hooks/request/useApprove";
import RegisterFormDetailComp from "../../components/RegisterFormDetail/RegisterFormDetailComp";

const AfterWeekDetail = () => {
  const [student, setStudent] = useState<AfterWeekType>();
  const [loading, setLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<
    "approve" | "disApprove" | undefined
  >(undefined);
  const [refreshPage, setRefreshPage] = useState(1); // after linking moodle user to after week, refresh page to get payment image
  const refreshingPage = () => setRefreshPage((t) => t + 1);
  const { successObject, getApproveWeek, loadingRegWeek } = useApproveWeek();
  const handleOpenAlert = (alert: "approve" | "disApprove") => {
    console.log(alert);
    setAlertType(alert);
    setOpenAlert(true);
  };
  const handleCloseAlert = () => setOpenAlert(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const approveLink = "/exam/after/week/form/approve";
  useEffect(() => {
    const studentIdAfterWeek = `/exam/after/week/form/${id}`;
    const getStudent = async () => {
      setLoading(true);
      try {
        let response = await getData(studentIdAfterWeek);
        setStudent(response.data);
        setLoading(false);
      } catch (error) {
        //TODO:handle Error
        console.log("catch block of error");
        console.log(error);
        setLoading(false);
        navigate("/");
      }
    };

    getStudent();
    window.scrollTo(0, 0);
  }, [refreshPage, id, navigate]);

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
          variant="outlined"
          sx={{ px: 5 }}
          color="inherit"
          endIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          بازگشت
        </Button>
      </Box>
      <Container maxWidth="lg">
        <RegisterFormDetailComp
          student={
            student?.beforeWeekForm?.registrationForm as RegistrationForm
          }
        />
        <Divider />
        <BeforeWeekDetailShowComp
          typeComp="admission"
          student={student?.beforeWeekForm as BeforeWeekType}
          matches={matches}
          id={id}
        />
        <Divider />
        <AfterWeekDetailShowComp
          typeComp="admission"
          student={student}
          matches={matches}
          id={id}
          successObject={successObject}
          handleOpenAlert={handleOpenAlert}
          refreshingPage={refreshingPage}
        />
      </Container>
      <AlertDialog
        handleCloseAlert={handleCloseAlert}
        openAlert={openAlert}
        firstName={student?.beforeWeekForm?.registrationForm.firstName}
        family={student?.beforeWeekForm?.registrationForm.family}
        alertType={alertType}
        handleApprove={
          alertType === "approve" ? handleApprove : handleDisApprove
        }
        alertPage="پذیرش"
      />
    </>
  );
};

export default AfterWeekDetail;
