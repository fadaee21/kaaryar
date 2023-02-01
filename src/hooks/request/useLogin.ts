import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { RoleType } from "../../model";

export const useSubmitLogin = (username: string, password: string) => {
  const loginURL = "/auth/login";
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");

  const handleLogin = async () => {
    try {
      const response = await userLogin(loginURL, {
        data: {
          username,
          password,
        },
      });
      const res = response.data.profile.roles;
      const roleResponseServer: RoleType =
        res.indexOf("manager") >= 0
          ? "admin"
          : res.indexOf("mentor") >= 0
          ? "mentor"
          : res.indexOf("editingteacher") >= 0
          ? "ta"
          : null;

      const accessToken = response?.data?.authorization;

      if (!roleResponseServer) {
        setErrMsg("شما مجاز به ورود در سامانه نمی باشید ");
        return;
      }

      setAuth({
        username,
        roles: [roleResponseServer],
        token: accessToken,
      });

      navigate(`/${roleResponseServer}/dashboard`, {
        replace: true,
      });
    } catch (error) {
      //TODO:handle Error
      console.log(error);
      const err = error as AxiosError;
      if (!err?.response) {
        setErrMsg("پاسخی از سرور دریافت نشد");
      } else if (err.response?.status === 400) {
        setErrMsg("نام کاربری یا پسورد را وارد نکرده اید");
      } else if (err.response?.status === 401) {
        setErrMsg("نام کاربری یا پسورد را اشتباه وارد کرده اید");
      } else {
        setErrMsg("ورود ناموفق");
      }
    }
  };

  return { handleLogin, errMsg, setErrMsg };
};
