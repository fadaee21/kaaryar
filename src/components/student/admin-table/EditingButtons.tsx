import { Button } from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
interface Props {
  toggleEditingMode: () => void;
  handleClick: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  submitLoading: boolean;
}
const EditingButtons = ({
  toggleEditingMode,
  handleClick,
  submitLoading,
}: Props) => {
  const onClick = async (e: any) => {
    await handleClick(e);
    toggleEditingMode();
  };

  return (
    <>
      <Button
        variant="contained"
        endIcon={<DoneOutlinedIcon />}
        sx={{ width: 250 }}
        onClick={onClick}
        disabled={submitLoading}
      >
        ثبت تغییرات
      </Button>
      <Button
        onClick={toggleEditingMode}
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
