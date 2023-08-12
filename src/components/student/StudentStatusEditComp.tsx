import { useState } from "react";
import { DetailStudentStatus, StatusForm } from "../../model";
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
import useSWR from "swr";
import { editAxios } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import LoadingProgress from "../LoadingProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import { EditComboStudent } from "./EditComboStudent";

interface Prop {
  statusForm: StatusForm | undefined;
  firstName: string | undefined;
  family: string | undefined;
  
}

const StudentStatusEditComp = ({ statusForm, family, firstName }: Prop) => {
  const navigate = useNavigate();
  const [trainingStatus, setTrainingStatus] = useState(
    statusForm?.trainingStatus?.id.toString() || ""
  );
  const [nextTrainingStep, setNextTrainingStep] = useState(
    statusForm?.nextTrainingStep?.id.toString() || ""
  );
  const [description, setDescription] = useState(statusForm?.description || "");
  const [withdrawalReason, setWithdrawalReason] = useState(
    statusForm?.withdrawalReason?.id.toString() || ""
  );
  const [referralToFinance, setReferralToFinance] = useState(
    statusForm?.referralToFinance?.id.toString() || ""
  );
  const [kaaryarAssessment, setKaaryarAssessment] = useState(
    statusForm?.kaaryarAssessment?.id.toString() || ""
  );

  const [loading, setLoading] = useState(false);
  const { data: trainingData, isLoading: statusLoading } = useSWR<
    DetailStudentStatus[]
  >("/status/training-status/values/all");
  const { data: nextStepData, isLoading: nextStepLoading } = useSWR<
    DetailStudentStatus[]
  >("/status/next-training-step/values/all");
  const { data: withdrawalData, isLoading: withdrawalLoading } = useSWR<
    DetailStudentStatus[]
  >("/status/withdrawal-reason/values/all");
  const { data: referralToFinanceData, isLoading: referralLoading } = useSWR<
    DetailStudentStatus[]
  >("/status/referral-finance/values/all");
  const { data: kaaryarAssessmentData, isLoading: kaaryarAssessmentLoading } =
    useSWR<DetailStudentStatus[]>("/status/kaaryar-assessment/values/all");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await editAxios(`/status/form/${statusForm?.id}`, {
        data: {
          status_form: {
            trainingStatusId: trainingStatus,
            nextTrainingStepId: nextTrainingStep,
            description,
            withdrawalReasonId: withdrawalReason || undefined,
            referralToFinanceId: referralToFinance,
            kaaryarAssessmentId: kaaryarAssessment,
          },
        },
      });
      if (res.status === 200) {
        navigate(-1);
      } else {
        toast.error("ویرایش انجام نشد");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (
    statusLoading ||
    nextStepLoading ||
    withdrawalLoading ||
    referralLoading ||
    kaaryarAssessmentLoading
  ) {
    return <LoadingProgress />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" alignItems="flex-start" marginBottom={8}>
          <Typography variant="h5">
            {firstName + " " + family + " >  وضعیت آموزش > ویرایش "}
          </Typography>
          <Button
            variant="outlined"
            type="submit"
            sx={{ px: 5, ml: "auto" }}
            disabled={
              loading ||
              !trainingStatus ||
              !nextTrainingStep ||
              !referralToFinance ||
              !kaaryarAssessment
            }
          >
            ذخیره
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{ ml: 2 }}
            disabled={loading}
            endIcon={<ArrowBackIcon />}
            color="inherit"
          >
            بازگشت
          </Button>
        </Stack>

        <Stack direction="row" sx={{ width: "100%" }} gap={5}>
          <List sx={{ width: "40%" }}>
            <ListItem>
              <EditComboStudent
                data={trainingData}
                identifier="trainingStatus"
                handleChange={(e) =>
                  setTrainingStatus(e.target.value.toString())
                }
                label="وضعیت آموزش"
                val={trainingStatus}
              />
            </ListItem>

            <ListItem>
              <EditComboStudent
                data={nextStepData}
                identifier="nextTrainingStep"
                handleChange={(e) =>
                  setNextTrainingStep(e.target.value.toString())
                }
                label="قدم آتی آموزش"
                val={nextTrainingStep}
              />
            </ListItem>
            <ListItem>
              <FormControl fullWidth>
                <InputLabel htmlFor="description-outlined">توضیحات</InputLabel>
                <OutlinedInput
                  id="description-outlined"
                  name="description"
                  label="توضیحات"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={4}
                />
              </FormControl>
            </ListItem>
          </List>
          <List sx={{ width: "40%" }}>
            {["6", "7"].some((item) => item === trainingStatus) && (
              <ListItem>
                <EditComboStudent
                  data={withdrawalData}
                  identifier="withdrawalReason"
                  handleChange={(e) =>
                    setWithdrawalReason(e.target.value.toString())
                  }
                  label="دلیل انصراف/ریزش"
                  val={withdrawalReason}
                />
              </ListItem>
            )}
            <ListItem>
              <EditComboStudent
                data={referralToFinanceData}
                identifier="referralToFinance"
                handleChange={(e) =>
                  setReferralToFinance(e.target.value.toString())
                }
                label="ارجاع به واحد مالی"
                val={referralToFinance}
              />
            </ListItem>
            <ListItem>
              <EditComboStudent
                data={kaaryarAssessmentData}
                identifier="kaaryarAssessment"
                handleChange={(e) =>
                  setKaaryarAssessment(e.target.value.toString())
                }
                label="ارزیابی کاریار"
                val={kaaryarAssessment}
              />
            </ListItem>
          </List>
        </Stack>
      </form>
    </>
  );
};

export default StudentStatusEditComp;
