import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getData } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";

const useGetValidationToken = () => {
  const [tokenValidation, setTokenValidation] = useState(false);
  const [loadingVal, setLoadingVal] = useState(false);
  const { auth } = useAuth();
  useEffect(() => {
    // just for token validation
    const getValid = async () => {
      const roles = auth?.roles?.toString();
      setLoadingVal(false);
      try {
        let response = await getData(
          `/${roles === "admin" ? "manager" : roles}/test`
        );
        if (response.status === 200) {
          setTokenValidation(true);
        } else {
          setTokenValidation(false);
        }
        setLoadingVal(true);
      } catch (error: any) {
        setTokenValidation(false);
        setLoadingVal(true);
        throw new Error("your token is not valid anymore, please log in again");
      }
    };
    const cookie = new Cookies();
    const token = cookie.get("token");

    //if roles array is empty,you don't need send request to validate token
    if (token) {
      getValid();
    } else {
      console.log("token not found");
      setTokenValidation(false);
      setLoadingVal(true);
    }
  }, [auth?.roles]);

  return [tokenValidation, loadingVal];
};

export default useGetValidationToken;
