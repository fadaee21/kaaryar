import useSWR from "swr";
import { DetailStudentStatus } from "../../model";

const useGetStatusStudent = (boolean: Boolean) => {
    //the boolean argument help to prevent fetching data in the searching component for non related
  const { data: trainingData, isLoading: statusLoading } = useSWR<
    DetailStudentStatus[]
  >(boolean ? "/status/training-status/values/all" : null);
  const { data: nextStepData, isLoading: nextStepLoading } = useSWR<
    DetailStudentStatus[]
  >(boolean ? "/status/next-training-step/values/all" : null);
  const { data: withdrawalData, isLoading: withdrawalLoading } = useSWR<
    DetailStudentStatus[]
  >(boolean ? "/status/withdrawal-reason/values/all" : null);
  const { data: referralToFinanceData, isLoading: referralLoading } = useSWR<
    DetailStudentStatus[]
  >(boolean ? "/status/referral-finance/values/all" : null);
  const { data: kaaryarAssessmentData, isLoading: kaaryarAssessmentLoading } =
    useSWR<DetailStudentStatus[]>(
      boolean ? "/status/kaaryar-assessment/values/all" : null
    );

  return {
    trainingData,
    statusLoading,
    nextStepData,
    nextStepLoading,
    withdrawalData,
    withdrawalLoading,
    referralToFinanceData,
    referralLoading,
    kaaryarAssessmentData,
    kaaryarAssessmentLoading,
  };
};

export default useGetStatusStudent;
