import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editAxios } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
//TODO:look again maybe you don't need to use HOOK, just regular function is ok
interface RelatedLink {
  web?: string;
  linkedin?: string;
  github?: string;
  gitlab?: string;
  gate?: string;
}
interface DesiredLink {
  id?: number;
  address?: string;
  title?: string;
  first?: boolean;
}
interface UserProfile {
  profileName?: string;
  profileFamily?: string;
  profileGender?: string;
  profileBirth?: string;
  profileCountry?: string;
  profileCity?: string;
  profileMobile?: string;
  profileEmail?: string;
  profileRole?: string;
  profileImage?: string;
  profileEduLevel?: string;
  profileFieldStudy?: string;
  profileEduPlace?: string;
  profileCurrentJob?: string;
  profileCurrentWorkPlace?: string;
}
type About = string;

const useEditProfile = () => {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const {
    auth: { roles },
  } = useAuth();
  const navigate = useNavigate();
  const editProfile = async (
    relatedLink: RelatedLink,
    desiredLink: DesiredLink[],
    userProfile: UserProfile,
    about: About
  ) => {
    const { web, linkedin, github, gitlab, gate } = relatedLink;

    const {
      profileName,
      profileFamily,
      profileGender,
      profileBirth,
      profileCountry,
      profileCity,
      profileMobile,
      profileEmail,
      profileRole,
      profileImage,
      profileEduLevel,
      profileFieldStudy,
      profileEduPlace,
      profileCurrentJob,
      profileCurrentWorkPlace,
    } = userProfile;

    try {
      setLoadingProfile(true);
      const res = await editAxios(`/user/profile`, {
        data: {
          aboutMe: about,
          birthday: profileBirth,
          city: profileCity,
          country: profileCountry,
          currentJob: profileCurrentJob,
          currentJobLocation: profileCurrentWorkPlace,
          custom: JSON.stringify(desiredLink),
          email: profileEmail,
          firstName: profileName,
          gender: profileGender,
          github: github,
          gitlab: gitlab,
          imageAddress: profileImage,
          lastEduLevel: profileEduLevel,
          lastEduLocation: profileEduPlace,
          lastMajor: profileFieldStudy,
          lastName: profileFamily,
          linkedin: linkedin,
          mobile: profileMobile,
          researchgate: gate,
          role: profileRole,
          website: web,
        },
      });
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoadingProfile(false);
    navigate(`/${roles}/volunteer`);
  };

  return { editProfile, loadingProfile };
};

export default useEditProfile;
