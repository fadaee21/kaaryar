import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";

const useGetValidationToken = () => {
  const [tokenValidation, setTokenValidation] = useState(false);
  const [loadingVal, setLoadingVal] = useState(false);
  const { auth } = useAuth();
  const roles = auth?.roles?.toString();
  const navigate = useNavigate();
  // just for token validation
  const getValid = async () => {
    setLoadingVal(false);
    try {
      let response = await getData(
        `/${roles === "admin" ? "manager" : roles}/test`
      );
      if (response.status === 200) {
        setTokenValidation(true);
      } else {
        navigate("/");
      }
      setLoadingVal(true);
    } catch (error) {
      // console.log(error);
      setTokenValidation(false);
      setLoadingVal(true);
      navigate("/");
      throw new Error("your token is not valid anymore, please log in again");
    }
  };

  useEffect(() => {
    //if roles array is empty,getValid is false
    if (!!auth.roles.length) {
      getValid();
    } else {
      navigate("/");
      setLoadingVal(true);
    }
  }, []);
  return [tokenValidation, loadingVal];
};

export default useGetValidationToken;
