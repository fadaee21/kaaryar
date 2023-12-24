import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  DetailStudentStatus,
  ModulesAsStudentAssessment,
  PersonnelAssignment,
  Profile,
  StudentWithStatus,
} from "../../model";
import { EditComboStudent } from "./EditComboStudent";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import LoadingProgress from "../LoadingProgress";
import { editAxios } from "../../api/axios";
import useAssignMentorTa from "../../hooks/request/useAssignMentorTa";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";

interface Prop {
  assessment: ModulesAsStudentAssessment | undefined;
  student: StudentWithStatus | undefined;
  personnelAssignment: PersonnelAssignment[] | undefined;
  trainingStatus: DetailStudentStatus | undefined;
}
interface AssessmentOpt {
  value: string;
  id: number;
}
const PROFILE_VOLUNTEER = "/user/profile/all?pageNum=1&pageSize=10000";
const StudentCoreDetailEdit = ({
  assessment,
  student,
  personnelAssignment,
  trainingStatus,
}: Prop) => {
  const { data: volunteerData, isLoading: volunteerLoading } =
    useSWR<Profile[]>(PROFILE_VOLUNTEER);
  const { data: assessmentRes, isLoading: assessmentLoading } = useSWR<
    AssessmentOpt[]
  >("/modules/qualitative-assessment/values/all");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [finalGrade, setFinalGrade] = useState(assessment?.finalGrade || 0);
  const [finalAssessment, setFinalAssessment] = useState(
    assessment?.finalAssessment?.id.toString() || ""
  );
  const mentor = personnelAssignment?.find((i) => i.personnelRole === "mentor");
  const [mentorState, setMentorState] = useState(
    mentor?.personnel.id.toString() || ""
  );
  const ta = personnelAssignment?.find((i) => i.personnelRole === "ta");
  const [taState, setTaState] = useState(ta?.personnel.id.toString() || "");

  const navigate = useNavigate();
  const { student_id, module_id } = useParams();
  const [handleSubmitAssigning] = useAssignMentorTa(
    0, //it doesn't matter here
    mentorState,
    taState,
    mentor?.assignmentId,
    ta?.assignmentId,
    parseInt(module_id!),
    parseInt(student_id!),
    student?.family || "",
    student?.firstName || "",
    setSubmitLoading
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmitAssigning(e);
    setSubmitLoading(true);
    try {
      const res = await editAxios(
        `modules/student/enrollment/details/${module_id}/${student_id}`,
        {
          data: {
            finalGrade,
            finalAssessmentId: finalAssessment,
          },
        }
      );
      if (res.status === 200) {
        navigate(-1);
        toast.success("ویرایش نمره نهایی و ارزیابی نهایی با موفقیت انجام شد ");
      } else {
        console.log(res.data);
        toast.error("ویرایش نمره نهایی و ارزیابی نهایی با خطا مواجه شد");
      }
    } catch (error: any) {
      toast.error(handleError(error));
    } finally {
      setSubmitLoading(false);
    }
  };
  if (assessmentLoading || volunteerLoading) {
    return <LoadingProgress />;
  }
  const disableAssigning = trainingStatus?.id !== 2; //only this state let you edit ta/mentor

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <Stack direction="row" sx={{ alignItems: "flex-start" }}>
          <Typography variant="h5">
            {student?.firstName +
              " " +
              student?.family +
              " > دوره‌های تخصصی > ویرایش"}
          </Typography>
          <Button
            variant="outlined"
            type="submit"
            sx={{ mr: 2, px: 5, ml: "auto" }}
            disabled={submitLoading}
          >
            ذخیره
          </Button>
          <Button
            variant="outlined"
            sx={{ px: 5 }}
            color="inherit"
            endIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            بازگشت
          </Button>
        </Stack>
      </header>

      <Stack
        direction="row"
        justifyContent="space-between"
        marginTop={8}
        gap={5}
      >
        <List sx={{ width: "45%" }}>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel htmlFor="finalGrade-outlined">نمره نهایی</InputLabel>
              <OutlinedInput
                id="finalGrade-outlined"
                name="finalGrade"
                label="نمره نهایی"
                value={finalGrade}
                type="number"
                onChange={(e) => setFinalGrade(+e.target.value)}
                inputProps={{
                  max: 100,
                  min: 0,
                }}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id={`ta-label`}>انتساب مربی حل تمرین</InputLabel>
              <Select
                labelId={`ta-label`}
                id="ta"
                name="ta"
                value={taState}
                label="انتساب مربی حل تمرین"
                onChange={(event) => setTaState(event.target.value.toString())}
                disabled={disableAssigning}
              >
                <MenuItem disabled={!ta?.assignmentId} value={"delete"}>
                  نامشخص
                </MenuItem>
                {volunteerData?.map((i) => (
                  <MenuItem key={i.user.id} value={i.user.id}>
                    {i.firstName + " " + i.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
        </List>
        <List sx={{ width: "45%" }}>
          <ListItem>
            <EditComboStudent
              data={assessmentRes}
              identifier="finalAssessment"
              handleChange={(e) =>
                setFinalAssessment(e.target.value.toString())
              }
              label="ارزیابی نهایی"
              val={finalAssessment}
            />
          </ListItem>

          <ListItem>
            <FormControl fullWidth>
              <InputLabel id={`mentor-label`}>انتساب منتور</InputLabel>
              <Select
                labelId={`mentor-label`}
                id="mentor"
                name="mentor"
                value={mentorState}
                label="انتساب منتور"
                onChange={(event) =>
                  setMentorState(event.target.value.toString())
                }
                disabled={disableAssigning}
              >
                <MenuItem disabled={!mentor?.assignmentId} value={"delete"}>
                  نامشخص
                </MenuItem>
                {volunteerData?.map((i) => (
                  <MenuItem key={i.user.id} value={i.user.id}>
                    {i.firstName + " " + i.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
        </List>
      </Stack>
    </form>
  );
};

export default StudentCoreDetailEdit;
