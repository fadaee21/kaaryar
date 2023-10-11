import useSWR from "swr";
import UserProfileNameComp from "../../components/userProfile/UserProfileNameComp";
import { useAuth } from "../../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import { VolunteerProfile } from "../../model";
import { Button, Container, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const UserProfileName = () => {
  const {
    auth: { username },
  } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, error } = useSWR<VolunteerProfile>(
    `/user/profile/username/${username}`
  );

  if (error) {
    // toast.error(handleError(error));
    if (error.response.status === 401) {
      return <Navigate to="/" replace />;
    }
  }
  if (isLoading) {
    return <LoadingProgress />;
  }

  return (
    <Container maxWidth="lg">
      <header>
        <Stack direction="row" sx={{ alignItems: "flex-start",mb:6 }}>
          <Stack sx={{ mr: "auto" }}>
            <Typography variant="h4">پروفایل کاربری</Typography>
          </Stack>
          <Button
            endIcon={<EditIcon />}
            variant="outlined"
            // onClick={() => navigate(`/admin/general-course/edit/${id}`)}
            sx={{ mr: 2, px: 5 }}
          >
            ویرایش
          </Button>
          <Button
            variant="outlined"
            sx={{ px: 5 }}
            color="inherit"
            endIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            بازگشت
          </Button>
        </Stack>
      </header>
      {data && (
        <UserProfileNameComp
          firstName={data?.firstName}
          lastName={data?.lastName}
          role={data?.role}
          isActive={data?.isActive}
          id={data?.id}
        />
      )}
    </Container>
  );
};

export default UserProfileName;
