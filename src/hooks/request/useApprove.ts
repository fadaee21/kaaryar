import { useState } from "react";
import { editAxios } from "../../api/axios";

export const useApproveWeek = () => {
  const [success, setSuccess] = useState(false);
  const [successObject, setSuccessObject] = useState("");
  const [loadingRegWeek, setLoadingRegWeek] = useState(false);
  const getApproveWeek = async (
    id: string | undefined,
    approveObj: { acceptWeekChecked: boolean } | { afterWeekChecked: boolean },
    approveLink: string
  ) => {
    try {
      setLoadingRegWeek(true);
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
      setLoadingRegWeek(false);
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setLoadingRegWeek(false);
    }
  };

  return {
    success,
    successObject,
    getApproveWeek,
    loadingRegWeek,
  };
};

export const useApproveReg = () => {
  const [success, setSuccess] = useState(false);
  const [successObject, setSuccessObject] = useState("");
  const [loadingRegApprove, setLoadingRegApprove] = useState(false);
  const getApproveReg = async (
    id: string | undefined,
    approveObj: { status: boolean },
    approveLink: string
  ) => {
    try {
      console.log(loadingRegApprove);
      setLoadingRegApprove(true);
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
      setLoadingRegApprove(false);
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setLoadingRegApprove(false);
    }
  };

  return { success, successObject, getApproveReg, loadingRegApprove };
};
