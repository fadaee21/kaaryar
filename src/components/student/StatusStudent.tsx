import { Button, List, ListItem, ListItemText, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { CareerPathway, StatusForm } from "../../model";
import { useAuth } from "../../context/AuthProvider";
interface Prop {
  statusForm: StatusForm | undefined;
  careerPathway: CareerPathway | undefined | null;
}
const StatusStudent = ({ statusForm, careerPathway }: Prop) => {
  const navigate = useNavigate();
  const { adminVisibility } = useAuth();
  const {
    trainingStatus,
    nextTrainingStep,
    description,
    withdrawalReason,
    referralToFinance,
    kaaryarAssessment,
  } = statusForm || {};
  if (
    [
      trainingStatus,
      nextTrainingStep,
      description,
      withdrawalReason,
      referralToFinance,
    ].every((val) => !val)
  ) {
    return (
      <>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <p>وضعیت آموزش برای این مهارت آموز وجود ندارد</p>

          <Button
            endIcon={<EditIcon />}
            variant="outlined"
            onClick={() => navigate(`edit-status`)}
            disabled={!adminVisibility}
            sx={{
              mr: 2,
              px: 5,
              ...(!adminVisibility && { visibility: "hidden" }),
            }}
          >
            ویرایش
          </Button>
        </Stack>
        <List sx={{ width: "40%" }}>
          <ListItem>
            <ListItemText
              primary="مسیر آموزشی"
              secondary={careerPathway?.name || "-"}
            />
          </ListItem>
        </List>
      </>
    );
  }
  return (
    <>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Stack direction="row" sx={{ width: "100%" }} gap={5}>
          <List sx={{ width: "40%" }}>
            <ListItem>
              <ListItemText
                primary="وضعیت آموزش"
                secondary={trainingStatus?.value}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="قدم آتی آموزش"
                secondary={nextTrainingStep?.value}
              />
            </ListItem>
            {adminVisibility && (
              <ListItem>
                <ListItemText primary="توضیحات" secondary={description} />
              </ListItem>
            )}
          </List>
          <List>
            {[6, 7].some((item) => item === trainingStatus?.id) && (
              <ListItem>
                <ListItemText
                  primary="دلیل انصراف/ریزش"
                  secondary={withdrawalReason?.value || "-"}
                />
              </ListItem>
            )}
            {adminVisibility && (
              <>
                <ListItem>
                  <ListItemText
                    primary="ارجاع به واحد مالی"
                    secondary={referralToFinance?.value || "-"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="ارزیابی کاریار"
                    secondary={kaaryarAssessment?.value || "-"}
                  />
                </ListItem>
              </>
            )}
            <ListItem>
              <ListItemText
                primary="مسیر آموزشی"
                secondary={careerPathway?.name || "-"}
              />
            </ListItem>
          </List>
        </Stack>
        <Button
          endIcon={<EditIcon />}
          variant="outlined"
          onClick={() => navigate(`edit-status`)}
          disabled={!adminVisibility}
          sx={{
            mr: 2,
            px: 5,
            ...(!adminVisibility && { visibility: "hidden" }),
          }}
        >
          ویرایش
        </Button>
      </Stack>
    </>
  );
};

export default StatusStudent;
