import { useState } from "react";
import { editAxios } from "../../api/axios";

export const useApprove = () => {
  const [success, setSuccess] = useState(false);
  const [successObject, setSuccessObject] = useState("");

  const getApprove = async (
    id: string | undefined,
    approveObj:
      | { acceptWeekChecked: boolean }
      | { afterWeekChecked: boolean }
      | { checked: boolean },
    approveLink: string
  ) => {
    try {
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
    getApprove,
  };
};

// export const useApproveReg = () => {
//   const [success, setSuccess] = useState(false);

//   const getApprove = async (id: string, admission: boolean) => {
//     try {
//       const response = await editAxios(`/reg/form/approve/${id}`, {
//         // i dont know nam of object
//         data: { aaaa: admission },
//       });
//       console.log(response);
//       if (response.status === 200) {
//         return setSuccess(true);
//       }
//       console.log(response);
//       setSuccess(false);
//     } catch (error) {
//       console.log(error);
//       setSuccess(false);
//     }
//   };

//   return { success, getApprove };
// };
  