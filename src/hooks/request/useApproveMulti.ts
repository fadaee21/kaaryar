import { useState } from "react";
import { editAxios } from "../../api/axios";

const useApproveMulti = () => {
  const [successMulti, setSuccessMulti] = useState(false);
  const getApproveMulti = async (
    id: string | undefined,
    approveLink: string
  ) => {
    try {
      setSuccessMulti(true);
      const response = await editAxios(`${approveLink}/${id}`);
      console.log(response.data.state, `${approveLink}/${id}}`);
      if (response.status === 200) {
        console.log(response.data);
        setSuccessMulti(false);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setSuccessMulti(false);
    }
  };

  return {
    successMulti,
    getApproveMulti,
  };
};

export default useApproveMulti;
