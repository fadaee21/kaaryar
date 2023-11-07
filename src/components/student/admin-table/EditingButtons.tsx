import { Button } from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
interface Props {
  toggleEditingMode: () => void;
  toggleAssigningMode: () => void;
  handleClickEditing: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleClickAssigning: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  submitLoading: boolean;
  mode: "edit" | "assign" | null;
}
const EditingButtons = ({
  toggleEditingMode,
  handleClickEditing,
  handleClickAssigning,
  submitLoading,
  toggleAssigningMode,
  mode,
}: Props) => {
  const handleClick = async (e: any) => {
    if (mode === "edit") {
      await handleClickEditing(e);
      toggleEditingMode();
    } else {
      await handleClickAssigning(e);
      toggleAssigningMode();
    }
  };
  const handleToggle = () => {
    if (mode === "edit") {
      toggleEditingMode();
    } else {
      toggleAssigningMode();
    }
  };
  return (
    <>
      <Button
        variant="contained"
        endIcon={<DoneOutlinedIcon />}
        sx={{ width: 250 }}
        onClick={handleClick}
        disabled={submitLoading}
      >
        ثبت تغییرات
      </Button>
      <Button
        onClick={handleToggle}
        variant="outlined"
        color="inherit"
        sx={{ width: 250 }}
        disabled={submitLoading}
      >
        خروج از حالت ویرایش
      </Button>
    </>
  );
};

export default EditingButtons;
