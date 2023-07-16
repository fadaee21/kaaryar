import useSWR from "swr";
import { Box, Button, Container, Divider, useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { SeekerStudent } from "../../model";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BeforeWeekDetailShowComp from "../../components/beforeWeek/BeforeWeekDetailShowComp";
import AfterWeekDetailShowComp from "../../components/afterWeek/AfterWeekDetailShowComp";
import RegisterFormDetailComp from "../../components/RegisterFormDetail/RegisterFormDetailComp";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";

const SkillSeekerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentSkillSeeker = `/status/form/${id}`;

  const {
    data: student,
    isLoading: loading,
    error,
  } = useSWR<SeekerStudent>(studentSkillSeeker, {
    onSuccess: () => window.scrollTo(0, 0),
  });

  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  if (loading) {
    return <LoadingProgress />;
  }

  if (error) {
    toast.error(handleError(error));
    navigate(-1);
  }
  const { AfterWeekForm, BeforeWeekForm, regForm } = student || {};

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
        <RegisterFormDetailComp student={regForm} />
        {BeforeWeekForm && (
          <>
            <Divider />
            <BeforeWeekDetailShowComp
              typeComp="admission"
              student={BeforeWeekForm}
              matches={matches}
              id={id}
            />
          </>
        )}

        {AfterWeekForm && (
          <>
            <Divider />
            <AfterWeekDetailShowComp
              typeComp="admission"
              student={AfterWeekForm}
              matches={matches}
              id={id}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default SkillSeekerDetail;
