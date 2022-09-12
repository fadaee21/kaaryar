import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {
  BackgroundImage,
  GridGuestLogin,
  GridUserLogin,
} from "../styles/login";
import bg from "../assets/bg.png";
import backgd from "../assets/backgd.png";
import { useSubmitLogin } from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, errMsg, setErrMsg } = useSubmitLogin(username, password);

  useEffect(() => {
    setErrMsg("");
    // eslint-disable-next-line
  }, [username, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
    setUsername("");
    setPassword("");
  };

  return (
    <BackgroundImage backgd={backgd}>
      <p>usertestspring</p>
      <Container maxWidth="md" sx={{ py: 9 }}>
        <Grid container>
          <GridGuestLogin item sm={5}>
            <Typography component="h5" variant="h5" sx={{ mt: 6, px: 4 }}>
              به سامانه آموزشی کاریار خوش آمدید!
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="textPrimary"
              sx={{ mt: 4 }}
            >
              کاریار یک استارتاپ اجتماعی است که با هدف دسترسی به فرصت‌های آموزشی
              برابر در ایران، به علاقه‌مندان در حوزه ی کدنویسی آموزش می‌دهد.
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color="textPrimary"
              sx={{ mt: 6.75 }}
            >
              اگر عضو سامانه آموزشی کاریار نیستید با دسترسی مهمان وارد شوید:
            </Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 3 }}>
              ورود به عنوان مهمان
            </Button>
            <Box
              component={"img"}
              src={bg}
              sx={{ transform: "scale(0.6)", my: -7 }}
            />
          </GridGuestLogin>
          <GridUserLogin item sm={7}>
            <Typography component="h3" variant="h5" sx={{ mt: 6 }}>
              ورود به سامانه آموزشی کاریار
            </Typography>
            <Box
              component={"form"}
              sx={{ my: 6, mx: 4 }}
              onSubmit={handleSubmit}
            >
              <FormControl variant="standard">
                <TextField
                  label="نام کاربری / ایمیل"
                  color="primary"
                  size="small"
                  type={"text"}
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                  error={errMsg ? true : false}
                />
                <TextField
                  label="رمز ورود"
                  color="primary"
                  size="small"
                  sx={{ my: 2 }}
                  type={"password"}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  error={errMsg ? true : false}
                />
                <FormHelperText error>{errMsg ? errMsg : " "}</FormHelperText>
                <FormControlLabel
                  control={<Checkbox name="remember" />}
                  label={
                    <Typography variant="body2">مرا به خاطر بسپار</Typography>
                  }
                />
                <Link
                  href="#"
                  color="primary"
                  textAlign={"start"}
                  underline="hover"
                  sx={{ my: 1 }}
                >
                  نام کاربری و یا رمز ورود خود را فراموش کرده‌اید؟
                </Link>
                <Button variant="contained" sx={{ mt: 2 }} type="submit">
                  ورود به سایت
                </Button>
              </FormControl>
            </Box>
            <Typography variant="body2" color="textSecondary">
              توجه کنید که کوکی‌ها باید در مرورگر شما فعال باشند.
            </Typography>
          </GridUserLogin>
        </Grid>
      </Container>
    </BackgroundImage>
  );
};

export default Login;
