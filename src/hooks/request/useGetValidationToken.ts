import { useEffect, useState } from "react";
import { getData } from "../../api/axios";

const useGetValidationToken = () => {
  const [tokenValidation, setTokenValidation] = useState(false);
  const [loadingVal, setLoadingVal] = useState(false);

  // just for token validation
  const getValid = async () => {
    setLoadingVal(false);
    try {
      let response = await getData("/moodle/user/20");
      if (response.data) {
        setTokenValidation(true);
      }
      setLoadingVal(true);
    } catch (error) {
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
