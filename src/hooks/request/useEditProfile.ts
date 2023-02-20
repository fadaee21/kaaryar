import { useState } from "react";
import { editAxios } from "../../api/axios";
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
      // const res = await editAxios(`/user/profile/${id}`)
      const res = await editAxios(`/user/profile/1`, {
        data: {
          aboutMe: about,
          birthday: profileBirth,
          city: profileCity,
          country: profileCountry,
          currentJob: profileCurrentJob,
          currentJobLocation: profileCurrentWorkPlace,
          custom: "string",
          email: profileEmail,
          firstName: profileName,
          gender: profileGender,
          github: github,
          gitlab: gitlab,
        //   id: 0,
          imageAddress: profileImage,
          lastEduLevel: profileEduLevel,
          lastEduLocation: profileEduPlace,
          lastMajor: profileFieldStudy,
          lastName: profileFamily,
          linkedin: linkedin,
          mobile: profileMobile,
          researchgate: gate,
          role: profileRole,
          username: "string",
          website: web,
        },
      });
      const data = res.data;
      console.log(data);
      setLoadingProfile(false);
    } catch (error) {
      console.log(error);
      setLoadingProfile(false);
    }
  };

  return { editProfile };
};

export default useEditProfile;
