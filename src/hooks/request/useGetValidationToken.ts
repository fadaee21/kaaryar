import { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";

const useGetValidationToken = () => {
  const [tokenValidation, setTokenValidation] = useState(false);
  const [loadingVal, setLoadingVal] = useState(false);
  const { auth } = useAuth();
  const roles = auth.roles.toString();
  // just for token validation
  const getValid = async () => {
    setLoadingVal(false);
    try {
      let response = await getData(
        `/${roles === "admin" ? "manager" : roles}/test`
      );
      if (response.status === 200) {
        setTokenValidation(true);
      }
      setLoadingVal(true);
    } catch (error) {
      // console.log(error);
      setTokenValidation(false);
      setLoadingVal(true);
      throw new Error("you need to log in again");
    }
  };

  useEffect(() => {
    getValid();
  }, []);
  return [tokenValidation, loadingVal];
};

export default useGetValidationToken;
