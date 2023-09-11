import { forwardRef, useImperativeHandle, useState } from "react";
import { DetailStudentStatus, StatusForm } from "../../../model";
import { StyledTableCell } from "../../../styles/table";
import { EditComboStudent } from "../EditComboStudent";
import { useSWRConfig } from "swr";
import { editAxios } from "../../../api/axios";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/handleError";

type Props = {
  statusForm: StatusForm | null;
  trainingData: DetailStudentStatus[] | undefined;
  nextStepData: DetailStudentStatus[] | undefined;
  referralToFinanceData: DetailStudentStatus[] | undefined;
  kaaryarAssessmentData: DetailStudentStatus[] | undefined;
  firstName: string;
  family: string;
  page: number;
  setSubmitLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const RowEditStatus = forwardRef(
  (
    {
      statusForm,
      kaaryarAssessmentData,
      nextStepData,
      referralToFinanceData,
      trainingData,
      family,
      firstName,
      page,
      setSubmitLoading,
    }: Props,
    ref
  ) => {
    const { mutate } = useSWRConfig();
    const ADMIN_STUDENT_URL = `moodle/user/student/all?pageNum=${page}&pageSize=25&orderAscending=false&orderBy=regformGroup`;
    const fullName = `${firstName} ${family}`;
    const [trainingStatus, setTrainingStatus] = useState(
      statusForm?.trainingStatus?.id.toString() || ""
    );
    const [nextTrainingStep, setNextTrainingStep] = useState(
      statusForm?.nextTrainingStep?.id.toString() || ""
    );
    const [referralToFinance, setReferralToFinance] = useState(
      statusForm?.referralToFinance?.id.toString() || ""
    );
    const [kaaryarAssessment, setKaaryarAssessment] = useState(
      statusForm?.kaaryarAssessment?.id.toString() || ""
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const data = {
          status_form: {
            trainingStatusId: trainingStatus,
            nextTrainingStepId: nextTrainingStep,
            statusForm: statusForm?.description,
            withdrawalReasonId: statusForm?.withdrawalReason?.id || undefined,
            referralToFinanceId: referralToFinance,
            kaaryarAssessmentId: kaaryarAssessment,
          },
        };
        const res = await editAxios(`/status/form/${statusForm?.id}`, { data });
        if (res.status === 200) {
          await mutate(ADMIN_STUDENT_URL);
          toast.success(`ثبت تغییرات برای ${fullName} با موفقیت انجام شد.`);
        } else {
          toast.error(
            `ثبت تغییرات برای ${fullName} با خطا مواجه شد. لطفاً دوباره تلاش کنید.`
          );
        }
      } catch (error: any) {
        toast.error(
          `ثبت تغییرات برای ${fullName} با خطا مواجه شد. لطفاً دوباره تلاش کنید.`
        );
      } finally {
        setSubmitLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      handleSubmit,
    }));

    return (
      <>
        {/* "وضعیت آموزش" */}
        <StyledTableCell align="center">
          <EditComboStudent
            data={trainingData}
            identifier="trainingStatus"
            handleChange={(e) => setTrainingStatus(e.target.value.toString())}
            label="وضعیت آموزش"
            val={trainingStatus}
          />
        </StyledTableCell>
        {/* "قدم آتی آموزش" */}
        <StyledTableCell align="center">
          <EditComboStudent
            data={nextStepData}
            identifier="nextTrainingStep"
            handleChange={(e) => setNextTrainingStep(e.target.value.toString())}
            label="قدم آتی آموزش"
            val={nextTrainingStep}
          />
        </StyledTableCell>
        {/* "ارجاع به واحد مالی" */}
        <StyledTableCell align="center">
          <EditComboStudent
            data={referralToFinanceData}
            identifier="referralToFinance"
            handleChange={(e) =>
              setReferralToFinance(e.target.value.toString())
            }
            label="ارجاع به واحد مالی"
            val={referralToFinance}
          />
        </StyledTableCell>
        {/* "ارزیابی کاریار" */}
        <StyledTableCell align="center">
          <EditComboStudent
            data={kaaryarAssessmentData}
            identifier="kaaryarAssessment"
            handleChange={(e) =>
              setKaaryarAssessment(e.target.value.toString())
            }
            label="ارزیابی کاریار"
            val={kaaryarAssessment}
          />
        </StyledTableCell>
      </>
    );
  }
);

export default RowEditStatus;
