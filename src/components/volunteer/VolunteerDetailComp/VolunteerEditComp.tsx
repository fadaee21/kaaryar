import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import useEditProfile from "../../../hooks/request/useEditProfile";
import FormHelperText from "@mui/material/FormHelperText";
import { useState } from "react";
import UploadVolunteerImage from "../UploadVolunteerImage";
import {
  DesireBox,
  ContentBoxHeader,
  StackTitle,
} from "../../../styles/profile";
import { Box, Button, Container, Typography } from "@mui/material";
import AddLink, { DesireLink } from "../AddLink";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Profile } from "../../../model";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import Selector from "../Selector";

interface ProfileData {
  profileData: Profile | null;
  setEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const VolunteerEditComp = ({ profileData, setEditingProfile }: ProfileData) => {
  const {
    firstName,
    lastName,
    gender,
    birthday,
    country,
    city,
    mobile,
    email,
    role,
    picture,
    lastEduLevel,
    lastMajor,
    lastEduLocation,
    currentJob,
    currentJobLocation,
    custom,
    website,
    linkedin,
    github,
    gitlab,
    researchgate,
    aboutMe,
    id,
  } = profileData || {};

  const [userProfile, setUserProfile] = useState(() => ({
    profileName: firstName || "",
    profileFamily: lastName || "",
    profileGender: gender || "",
    profileBirth: birthday || "",
    profileCountry: country || "",
    profileCity: city || "",
    profileMobile: mobile || "",
    profileEmail: email || "",
    profileRole: role || "",
    profileImage: picture?.file_hash || "",
    profileEduLevel: lastEduLevel || "",
    profileFieldStudy: lastMajor || "",
    profileEduPlace: lastEduLocation || "",
    profileCurrentJob: currentJob || "",
    profileCurrentWorkPlace: currentJobLocation || "",
  }));
  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };
  //in desiredLink for handling the functionality i add "id" and "first" to object,notice that you shouldn't post these two items to server
  const [desiredLink, setDesiredLink] = useState<DesireLink[]>(() => {
    if (custom) {
      return JSON.parse(custom);
    }
    return [];
  });
  const [relatedLink, setRelatedLink] = useState(() => ({
    web: website || "",
    linkedin: linkedin || "",
    github: github || "",
    gitlab: gitlab || "",
    gate: researchgate || "",
  }));
  const [about, setAbout] = useState(aboutMe || "");

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRelatedLink((prevLinks) => ({ ...prevLinks, [name]: value }));
  };
  const { editProfile, loadingProfile } = useEditProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editProfile(relatedLink, desiredLink, userProfile, about);
    setEditingProfile(false);
  };

  // const navigate = useNavigate();

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 30 }}>
      <Container maxWidth="lg">
        <ContentBoxHeader>
          <Typography variant="h5">پروفایل من</Typography>
          {/* <Tooltip
            title="در صورت پاک کردن نام و نام خانوادگی، پروفایل حذف می شود."
            placement="top"
          > */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ ml: "auto", mr: 1, px: 5 }}
            disabled={loadingProfile}
          >
            ذخیره
          </Button>
          {/* </Tooltip> */}
          <Button
            onClick={() => setEditingProfile(false)}
            endIcon={<ArrowBackIcon />}
            variant="outlined"
            color="inherit"
          >
            خروج از حالت ویرایش
          </Button>
        </ContentBoxHeader>
        <Typography variant="body1">
          اینجا می‌توانید پروفایل عمومی خودتان را درست کنید. پروفایل شما برای
          سایر داوطلبان، ادمین، و در آینده برای مهارت‌آموزان قابل مشاهده است.
          <br /> هر زمان که بخواهید، می‌توانید پروفایل خود را ویرایش کنید.
        </Typography>
        <StackTitle direction="row" alignItems="center" gap={1}>
          <PersonOutlineOutlinedIcon />
          <Typography variant="h6">مشخصات فردی</Typography>
        </StackTitle>

        <Grid container spacing={2}>
          <Grid item xs={2.4}>
            <TextField
              fullWidth
              id="profileName"
              name="profileName"
              label="نام"
              onChange={handleChange1}
              size="small"
              value={userProfile.profileName}
              disabled
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              fullWidth
              id="profileFamily"
              name="profileFamily"
              label="نام خانوادگی"
              onChange={handleChange1}
              size="small"
              value={userProfile.profileFamily}
              disabled
            />
          </Grid>
          <Grid item xs={2.4}>
            <Selector
              id="profileGender"
              name="profileGender"
              label="جنسیت"
              items={["زن", "مرد"]}
              handleChange={handleChange1}
              state={userProfile.profileGender}
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              fullWidth
              id="profileBirth"
              name="profileBirth"
              label="سال تولد"
              onChange={handleChange1}
              size="small"
              value={userProfile.profileBirth}
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              fullWidth
              id="profileCountry"
              name="profileCountry"
              label="کشور محل سکونت"
              onChange={handleChange1}
              size="small"
              value={userProfile.profileCountry}
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              fullWidth
              id="profileCity"
              name="profileCity"
              label="شهر محل سکونت"
              onChange={handleChange1}
              size="small"
              value={userProfile.profileCity}
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              fullWidth
              id="profileMobile"
              name="profileMobile"
              label="شماره موبایل"
              onChange={handleChange1}
              size="small"
              value={userProfile.profileMobile}
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              fullWidth
              id="profileEmail"
              name="profileEmail"
              label="آدرس ایمیل"
              onChange={handleChange1}
              size="small"
              value={userProfile.profileEmail}
            />
          </Grid>
          <Grid item xs={2.4}>
            <Selector
              id="profileRole"
              name="profileRole"
              label="نقش"
              items={["منتور", "مربی حل تمرین"]}
              handleChange={handleChange1}
              state={userProfile.profileRole}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <UploadVolunteerImage
              imageServer={userProfile.profileImage}
              setUserProfile={setUserProfile}
              id={id}
            />
          </Grid>
        </Grid>
        <StackTitle direction="row" alignItems="center" gap={1}>
          <SchoolOutlinedIcon />
          <Typography variant="h6">مشخصات تحصیلی و شغلی</Typography>
        </StackTitle>
        <Grid container spacing={2}>
          <Grid item xs={2.4}>
            <Selector
              id="profileEduLevel"
              name="profileEduLevel"
              label="آخرین مقطع تحصیلی"
              items={[
                "دیپلم",
                "کارشناسی",
                "کارشناسی ارشد",
                "دکتری",
                "فوق دکتری",
              ]}
              handleChange={handleChange1}
              state={userProfile.profileEduLevel}
            />
            <FormHelperText>
              * مقطع تحصیلی که از آن فارغ‌التحصیل شده‌اید و یا اکنون در آن مشغول
              به تحصیل هستید.
            </FormHelperText>
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              fullWidth
              id="profileFieldStudy"
              name="profileFieldStudy"
              label="آخرین رشته تحصیلی"
              onChange={handleChange1}
              size="small"
              value={userProfile.profileFieldStudy}
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              fullWidth
              id="profileEduPlace"
              name="profileEduPlace"
              label="آخرین محل تحصیل"
              onChange={handleChange1}
              size="small"
              value={userProfile.profileEduPlace}
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              fullWidth
              id="profileCurrentJob"
              name="profileCurrentJob"
              label="شغل فعلی"
              onChange={handleChange1}
              size="small"
              value={userProfile.profileCurrentJob}
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              fullWidth
              id=""
              name="profileCurrentWorkPlace"
              label="محل کار فعلی"
              onChange={handleChange1}
              size="small"
              value={userProfile.profileCurrentWorkPlace}
            />
          </Grid>
        </Grid>
        <StackTitle direction="row" alignItems="center" gap={1}>
          <LanguageIcon />
          <Typography variant="h6">لینک های مرتبط</Typography>
        </StackTitle>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="web"
              name="web"
              label="آدرس وب‌سایت"
              onChange={handleChange2}
              value={relatedLink.web}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="linkedin"
              name="linkedin"
              label="آدرس LinkedIn"
              onChange={handleChange2}
              value={relatedLink.linkedin}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="gitlab"
              name="gitlab"
              label="آدرس GitLab"
              onChange={handleChange2}
              value={relatedLink.gitlab}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="github"
              name="github"
              label="آدرس GitHub"
              onChange={handleChange2}
              value={relatedLink.github}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="gate"
              name="gate"
              label="آدرس Research Gate"
              onChange={handleChange2}
              value={relatedLink.gate}
              size="small"
            />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">لینک دلخواه</Typography>
            <DesireBox>
              <AddLink
                desiredLink={desiredLink}
                setDesiredLink={setDesiredLink}
              />
            </DesireBox>
          </Grid>
        </Grid>
        <StackTitle direction="row" alignItems="center" gap={1}>
          <TextSnippetOutlinedIcon />
          <Typography variant="h6">درباره من</Typography>
        </StackTitle>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              placeholder="مختصری از خودتان بنویسید"
              multiline
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VolunteerEditComp;
