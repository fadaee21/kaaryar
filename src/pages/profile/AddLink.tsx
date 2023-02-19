import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const AddLink = ({ setDesiredLink, desiredLink, children, id }: any) => {
  const [ad, setAd] = useState("");
  const [ti, setTi] = useState("");

  useEffect(() => {
    setDesiredLink(
      desiredLink.map((item: any) => {
        if (item.id === id) {
          return { ...item, title: ti, address: ad };
        } else {
          return item;
        }
      })
    );
    // eslint-disable-next-line
  }, [ad, desiredLink, id, ti]);

  return (
    <Box
      id="ABC"
      sx={{
        display: "flex",
        gap: 2,
      }}
    >
      <TextField
        label="آدرس لینک"
        onChange={(e) => setAd(e.target.value)}
        size="small"
        value={ad}
      />
      <TextField
        label="عنوان لینک"
        onChange={(e) => setTi(e.target.value)}
        size="small"
        value={ti}
      />
      {children}
    </Box>
  );
};

export default AddLink;
