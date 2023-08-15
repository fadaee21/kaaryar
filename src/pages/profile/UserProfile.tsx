import useSWR from "swr";
import UserInfo from "../../components/profile/UserInfo";
import LoadingProgress from "../../components/LoadingProgress";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { Navigate } from "react-router-dom";
const link = "/user/profile";
const UserProfile = () => {
  const { data, isLoading, error } = useSWR(link);

  if (isLoading) {
    return <LoadingProgress />;
  }
  if (error) {
    toast.error(handleError(error));
    return <Navigate to="/" replace />;
  }
  return <UserInfo profileData={data} />;
};

export default UserProfile;
