import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { StatusForm } from "../../../model";
interface Props {
  toggleEditingMode: () => void;
  toggleAssigningMode: () => void;
  statusForm: StatusForm | null;
  latestEnrolledModuleId:any
}
const ViewButtons = ({
  toggleEditingMode,
  toggleAssigningMode,
  statusForm,
  latestEnrolledModuleId
}: Props) => {
  const { trainingStatus } = statusForm || {};
  return (
    <>
      <Button
        onClick={toggleAssigningMode}
        sx={{ width: 250 }}
        variant="outlined"
        endIcon={<PersonAddOutlinedIcon />}
        disabled={trainingStatus?.id !== 2 || !latestEnrolledModuleId}
      >
        انتساب منتور و حل تمرین
      </Button>
      <Button
        onClick={toggleEditingMode}
        variant="outlined"
        sx={{ width: 250 }}
        endIcon={<EditIcon />}
      >
        ویرایش مشخصات
      </Button>
    </>
  );
};

export default ViewButtons;
