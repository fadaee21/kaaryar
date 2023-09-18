import { AxiosError } from "axios";
import { useState } from "react";
import { userLogin } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { RoleType } from "../../model";
import { handleError } from "../../utils/handleError";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
const loginURL = "/oauth2/token";
export const useSubmitLogin = (username: string, password: string) => {
  const { setAuth } = useAuth();
  const [errMsg, setErrMsg] = useState("");
  let bodyContent = `username=${username}&password=${password}`;
  const navigate = useNavigate();
  const location = useLocation();
  const stateLocation = location.state as any;
  const handleLogin = async () => {
    try {
      const response = await userLogin(loginURL, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: bodyContent,
      });

      if (response.status === 201) {
        const {
          authorization,
          profile: { id, roles },
        } = response.data;

        Cookies.set("token", authorization, {
          path: "/",
          expires: 0.5,
          secure: true,
          sameSite: "strict",
        });

        const roleResponseServer: RoleType = roles.includes("manager")
          ? "admin"
          : roles.includes("mentor")
          ? "mentor"
          : roles.includes("teachingassistant")
          ? "ta"
          : null;

        if (!roleResponseServer) {
          setErrMsg("شما مجاز به ورود در سامانه نمی باشید ");
          return;
        }

        setAuth({
          id,
          username,
          roles: [roleResponseServer],
        });
        const from =
          stateLocation?.from?.pathname || `/${roleResponseServer}/dashboard`;
        console.log(from);
        navigate(from, { replace: true });
      }
    } catch (error) {
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
        toast.error(handleError(error as any));
      }
    }
  };

  return { handleLogin, errMsg, setErrMsg };
};
