import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editAxios } from "../../api/axios";

export const useApproveWeek = () => {
  const [successObject, setSuccessObject] = useState("");
  const [loadingRegWeek, setLoadingRegWeek] = useState(false);
  const navigate = useNavigate();

  const getApproveWeek = async (
    id: string | undefined,
    approveObj: { acceptWeekChecked: boolean } | { afterWeekChecked: boolean },
    approveLink: string
  ) => {
    setLoadingRegWeek(true);
    try {
      console.log(`${approveLink}/${id}`);
      const response = await editAxios(`${approveLink}/${id}`, {
        data: approveObj,
      });
      if (response.status === 200) {
        const obj = Object.keys(approveObj)[0];
        setSuccessObject(obj);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
    navigate(-1);
    await new Promise((r) => setTimeout(r, 1000));
    setLoadingRegWeek(false);
  };

  return {
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
        await new Promise((r) => setTimeout(r, 1000));
        setLoadingRegApprove(false);
        return setSuccess(true);
      }
      setSuccess(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
    navigate(-1);
    await new Promise((r) => setTimeout(r, 1000));
    setLoadingRegApprove(false);
  };
  return { success, successObject, getApproveReg, loadingRegApprove };
};
