import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  BackgroundImage,
  GridGuestLogin,
  GridUserLogin,
} from "../styles/login";
import bg from "../assets/bg.png";
import backgd from "../assets/backgd.png";
import { useSubmitLogin } from "../hooks/request/useLogin";
import { Navigate, useLocation } from "react-router-dom";
import useGetValidationToken from "../hooks/request/useGetValidationToken";
import { useAuth } from "../context/AuthProvider";
import LoadingProgress from "../components/LoadingProgress";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const { auth } = useAuth();
  const roles = auth?.roles?.toString();
  const stateLocation = location.state as any;
  const from = stateLocation?.from?.pathname || `/${roles}/dashboard`;
  const { handleLogin, errMsg, setErrMsg } = useSubmitLogin(username, password);
  const [tokenValidation, loadingVal] = useGetValidationToken();

  useEffect(() => {
    setErrMsg("");
  }, [username, password, setErrMsg]);
  useEffect(() => window.scrollTo(0, 0), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  if (!loadingVal) {
    return (
      <Box sx={{ mt: 12 }}>
        <LoadingProgress />
      </Box>
    );
  }

  return (
    <>
      {tokenValidation ? (
        <Navigate to={from}  />
      ) : (
        <BackgroundImage backgd={backgd}>
          <Container maxWidth="md" sx={{ py: 9 }}>
            <Grid container>
              <GridGuestLogin item sm={5}>
                <Typography component="h5" variant="h5" sx={{ mt: 6, px: 4 }}>
                  به سامانه مدیریت پروفایل کاریار خوش آمدید!
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  color="textPrimary"
                  sx={{ mt: 4 }}
                >
                  کاریار یک استارتاپ اجتماعی است که با هدف دسترسی به فرصت‌های
                  آموزشی برابر در ایران، به علاقه‌مندان در حوزه ی کدنویسی آموزش
                  می‌دهد.
                </Typography>
                <Box
                  component={"img"}
                  src={bg}
                  sx={{ transform: "scale(0.6)", my: -7 }}
                />
              </GridGuestLogin>
              <GridUserLogin item sm={7}>
                <Typography component="h3" variant="h5" sx={{ mt: 6 }}>
                  ورود به سامانه مدیریت پروفایل کاریار
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
                      // autoFocus
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
                    <FormHelperText error>
                      {errMsg ? errMsg : " "}
                    </FormHelperText>
                    <FormControlLabel
                      control={<Checkbox name="remember" />}
                      label={
                        <Typography variant="body2">
                          مرا به خاطر بسپار
                        </Typography>
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
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  توجه کنید که کوکی‌ها باید در مرورگر شما فعال باشند.
                </Typography>
              </GridUserLogin>
            </Grid>
          </Container>
        </BackgroundImage>
      )}
    </>
  );
};

export default Login;
