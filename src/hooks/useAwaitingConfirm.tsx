import { useEffect, useState } from "react";
import { getData } from "../api/axios";

const useAwaitingConfirm = (apiLink: string) => {
  const [loadingAwait, setLoadingAwait] = useState(true);
  const [awaitNumber, setAwaitNumber] = useState<number>();
  const fetchData = async () => {
    setLoadingAwait(true);
    try {
      const response = await getData(apiLink, {
        params: { status: null, state: true },
      });
      console.log(response.data)
      setAwaitNumber(response.data.length);
      if (response.status === 200) {
      } else {
        console.log(response);
      }
      setLoadingAwait(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [loadingAwait, awaitNumber];
};

export default useAwaitingConfirm;
