import { useState } from "react";
import { editAxios } from "../../api/axios";

export const useApproveWeek = () => {
  const [success, setSuccess] = useState(false);
  const [successObject, setSuccessObject] = useState("");

  const getApproveWeek = async (
    id: string | undefined,
    approveObj: { acceptWeekChecked: boolean } | { afterWeekChecked: boolean },
    approveLink: string
  ) => {
    try {
      console.log(`${approveLink}/${id}`);
      const response = await editAxios(`${approveLink}/${id}`, {
        data: approveObj,
      });
      console.log(response.data.state, id);
      if (response.status === 200) {
        const obj = Object.keys(approveObj)[0];
        setSuccessObject(obj);
        return setSuccess(true);
      }
      setSuccess(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
  };

  return {
    success,
    successObject,
    getApproveWeek,
  };
};

export const useApproveReg = () => {
  const [success, setSuccess] = useState(false);
  const [successObject, setSuccessObject] = useState("");

  const getApproveReg = async (
    id: string | undefined,
    approveObj: { status: boolean },
    approveLink: string
  ) => {
    try {
      console.log(`${approveLink}/${id}`);
      const response = await editAxios(`${approveLink}/${id}`, {
        params: approveObj,
      });
      console.log(response.data.state, id);
      if (response.status === 200) {
        const obj = Object.keys(approveObj)[0];
        setSuccessObject(obj);
        return setSuccess(true);
      }
      setSuccess(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
  };

  return { success, successObject, getApproveReg };
};
