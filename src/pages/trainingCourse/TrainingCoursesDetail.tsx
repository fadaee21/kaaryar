import { Box, Button, ButtonGroup, Container } from "@mui/material";
import TrainingCourseDetailComp from "../../components/trainingCourse/detail/TrainingCourseDetailComp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const TrainingCoursesDetail = () => {
  const navigate = useNavigate();

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
          <Button endIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
            بازگشت
          </Button>
        </ButtonGroup>
      </Box>
      <Container maxWidth="lg">
        <TrainingCourseDetailComp />
      </Container>
    </>
  );
};

export default TrainingCoursesDetail;
