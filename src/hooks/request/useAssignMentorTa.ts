import React from "react";
import { editAxios, removeData } from "../../api/axios";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
const useAssignMentorTa = (
  page: number, // important for mutation swr in student table
  mentorState: string,
  taState: string,
  mentorAssessmentId: number | null | undefined,
  taAssessmentId: number | null | undefined,
  moduleId: number | undefined,
  id: number,
  family: string,
  firstName: string,
  setSubmitLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { mutate } = useSWRConfig();
  const ADMIN_STUDENT_URL = `moodle/user/student/all?pageNum=${page}&pageSize=25&orderAscending=false&orderBy=regformGroup`;
  const fullName = `${firstName} ${family}`;

  const handleSubmitAssigningMentor = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      if (mentorState === "delete" && mentorAssessmentId && !!mentorState) {
        // removing mentor
        const resRemove = await removeData(
          `/assignee/unassign/${mentorAssessmentId}`
        );
        if (resRemove?.status === 204) {
          await mutate(ADMIN_STUDENT_URL);
          toast.success(`حذف منتور برای ${fullName} با موفقیت انجام شد.`);
        } else {
          toast.error(
            `حذف منتور برای ${fullName} با خطا مواجه شد. لطفاً دوباره تلاش کنید.`
          );
        }
      } else if (!!mentorState) {
        // assigning mentor
        const mentorData = {
          personnelId: mentorState,
          moduleId,
          personnelRole: "mentor",
          studentId: id,
        };
        const resEdit = await editAxios("/assignee/assign/ins-update/student", {
          params: mentorData,
        });
        if (resEdit.status === 200) {
          await mutate(ADMIN_STUDENT_URL);
          toast.success(`انتساب منتور برای ${fullName} با موفقیت انجام شد.`);
        } else {
          toast.error(
            `انتساب منتور برای ${fullName} با خطا مواجه شد. لطفاً دوباره تلاش کنید.`
          );
        }
      }
    } catch (error: any) {
      toast.error(handleError(error));
    } finally {
      setSubmitLoading(false);
    }
  };
  const handleSubmitAssigningTa = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSubmitLoading(true);
    try {
      if (taState === "delete" && taAssessmentId) {
        // Removing mentor
        const resRemove = await removeData(
          `/assignee/unassign/${taAssessmentId}`
        );
        if (resRemove?.status === 204) {
          await mutate(ADMIN_STUDENT_URL);
          toast.success(
            `حذف 	مربی حل تمرین برای ${fullName} با موفقیت انجام شد.`
          );
        } else {
          toast.error(
            `حذف 	مربی حل تمرین برای ${fullName} با خطا مواجه شد. لطفاً دوباره تلاش کنید.`
          );
        }
      } else if (!!taState) {
        const taData = {
          personnelId: taState,
          moduleId,
          personnelRole: "ta",
          studentId: id,
        };
        const resEdit = await editAxios("/assignee/assign/ins-update/student", {
          params: taData,
        });
        if (resEdit.status === 200) {
          await mutate(ADMIN_STUDENT_URL);
          toast.success(
            `انتساب مربی حل تمرین برای ${fullName} با موفقیت انجام شد.`
          );
        } else {
          toast.error(
            `انتساب مربی حل تمرین برای ${fullName} با خطا مواجه شد. لطفاً دوباره تلاش کنید.`
          );
        }
      }
    } catch (error: any) {
      toast.error(handleError(error));
    } finally {
      setSubmitLoading(false);
    }
  };
  const handleSubmitAssigning = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSubmitAssigningMentor(e);
    await handleSubmitAssigningTa(e);
  };
  return [handleSubmitAssigning];
};

export default useAssignMentorTa;
