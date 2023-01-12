import { useEffect, useState } from "react";
import { getData } from "../../api/axios";

const useGetValidationToken = () => {
  const [tokenValidation, setTokenValidation] = useState(false);
  const [loadingVal, setLoadingVal] = useState(false);

  // just for token validation
  const getValid = async () => {
    setLoadingVal(false);
    try {
      //todo: need special link for this
      let response = await getData("/teacher/test");
      if (response.status === 200) {
        setTokenValidation(true);
      }
      setLoadingVal(true);
    } catch (error) {
      console.log(error)
      setTokenValidation(false);
      setLoadingVal(true);
    }
  };

  useEffect(() => {
    getValid();
  }, []);
  return [tokenValidation, loadingVal];
};

export default useGetValidationToken;
