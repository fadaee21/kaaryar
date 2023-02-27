import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const getApproveReg = async (
    id: string | undefined,
    approveObj: { status: boolean },
    approveLink: string
  ) => {
    setLoadingRegApprove(true);
    try {
      console.log(`${approveLink}/${id}`);
      const response = await editAxios(`${approveLink}/${id}`, {
        params: approveObj,
      });
      console.log(response.data.state, id);
      if (response.status === 200) {
        const obj = Object.keys(approveObj)[0];
        setSuccessObject(obj);
        navigate(-1);
        return setSuccess(true);
      }
      setSuccess(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setSuccess(false);
      navigate(-1);
    }
    setLoadingRegApprove(false);
  };
  console.log(loadingRegApprove);
  return { success, successObject, getApproveReg, loadingRegApprove };
};
