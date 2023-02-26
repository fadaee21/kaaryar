import useGetProfile from "../../hooks/request/useGetProfile";
import UserInfo from "../../components/profile/UserInfo";
import LoadingProgress from "../../components/LoadingProgress";
const UserProfile = () => {
  const { profileData, loadingPrUser } = useGetProfile();

  if (loadingPrUser) {
    return <LoadingProgress />;
  }

  return <UserInfo profileData={profileData} />;
};

export default UserProfile;
