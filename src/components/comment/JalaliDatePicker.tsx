import AdapterJalali from "@date-io/jalaali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { RtlInputDate } from "../../styles/addComment/formBox";
import dayjs from "dayjs";
import { useEffect } from "react";

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
  const handleDateChange = (date: any) => {
    if (date) {
      // Convert the time to the 10:00:00
      const iranDate = dayjs(date)
        .set("hour", 10)
        .set("minute", 0)
        .set("second", 0)
        .toDate();
      setSessionDate?.(iranDate);
    } else {
      setSessionDate?.(null);
    }
  };
  useEffect(() => {
    console.log(sessionDate);
  }, [sessionDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      <DatePicker
        mask="____/__/__"
        value={sessionDate}
        onChange={handleDateChange}
        renderInput={(params) => <RtlInputDate {...params} />}
        readOnly={usageType === "watching"}
      />
    </LocalizationProvider>
  );
}
