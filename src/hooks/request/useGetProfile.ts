import { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import { Profile } from "../../model";

const useGetProfile = () => {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [loadingPrUser, setLoadingPrUser] = useState(true);
  const link = "/user/profile";
  const getProfileData = async () => {
    try {
      setLoadingPrUser(true);
      const res = await getData(link);
      const data = await res.data;
      if (res.status === 200) {
        setProfileData(data);
      }
      // console.log(JSON.parse(data.custom));
      setLoadingPrUser(false);
    } catch (error) {
      console.log(error);
      setLoadingPrUser(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return { profileData, loadingPrUser };
};

export default useGetProfile;
