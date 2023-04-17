import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { editAxios } from "../../api/axios";
import { finalResults } from "../search/searchOptions";

const FinalResult = ({ approvedStu, id, finalResult }: any) => {

  const oneStudentLink = `exam/after/week/form/${id}`;
  const [result, setResult] = useState(finalResult);
  const [loading, setLoading] = useState(false);
  const [feedBackMessage, setFeedBackMessage] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setResult(event.target.value as string);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await editAxios(oneStudentLink, {
        data: { form: { finalResult: result } },
      });
      if (response.status === 200) {
        setFeedBackMessage("نتیجه نهایی با موفقیت ثبت شد");
        console.log(response.data);
        setLoading(false);
      } else {
        setFeedBackMessage("نتیجه نهایی ثبت نشد");
        console.log(response.data);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <FormControl fullWidth sx={{ width: 400, mr: 5 }}>
          <InputLabel id="demo-simple-select-label">نتیجه نهایی</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={result}
            label="نتیجه نهایی"
            onChange={handleChange}
            readOnly={approvedStu}
          >
            {finalResults.map((finalResult) => (
              <MenuItem key={finalResult.label} value={finalResult.value}>
                {finalResult.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          sx={{ ...(approvedStu === true ? { display: "none" } : {}) }}
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        >
          {loading ? "بارگذاری..." : "ثبت"}
        </Button>
      </Box>
      <Typography sx={{ m: 1, mb: 3 }} variant="subtitle2">
        {approvedStu && "این مهارت‌آموز تایید شده است و قابلیت ویرایش ندارد"}
        {feedBackMessage}
      </Typography>
    </>
  );
};

export default FinalResult;
