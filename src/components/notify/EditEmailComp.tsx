import { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CKEditor } from "ckeditor4-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Notify } from "../../model";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { editAxios } from "../../api/axios";
import { KeyedMutator } from "swr";
import { NotifyConfirmation } from "./NotifyConfirmation";
interface Props {
  data: Notify | undefined;
  notifyId: string | undefined;
  mutate: KeyedMutator<Notify>;
}
const EditEmailComp = ({ data, notifyId, mutate }: Props) => {
  const [open, setOpen] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [body, setBody] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const oneStudentLink = `/communications/emails/update/${notifyId}`;
  useEffect(() => {
    if (data) {
      setBody(data.body);
      setIsActive(data.isActive);
      setSubject(data.subject);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingEdit(true);
    try {
      const res = await editAxios(oneStudentLink, {
        data: { body, subject, isActive, name: data?.name, type: data?.type },
      });
      if (res.status === 200) {
        toast.success("اطلاعات با موفقیت ویرایش شد");
        navigate(-1);
        mutate(res.data, false);
      } else {
        toast.error("اطلاعات ویرایش نشد");
      }
      console.log(res);
    } catch (error) {
      toast.error(handleError(error as any));
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <>
      <form>
        <header>
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 10 }}>
            <Typography variant="h5">{`ویرایش ایمیل > ${
              data?.name ?? ""
            }`}</Typography>
            <Button
              variant="outlined"
              type="button"
              // onClick={handleSubmit}
              onClick={() => setOpen(true)}
              sx={{ mr: 2, ml: "auto", px: 5 }}
              disabled={loadingEdit}
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
          </Box>
        </header>
        <Stack spacing={3}>
          <Stack direction="row" spacing={3}>
            <TextField
              id="outlined-basic"
              label="عنوان ایمیل"
              variant="outlined"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              sx={{ width: "50%" }}
            />
            <FormControl sx={{ width: "50%" }}>
              <InputLabel id="demo-simple-select-label">وضعیت</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={isActive !== null ? isActive : data?.isActive}
                label="وضعیت"
                onChange={() => setIsActive((prevIsActive) => !prevIsActive)}
              >
                <MenuItem value={true as any}>فعال</MenuItem>
                <MenuItem value={false as any}>غیر فعال</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <CKEditor
            initData={body || data?.body}
            onChange={(e) => setBody(e.editor.getData())}
            config={{
              contentsLangDirection: "rtl",
              language: "fa",
            }}
          />
        </Stack>
      </form>
      <NotifyConfirmation
        handleSubmit={handleSubmit}
        open={open}
        handleClose={() => setOpen(false)}
        title={`ویرایش ایمیل > ${data?.name ?? ""}`}
      />
    </>
  );
};

export default EditEmailComp;
