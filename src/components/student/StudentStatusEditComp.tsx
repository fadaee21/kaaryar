import { useState } from "react";
import { StatusForm } from "../../model";
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
import { useNavigate } from "react-router-dom";
import LoadingProgress from "../LoadingProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { EditComboStudent } from "./EditComboStudent";
import useGetStatusStudent from "../../hooks/request/useGetStatusStudent";
import useSubmitStatusStudent from "../../hooks/request/useSubmitStatusStudent";

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
  const { id } = statusForm || {};
  const {
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
  } = useGetStatusStudent(true);
  const { handleSubmit, loading } = useSubmitStatusStudent(
    id,
    trainingStatus,
    nextTrainingStep,
    description,
    withdrawalReason,
    referralToFinance,
    kaaryarAssessment,
    firstName + " " + family
  );

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
