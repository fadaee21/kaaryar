import {
  Box,
  FormControl,
  Grid,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { JalaliDatePicker } from "../comment/JalaliDatePicker";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
type Props = {
  compType: "edit" | "add";
  startDate: any;
  setStartDate: React.Dispatch<React.SetStateAction<any>>;
  endDate: any;
  setEndDate: React.Dispatch<React.SetStateAction<any>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  groupCode: string;
  setGroupCode: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
};

const AddOrEditGroupComp = ({
  compType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  name,
  setName,
  groupCode,
  setGroupCode,
  description,
  setDescription,
}: Props) => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <header>
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 10 }}>
          {compType === "add" && (
            <Typography variant="h5">{`فهرست گروه‌ها > افزودن گروه جدید`}</Typography>
          )}
          {compType === "edit" && (
            <Typography variant="h5">{`فهرست گروه‌ها > گروه ${groupId} > ویرایش`}</Typography>
          )}

          <Button
            variant="outlined"
            type="submit"
            sx={{ mr: 2, ml: "auto", px: 5 }}
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

      <Grid container rowSpacing={4} columnSpacing={8}>
        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" fullWidth>
            <Typography variant="body2" gutterBottom>
              شماره گروه
            </Typography>
            <OutlinedInput
              id="groupCode"
              name="groupCode"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" fullWidth>
            <Typography variant="body2" gutterBottom>
              نام گروه
            </Typography>
            <OutlinedInput
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography variant="body2" gutterBottom>
              تاریخ شروع آموزش گروه
            </Typography>
            <JalaliDatePicker
              setSessionDate={setStartDate}
              sessionDate={startDate}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography variant="body2" gutterBottom>
              تاریخ پایان آموزش گروه
            </Typography>
            <JalaliDatePicker
              setSessionDate={setEndDate}
              sessionDate={endDate}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" fullWidth>
            <Typography variant="body2" gutterBottom>
              توضیحات
            </Typography>
            <OutlinedInput
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default AddOrEditGroupComp;
