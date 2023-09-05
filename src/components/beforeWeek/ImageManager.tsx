import { Box, Button, Stack, Typography } from "@mui/material";
import useGetImage from "../../hooks/request/useGetImage";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { toast } from "react-toastify";
import ImageModal from "../ImageModal";
import { saveAs } from "file-saver";
import { handleError } from "../../utils/handleError";
import { editAxios, removeData } from "../../api/axios";

type Prop = {
  propImage: string | undefined;
  id: string | undefined;
  checked: boolean | null | undefined;
  removeLink: string;
  uploadLink: string;
  buttonsActivation: boolean;
};
const ImageManager = ({
  propImage,
  id,
  checked,
  removeLink,
  uploadLink,
  buttonsActivation,
}: Prop) => {
  const { pic, getPicture } = useGetImage("/exam/after/week/image/get");
  // const { mutate } = useSWRConfig();
  //handling modal
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // there is two state for same job,main difference is the type of image object
  const [inputState, setInputState] = useState<Blob | null>(null);
  const [dataImageState, setDataImageState] = useState<string | undefined>(
    propImage
  );

  useEffect(() => {
    // if (!propImage) return;
    getPicture(propImage || "");
    setDataImageState(propImage); //it looks redundant but it's necessary
  }, [getPicture, propImage]);

  const pickImage = async (e: React.ChangeEvent<any>) => {
    const imageInput = e.target.files[0];
    if (imageInput.size > 5000000) {
      toast.error("حجم فایل بیشتر از ۵ مگابایت است");
      return;
    }
    const validPrefix = ["image/jpg", "image/jpeg", "image/png"];
    if (!validPrefix.includes(imageInput.type)) {
      toast.error("فرمت فایل قابل قبول نیست");
      return;
    }
    setInputState(imageInput);
    setLoading(true);
    try {
      const dataContent = new FormData();
      dataContent.append("image", imageInput);
      const res = await editAxios(`${uploadLink}/${id}`, {
        data: dataContent,
      });
      const toastMessage =
        res.status === 201 ? "عکس آپلود شد" : "عکس آپلود نشد";
      toast.success(toastMessage);
    } catch (error) {
      toast.error(handleError(error as any));
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setInputState(null);
    setDataImageState(undefined);
    setLoading(true);
    try {
      const res = await removeData(`${removeLink}/${id}`);
      const toastMessage = res.status === 204 ? "عکس حذف شد" : "عکس حذف نشد";
      toast.success(toastMessage);
    } catch (error) {
      toast.error(handleError(error as any));
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => (pic || inputState) && setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {dataImageState || inputState ? (
        <>
          {/* show image and its buttons (remove - save) */}
          <Box
            component="img"
            alt={`Image-${id}`}
            width={400}
            height={"100%"}
            sx={{
              objectFit: "cover",
              objectPosition: "center center",
              borderRadius: 2,
              mb: 1,
              cursor: "pointer",
              ...(loading && { opacity: 0.1 }),
            }}
            src={inputState ? URL.createObjectURL(inputState) : pic}
            onClick={handleOpen}
          />
          <Stack direction="row" gap={1}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleRemove}
              sx={{ px: 4, mb: 1, height: "fit-content" }}
              endIcon={<DeleteIcon />}
              disabled={checked !== null || buttonsActivation}
            >
              حذف این عکس
            </Button>
            <Button
              endIcon={<DownloadIcon />}
              variant="outlined"
              sx={{ px: 4, mb: 1, height: "fit-content" }}
              onClick={() =>
                saveAs(
                  inputState
                    ? (URL.createObjectURL(inputState) as any)
                    : (pic as any),
                  `Image-${id}.jpg`
                )
              }
            >
              دانلود
            </Button>
          </Stack>
        </>
      ) : (
        // let user to choose image
        // Not editable for those who have been checked and whose value is not null.
        <Box
          sx={{
            ...(checked !== null || buttonsActivation
              ? { display: "none" }
              : { display: "block" }),
          }}
        >
          <Button
            variant="outlined"
            component="label"
            sx={{
              display: "block",
              mb: 1,
              textAlign: "center",
            }}
            disabled={checked !== null || buttonsActivation}
          >
            فایل مورد نظر را انتخاب کنید
            <input name="Image" type="file" hidden onChange={pickImage} />
          </Button>
          <Typography variant="caption">
            * لطفاً عکسی در اندازهٔ مربع و در یکی از فرمت‌های PNG, JPEG, JPG
            انتخاب کنید. دقت کنید که حجم فایل بیشتر از ۵ مگابایت نباشد.{" "}
          </Typography>
        </Box>
      )}
      <ImageModal
        pic={inputState ? URL.createObjectURL(inputState) : pic}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default ImageManager;
