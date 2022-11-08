import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { RoleType } from "../../model";
import useLocalStorage from "../useLocalStorage";

export const useSubmitLogin = (username: string, password: string) => {
  const loginURL = "/auth/login";
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [storedValue, setValue] = useLocalStorage("user", null);

  const [errMsg, setErrMsg] = useState("");
  // eslint-disable-next-line
  const handleLogin = async () => {
    try {
      const response = await userLogin(loginURL, {
        data: {
          username,
          password,
        },
      });

      const roleResponseServer: RoleType = "teacher";
      const accessToken = response?.data?.authorization;

      setAuth({
        username,
        password,
        roles: [roleResponseServer],
        token: accessToken,
      });
      setValue({
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
        setErrMsg("برای شما حسابی ایجاد نشده است");
      } else {
        setErrMsg("ورود ناموفق");
      }
    }
  };

  return { handleLogin, errMsg, setErrMsg };
};
