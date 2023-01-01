import TextField from "@mui/material/TextField";
import AdapterJalali from "@date-io/jalaali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

export default function JalaliDatePicker({ sessionDate, setDateSession }: any) {
  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      <DatePicker
        mask="____/__/__"
        value={sessionDate}
        onChange={(newValue) => setDateSession(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

// sessionDate: "2022-11-04 04:13:47"
