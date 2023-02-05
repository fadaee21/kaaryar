import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { RoleType } from "../../model";
import Cookies from "universal-cookie";

export const useSubmitLogin = (username: string, password: string) => {
  const loginURL = "/auth/login";
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [errMsg, setErrMsg] = useState("");

  const handleLogin = async () => {
    try {
      const response = await userLogin(loginURL, {
        data: {
          username,
          password,
        },
      });

      if (response.status === 200) {
        cookies.set("token", response?.data?.authorization, {
          path: "/",
          // expires: new Date(Date.now() + 3600 * 24 * 1000),
          secure: true,
          maxAge: 3600 * 12,
          sameSite: "none",
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

        if (!roleResponseServer) {
          setErrMsg("شما مجاز به ورود در سامانه نمی باشید ");
          return;
        }

        setAuth({
          username,
          roles: [roleResponseServer],
        });

        navigate(`/${roleResponseServer}/dashboard`, {
          replace: true,
        });
      }
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
