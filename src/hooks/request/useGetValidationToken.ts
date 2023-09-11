import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getData } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";

const useGetValidationToken = () => {
  const [tokenValidation, setTokenValidation] = useState(false);
  const [loadingVal, setLoadingVal] = useState(false);
  const { auth } = useAuth();
  const roles = auth?.roles?.toString();
  useEffect(() => {
    const getValid = async () => {
      setLoadingVal(false);
      try {
        const endpoint = `/${roles === "admin" ? "manager" : roles}/test`;
        const response = await getData(endpoint);
        setTokenValidation(response.status === 200);
        setLoadingVal(true);
      } catch (error: any) {
        setTokenValidation(false);
        setLoadingVal(true);
        throw new Error("Your token is not valid anymore, please log in again");
      }
    };
    const token = Cookies.get("token");
    if (token) {
      getValid();
    } else {
      console.log("Token not found");
      setTokenValidation(false);
      setLoadingVal(true);
    }
  }, [roles]);
  return [tokenValidation, loadingVal];
};

export default useGetValidationToken;
