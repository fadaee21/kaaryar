import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { ProfileTitle } from "../../styles/profile";
import Selector from "./Selector";
import UploadProfileImage from "./UploadProfileImage";
import AddLink from "./AddLink";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    profileName: "",
    profileFamily: "",
    profileGender: "",
    profileBirth: "",
    profileCountry: "",
    profileCity: "",
    profileMobile: "",
    profileEmail: "",
    profileRole: "",
    profileImage: "",
    profileEduLevel: "",
    profileFieldStudy: "",
    profileEduPlace: "",
    profileCurrentJob: "",
    profileCurrentWorkPlace: "",
  });
  //in desiredLink for handling the functionality i add "id" and "first" to object,notice that you shouldn't post these two items to server
  const [desiredLink, setDesiredLink] = useState([
    { id: Date.now(), address: "", title: "", first: true },
  ]);
  const [relatedLink, setRelatedLink] = useState({
    web: "",
    linkedin: "",
    github: "",
    gitlab: "",
    gate: "",
  });
  const [about, setAbout] = useState("");

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRelatedLink((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userProfile);
    console.log(relatedLink);
    console.log(desiredLink);
    console.log(about);
  };

  const handleAddLink = () => {
    setDesiredLink((prev) => [
      ...prev,
      { address: "", title: "", first: false, id: Date.now() },
    ]);
  };
  const handleRemoveLink = (id: number) => {
    const remove = desiredLink.filter((item) => item.id !== id);
    setDesiredLink(remove);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">پروفایل من</Typography>

          <Button
            // onClick={handleBack}
            endIcon={<ArrowBackIcon />}
            variant="outlined"
            color="inherit"
          >
            بازگشت
          </Button>
        </Box>
        <Typography variant="body1">
          اینجا می‌توانید پروفایل عمومی خودتان را درست کنید. پروفایل شما برای
          سایر داوطلبان، ادمین، و در آینده برای مهارت‌آموزان قابل مشاهده است.
          <br /> هر زمان که بخواهید، می‌توانید پروفایل خود را ویرایش کنید.
        </Typography>
        <ProfileTitle variant="h6">مشخصات فردی</ProfileTitle>
        <Grid container spacing={2}>
          <Grid item xs={2.4}>
            <TextField
              id="profileName"
              name="profileName"
              label="نام"
              onChange={handleChange1}
              size="small"
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              id="profileFamily"
              name="profileFamily"
              label="نام خانوادگی"
              onChange={handleChange1}
              size="small"
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
              id="profileBirth"
              name="profileBirth"
              label="سال تولد"
              onChange={handleChange1}
              size="small"
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              id="profileCountry"
              name="profileCountry"
              label="کشور محل سکونت"
              onChange={handleChange1}
              size="small"
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              id="profileCity"
              name="profileCity"
              label="شهر محل سکونت"
              onChange={handleChange1}
              size="small"
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              id="profileMobile"
              name="profileMobile"
              label="شماره موبایل"
              onChange={handleChange1}
              size="small"
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              id="profileEmail"
              name="profileEmail"
              label="آدرس ایمیل"
              onChange={handleChange1}
              size="small"
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
            />
          </Grid>
          <Grid item xs={12}>
            <UploadProfileImage setUserProfile={setUserProfile} />
          </Grid>
        </Grid>

        <ProfileTitle variant="h6">مشخصات تحصیلی و شغلی</ProfileTitle>
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
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              id="profileFieldStudy"
              name="profileFieldStudy"
              label="آخرین رشته تحصیلی"
              onChange={handleChange1}
              size="small"
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              id="profileEduPlace"
              name="profileEduPlace"
              label="آخرین محل تحصیل"
              onChange={handleChange1}
              size="small"
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              id="profileCurrentJob"
              name="profileCurrentJob"
              label="شغل فعلی"
              onChange={handleChange1}
              size="small"
            />
          </Grid>
          <Grid item xs={2.4}>
            <TextField
              id=""
              name="profileCurrentWorkPlace"
              label="محل کار فعلی"
              onChange={handleChange1}
              size="small"
            />
          </Grid>
          <FormHelperText sx={{ ml: 2 }}>
            * مقطع تحصیلی که از آن فارغ‌التحصیل شده‌اید <br />و یا اکنون در آن
            مشغول به تحصیل هستید.
          </FormHelperText>
        </Grid>
        <ProfileTitle variant="h6">لینک های مرتبط</ProfileTitle>
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
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1.5,
                p: 2,
                mt: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {desiredLink.map((item) => (
                <AddLink
                  key={item.id}
                  id={item.id}
                  desiredLink={desiredLink}
                  setDesiredLink={setDesiredLink}
                >
                  {item.first ? (
                    <Button
                      sx={{ px: 4 }}
                      variant="outlined"
                      color="primary"
                      endIcon={<AddIcon />}
                      onClick={handleAddLink}
                    >
                      افزودن
                    </Button>
                  ) : (
                    <Button
                      sx={{ px: 4 }}
                      variant="outlined"
                      color="inherit"
                      endIcon={<DeleteIcon />}
                      onClick={() => handleRemoveLink(item.id)}
                    >
                      حذف
                    </Button>
                  )}
                </AddLink>
              ))}
            </Box>
          </Grid>
        </Grid>

        <ProfileTitle variant="h6">درباره من</ProfileTitle>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              id="outlined-multiline-static"
              placeholder="مختصری از خودتان بنویسید"
              multiline
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 18.5,
            mt: 5,
          }}
        >
          <Button
            // onClick={handleBack}
            variant="outlined"
            color="primary"
            sx={{ mr: 2 }}
          >
            مشاهده
          </Button>
          <Button variant="contained" color="primary" type="submit">
            ذخیره
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;
