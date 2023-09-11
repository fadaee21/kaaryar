import { useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { editAxios } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const useSubmitStatusStudent = (
  id: number | undefined,
  trainingStatus: string,
  nextTrainingStep: string,
  description: string | null,
  withdrawalReason: string | null,
  referralToFinance: string,
  kaaryarAssessment: string,
  fullName: string
) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        status_form: {
          trainingStatusId: trainingStatus,
          nextTrainingStepId: nextTrainingStep,
          description,
          withdrawalReasonId: withdrawalReason || undefined,
          referralToFinanceId: referralToFinance,
          kaaryarAssessmentId: kaaryarAssessment,
        },
      };
      const res = await editAxios(`/status/form/${id}`, { data });
      if (res.status === 200) {
        navigate(-1);
        toast.success(`ثبت تغییرات برای ${fullName} با موفقیت انجام شد.`);
      } else {
        toast.error("ویرایش انجام نشد");
      }
    } catch (error: any) {
      toast.error(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
};

export default useSubmitStatusStudent;
