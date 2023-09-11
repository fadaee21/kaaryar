import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { memo } from "react";
interface JalaliType {
  sessionDate: Date | dayjs.Dayjs | null;
  setSessionDate?: React.Dispatch<
    React.SetStateAction<Date | dayjs.Dayjs | null>
  >;
  usageType?: "watching" | "searching";
  label?: string;
}

export const JalaliDatePicker = memo(
  ({ sessionDate, setSessionDate, usageType, label }: JalaliType) => {
    const isValidDate = (date: Date): boolean =>
      date instanceof Date && !isNaN(date.getTime());
    const handleDateChange = (date: any) => {
      if (isValidDate(date)) {
        const endOfDate = dayjs(date).endOf("day").toDate();
        setSessionDate?.(endOfDate);
      } else {
        setSessionDate?.(null);
      }
    };
    return (
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <DatePicker
          label={label}
          onChange={handleDateChange}
          readOnly={usageType === "watching"}
          value={sessionDate as any}
          timezone="Asia/Tehran"
          slotProps={
            usageType === "searching"
              ? {
                  textField: {
                    size: "small",
                    fullWidth: true,
                    sx: { "& .MuiInputBase-input": { py: 1.25 } },
                  },
                }
              : {}
          }
        />
      </LocalizationProvider>
    );
  }
);
