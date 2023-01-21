import TextField from "@mui/material/TextField";
import AdapterJalali from "@date-io/jalaali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

export default function JalaliDatePicker({ sessionDate, setSessionDate }: any) {
  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      <DatePicker
        mask="____/__/__"
        value={sessionDate}
        onChange={(newValue) => setSessionDate(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
