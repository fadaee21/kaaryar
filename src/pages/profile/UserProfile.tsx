import { Box, Button, Container, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
const UserProfile = () => {
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name,family);
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
        <Typography variant="body1" sx={{ mb: 6.5 }}>
          اینجا می‌توانید پروفایل عمومی خودتان را درست کنید. پروفایل شما برای
          سایر داوطلبان، ادمین، و در آینده برای مهارت‌آموزان قابل مشاهده است.
          <br /> هر زمان که بخواهید، می‌توانید پروفایل خود را ویرایش کنید.
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          مشخصات فردی
        </Typography>
        <Box sx={{display:"flex"}}>
          <TextField
            id="nameUser"
            name="nameUser"
            label="نام"
            onChange={(e) => setName(e.target.value)}
            sx={{mr:3, width:"20%"}}
          />
          <TextField
            id="userFamily"
            name="userFamily"
            label="نام خانوادگی"
            onChange={(e) => setFamily(e.target.value)}
            sx={{mr:3, width:"20%"}}
          />
        </Box>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Box component="section">
          <Typography variant="h6">مشخصات تحصیلی و شغلی</Typography>
        </Box>
        <Box component="section">
          <Typography variant="h6">لینک های مرتبط</Typography>
        </Box>
        <Box component="section">
          <Typography variant="h6">درباره من</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
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
