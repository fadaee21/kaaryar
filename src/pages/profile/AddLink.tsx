import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";

export interface DesireLink {
  id: number;
  title: string;
  address: string;
}

interface Prop {
  desiredLink: DesireLink[];
  setDesiredLink: React.Dispatch<React.SetStateAction<DesireLink[]>>;
}

const AddLink = ({ setDesiredLink, desiredLink }: Prop) => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  const handleAddLink = () => {
    setDesiredLink((prev: any) => [
      { title, address, id: Date.now() },
      ...prev,
    ]);
    setAddress("");
    setTitle("");
  };
  const handleRemoveLink = (id: number) => {
    setDesiredLink((prev: DesireLink[]) =>
      prev.filter((link: DesireLink) => link.id !== id)
    );
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <TextField
          sx={{ width: "64%" }}
          label="آدرس لینک"
          onChange={(e) => setAddress(e.target.value)}
          name="address"
          size="small"
          value={address}
        />
        <TextField
          sx={{ width: "21%" }}
          label="عنوان لینک"
          onChange={(e) => setTitle(e.target.value)}
          size="small"
          name="title"
          value={title}
        />
        <Button
          sx={{ width: "12%" }}
          variant="outlined"
          color="primary"
          endIcon={<AddIcon />}
          onClick={handleAddLink}
          disabled={title.length === 0 || address.length === 0}
        >
          افزودن
        </Button>
      </Stack>
      <Stack spacing={1}>
        {desiredLink.map((item: DesireLink) => {
          return (
            <Stack direction="row" key={item.id} spacing={2}>
              <TextField
                size="small"
                sx={{ width: "64%" }}
                value={item.address}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                size="small"
                sx={{ width: "21%" }}
                value={item.title}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button
                sx={{ width: "12%" }}
                variant="outlined"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={() => handleRemoveLink(item.id)}
              >
                حذف
              </Button>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default AddLink;
