import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import AfterListDash from "../../components/dashboard/AfterListDash";
import BeforeListDash from "../../components/dashboard/BeforeListDash";
import LastOpinionDash from "../../components/dashboard/LastOpinionDash";
// import OngoingCourseDash from "../components/dashboard/OngoingCourseDash";
import RegListDash from "../../components/dashboard/RegListDash";
import SkillSeekerListDash from "../../components/dashboard/SkillSeekerListDash";
import StudentListDash from "../../components/dashboard/StudentListDash";
// import TeachingCourseDash from "../components/dashboard/TeachingCourseDash";

const DashboardAdmin = () => {
  return (
    <Container maxWidth="lg">
      <Grid container rowSpacing={2} columnSpacing={4} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6}>
          <RegListDash />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BeforeListDash />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AfterListDash />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LastOpinionDash />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StudentListDash />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SkillSeekerListDash />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardAdmin;
