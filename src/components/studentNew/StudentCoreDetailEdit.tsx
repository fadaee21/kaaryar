import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { ModulesAsStudentAssessment, StudentEdu } from "../../model";
import { EditComboStudent } from "./StudentStatusEditComp";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import LoadingProgress from "../LoadingProgress";
import { editAxios } from "../../api/axios";

interface Prop {
  assessment: ModulesAsStudentAssessment | undefined;
  student: StudentEdu | undefined;
}
interface AssessmentOpt {
  value: string;
  id: number;
}
const StudentCoreDetailEdit = ({ assessment, student }: Prop) => {
  const { data: assessmentRes, isLoading: assessmentLoading } = useSWR<
    AssessmentOpt[]
  >("/modules/qualitative-assessment/values/all");

  const [finalGrade, setFinalGrade] = useState(assessment?.finalGrade || "");
  const [finalAssessment, setFinalAssessment] = useState(
    assessment?.finalAssessment?.id.toString() || ""
  );

  const navigate = useNavigate();
  const { student_id, module_id } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (assessmentLoading) {
    return <LoadingProgress />;
  }

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
        </List>
      </Stack>
    </form>
  );
};

export default StudentCoreDetailEdit;
