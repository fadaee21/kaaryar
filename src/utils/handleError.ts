import { AxiosError } from "axios";
import { ErrorResponse } from "../model";

export const handleError = (
  error: AxiosError<ErrorResponse>
): string | undefined => {
  if (error.response) {
    console.log(error.response);
    const { data } = error.response;
    if (error.response.status === 401) {
      return "مدت‌زمان نشست کاربری شما به پایان رسیده است. لطفاً دوباره وارد سیستم شوید";
    }
    if (data?.detail) {
      const detail = data?.detail;
      if (Array.isArray(detail)) {
        return detail[0].loc[1] + " - " + detail[0].msg; //i prefer instead of sending several toast in a  page,just show first one
      } else {
        return detail;
      }
    }

    if (data?.error?.message) {
      return data.error.message;
    }

    if (!data) {
      return "خطای سرور";
    }
  } else if (error.request) {
    console.log(error.request);
    return "درخواست با موفقیت انجام نشد";
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    return "خطای سرور دوباره تلاش کنید";
  }

  return undefined;
};
