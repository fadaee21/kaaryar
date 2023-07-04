import { AxiosError } from "axios";
import { ErrorResponse } from "../model";

export const handleError = (error: AxiosError<ErrorResponse>) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    console.log(error.response.status);
    console.log(error.response.headers);
    const detailError = error.response?.data.detail;
    if (detailError) {
      return detailError;
    }
    return error.response.data.error.message;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    return "درخواست با موفقیت انجام نشد";
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    return "خطای سرور دوباره تلاش کنید";
  }
};
