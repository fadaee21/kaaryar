import { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import { ApprovalStatus } from "../../model";

const useStatusCount = (apiLink: string, status: ApprovalStatus) => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [statusNum, setStatusNum] = useState<number>();
  const fetchData = async () => {
    setLoadingStatus(true);
    try {
      const response = await getData(apiLink, {
        params: { status },
      });
      setStatusNum(response.data.count);
      // if (response.status === 200) {
      //   console.log(response.data);
      // } else {
      //   console.log(response);
      // }
      setLoadingStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [loadingStatus, statusNum];
};

export default useStatusCount;
