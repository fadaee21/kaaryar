import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
interface Props {
  toggleEditingMode: () => void;
}
const ViewButtons = ({ toggleEditingMode }: Props) => {
  return (
    <>
      <Button
        sx={{ width: 250 }}
        variant="outlined"
        endIcon={<PersonAddOutlinedIcon />}
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
