import { TableHead } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../styles/table";
import { useLocation } from "react-router-dom";

const TableHeader = () => {
  const { pathname } = useLocation();
  return (
    <TableHead>
      <StyledTableRow>
        {pathname.endsWith("register-form") ? (
          <>
            <StyledTableCell />
            <StyledTableCell align="center">وضعیت</StyledTableCell>
            <StyledTableCell align="center">کد متقاضی</StyledTableCell>
            <StyledTableCell align="left">نام و نام خانوادگی</StyledTableCell>
            <StyledTableCell align="center">دوره</StyledTableCell>
            <StyledTableCell align="center">میزان تحصیلات</StyledTableCell>
            <StyledTableCell align="center">سال دبیرستان</StyledTableCell>
            <StyledTableCell align="center">استان</StyledTableCell>
            <StyledTableCell align="center">
              نحوه آشنایی با کاریار
            </StyledTableCell>
            <StyledTableCell align="center">نام معرف یا موسسه</StyledTableCell>
            <StyledTableCell align="center">تاریخ ارسال فرم</StyledTableCell>
          </>
        ) : (
          <>
            {!pathname.endsWith("skill-seeker") && <StyledTableCell />} {/* this cell is for checkbox...in skill-seeker page  not have been used yet  */}
            <StyledTableCell align="center">وضعیت</StyledTableCell>
            <StyledTableCell align="center">کد متقاضی</StyledTableCell>
            <StyledTableCell align="left">نام و نام خانوادگی</StyledTableCell>
            <StyledTableCell align="center">سال تولد</StyledTableCell>
            <StyledTableCell align="center">موبایل</StyledTableCell>
            <StyledTableCell align="center">ایمیل</StyledTableCell>
          </>
        )}
      </StyledTableRow>
    </TableHead>
  );
};

export default TableHeader;
