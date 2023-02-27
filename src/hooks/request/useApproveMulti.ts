import { useState } from "react";
import { editAxios } from "../../api/axios";

const useApproveMulti = () => {
  const [loadingMulti, setLoadingMulti] = useState(false);
  const getApproveMulti = async (
    id: string | undefined,
    approveLink: string
  ) => {
    setLoadingMulti(true);
    try {
      const response = await editAxios(`${approveLink}/${id}`);
      console.log(response.data.state, `${approveLink}/${id}}`);
      if (response.status === 200) {
        console.log(response.data);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoadingMulti(false);
  };

  return {
    loadingMulti,
    getApproveMulti,
  };
};

export default useApproveMulti;
