import AdapterJalali from "@date-io/jalaali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { RtlInputDate } from "../../styles/addComment/formBox";
import dayjs from "dayjs";

interface JalaliType {
  sessionDate: Date | dayjs.Dayjs | null;
  setSessionDate?: React.Dispatch<
    React.SetStateAction<Date | dayjs.Dayjs | null>
  >;
  usageType?: "watching";
}

export function JalaliDatePicker({
  sessionDate,
  setSessionDate,
  usageType,
}: JalaliType) {
  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      <DatePicker
        mask="____/__/__"
        value={sessionDate}
        onChange={(newValue) => setSessionDate?.(newValue)}
        renderInput={(params) => <RtlInputDate {...params} />}
        readOnly={usageType === "watching" ? true : false}
      />
    </LocalizationProvider>
  );
}
