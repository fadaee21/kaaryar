import { useState } from "react";
import {
  ModuleAsStudentForDetail,
  ModulesAsStudentAssessment,
  ModulesAsStudentModule,
  StudentWithStatus,
} from "../../model";
import {
  FormControl,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { getTitle } from "../../utils/courseMethod";
import { EditComboStudent } from "./EditComboStudent";
import useSWR, { KeyedMutator } from "swr";
import { editAxios } from "../../api/axios";
import LoadingProgress from "../LoadingProgress";

interface Prop {
  assessment: ModulesAsStudentAssessment | undefined;
  module: ModulesAsStudentModule | undefined;
  student: StudentWithStatus | undefined;
  mutate: KeyedMutator<ModuleAsStudentForDetail>;
}
interface nextModuleType {
  name: string;
  id: number;
}
interface ValueOptType {
  value: string;
  id: number;
}
const StudentGeneralDetailEdit = ({
  assessment,
  module,
  student,
  mutate,
}: Prop) => {
  const navigate = useNavigate();

  const [attendanceGrade, setAttendanceGrade] = useState(
    assessment?.attendanceGrade?.toString() || ""
  );
  const [finalAssessment, setFinalAssessment] = useState(
    assessment?.finalAssessment?.id.toString() || ""
  );
  const [homeworkAssessment, setHomeworkAssessment] = useState(
    assessment?.homeworkAssessment?.id.toString() || ""
  );
  const [finalGrade, setFinalGrade] = useState(
    assessment?.finalGrade?.toString() || ""
  );
  const [nextModule, setNextModule] = useState(
    assessment?.nextModule?.id?.toString() || ""
  );
  const { student_id, module_id } = useParams();
  //put value
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ attendanceGrade });
    try {
      const res = await editAxios(
        `modules/student/enrollment/details/${module_id}/${student_id}`,
        {
          data: {
            attendanceGrade,
            finalAssessmentId: finalAssessment || undefined,
            homeworkAssessmentId: homeworkAssessment || undefined,
            nextModuleId: nextModule || undefined,
            finalGrade,
          },
        }
      );
      mutate(res.data);
      if (res.status === 200) {
        navigate(-1);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get options
  const NEXT_MODULE_OPT =
    module?.subType === "english_module"
      ? "/modules/short-details/all?pageNum=1&pageSize=100&orderAscending=true&orderBy=name&moduleType=general&moduleSubType=english_module"
      : null;
  const { data: nextModulesData, isLoading: loadingNextModulesData } =
    useSWR<nextModuleType[]>(NEXT_MODULE_OPT);
  const { data: valueRes, isLoading: valueLoading } = useSWR<ValueOptType[]>(
    "/modules/qualitative-assessment/values/all"
  );

  if (valueLoading) {
    return <LoadingProgress />;
  }
  return (
    <form onSubmit={handleSubmit}>
      <header>
        <Stack direction="row" alignItems="flex-start" sx={{ mb: 8 }}>
          <Typography variant="h6">{`${
            student?.firstName + " " + student?.family
          } > دوره‌های عمومی > ${getTitle(module?.subType)} > ${
            module?.name
          } > ویرایش`}</Typography>

          <Button
            variant="outlined"
            type="submit"
            sx={{ mr: 2, px: 5, ml: "auto" }}
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
      {(module?.subType === "workshop" ||
        module?.subType === "vocational_skills") && (
        <List sx={{ width: "45%" }}>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel htmlFor="attendanceGrade-outlined">
                وضعیت حضور و غیاب
              </InputLabel>
              <OutlinedInput
                id="attendanceGrade-outlined"
                name="attendanceGrade"
                label="وضعیت حضور و غیاب"
                value={attendanceGrade}
                type="number"
                onChange={(e) => setAttendanceGrade(e.target.value)}
                inputProps={{
                  max: 20,
                  min: 0,
                }}
              />
            </FormControl>
          </ListItem>
        </List>
      )}
      {module?.subType === "interpersonal_skills" && (
        <List sx={{ width: "45%" }}>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel htmlFor="attendanceGrade-outlined">
                وضعیت حضور و غیاب
              </InputLabel>
              <OutlinedInput
                id="attendanceGrade-outlined"
                name="attendanceGrade"
                label="وضعیت حضور و غیاب"
                value={attendanceGrade}
                type="number"
                onChange={(e) => setAttendanceGrade(e.target.value)}
                inputProps={{
                  max: 20,
                  min: 0,
                }}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <EditComboStudent
              handleChange={(e) =>
                setFinalAssessment(e.target.value.toString())
              }
              data={valueRes}
              identifier="finalAssessment"
              label="ارزیابی نهایی"
              val={finalAssessment?.toString()}
            />
          </ListItem>
          <ListItem>
            <EditComboStudent
              handleChange={(e) =>
                setHomeworkAssessment(e.target.value.toString())
              }
              data={valueRes}
              identifier="homeworkAssessment"
              label="وضعیت انجام تکالیف"
              val={homeworkAssessment?.toString()}
            />
          </ListItem>
        </List>
      )}
      {module?.subType === "english_module" && !loadingNextModulesData && (
        <List sx={{ width: "45%" }}>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel htmlFor="attendanceGrade-outlined">
                وضعیت حضور و غیاب
              </InputLabel>
              <OutlinedInput
                id="attendanceGrade-outlined"
                name="attendanceGrade"
                label="وضعیت حضور و غیاب"
                value={attendanceGrade}
                type="number"
                onChange={(e) => setAttendanceGrade(e.target.value)}
                inputProps={{
                  max: 20,
                  min: 0,
                }}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel htmlFor="finalGrade-outlined">نمره پایانی</InputLabel>
              <OutlinedInput
                id="finalGrade-outlined"
                name="finalGrade"
                label="نمره پایانی"
                value={finalGrade}
                type="number"
                onChange={(e) => setFinalGrade(e.target.value)}
                inputProps={{
                  max: 100,
                  min: 0,
                }}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <EditComboStudent
              handleChange={(e) =>
                setFinalAssessment(e.target.value.toString())
              }
              data={valueRes}
              identifier="finalAssessment"
              label="ارزیابی نهایی"
              val={finalAssessment?.toString()}
            />
          </ListItem>
          <ListItem>
            <EditComboStudent
              handleChange={(e) => setNextModule(e.target.value.toString())}
              data={nextModulesData?.map((i) => ({
                value: i.name,
                id: i.id,
              }))} //editComboStudent only have id and value that's why i insert name into the value
              identifier="nextModule"
              label="نام دوره آتی"
              val={nextModule}
            />
          </ListItem>
        </List>
      )}
    </form>
  );
};

// };

export default StudentGeneralDetailEdit;
