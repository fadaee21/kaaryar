import Container from "@mui/material/Container";
import useSWR from "swr";
import { Navigate, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress";
import VolunteerDetailComp from "../../components/profile/VolunteerDetailComp";
import { Profile } from "../../model";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";

const VolunteerDetail = () => {
  const { username } = useParams();
  const {
    data: dataCall,
    isLoading: loadingCall,
    error: errorCall,
  } = useSWR<Profile>(`/user/profile/username/${username}`);

  if (loadingCall) {
    return <LoadingProgress />;
  }
  if (errorCall) {
    toast.error(handleError(errorCall));
    return <Navigate to="/" replace />;
  }
  if (!dataCall?.id) {
    return <Navigate replace to={`/notfound`} />;
  }
  return (
    <Container maxWidth="lg">
      <VolunteerDetailComp {...dataCall} usernameParam={username} />
    </Container>
  );
};

export default VolunteerDetail;
