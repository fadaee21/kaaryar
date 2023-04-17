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
            <StyledTableCell align="center">نام و نام خانوادگی</StyledTableCell>
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
            {/* this cell is for checkbox...in skill-seeker page  not have been used yet */}
            {!pathname.endsWith("skill-seeker") && <StyledTableCell />}
            <StyledTableCell align="center">وضعیت</StyledTableCell>
            <StyledTableCell align="center">کد متقاضی</StyledTableCell>
            <StyledTableCell align="center">نام و نام خانوادگی</StyledTableCell>
            <StyledTableCell align="center">استان</StyledTableCell>
            <StyledTableCell align="center">شهر</StyledTableCell>
            {/* <StyledTableCell align="center">جنسیت</StyledTableCell> */}
            <StyledTableCell align="center">شماره همراه</StyledTableCell>
            <StyledTableCell align="center">ایمیل</StyledTableCell>
            {/* <StyledTableCell align="center">رشته تحصیلی</StyledTableCell> */}
            {/* <StyledTableCell align="center">وضعیت تحصیلی</StyledTableCell> */}
            {pathname.endsWith("before-week") && (
              <StyledTableCell align="center">نمره آزمون</StyledTableCell>
            )}
            {pathname.endsWith("after-week") && (
              <StyledTableCell align="center">نتیجه نهایی</StyledTableCell>
            )}

            {pathname.endsWith("before-week") && (
              <StyledTableCell align="center">آمادگی کار </StyledTableCell>
            )}
            {pathname.endsWith("after-week") && (
              <StyledTableCell align="center">بورسیه</StyledTableCell>
            )}
            {pathname.endsWith("skill-seeker") && (
              <StyledTableCell align="center">رشته انتخابی</StyledTableCell>
            )}

            {pathname.endsWith("before-week") && (
              <StyledTableCell align="center">
                هدف از شرکت
              </StyledTableCell>
            )}
            {pathname.endsWith("after-week") && (
              <StyledTableCell align="center">رشته نهایی</StyledTableCell>
            )}
            {pathname.endsWith("skill-seeker") && (
              <StyledTableCell align="center">رشته نهایی</StyledTableCell>
            )}
            {pathname.endsWith("skill-seeker") && (
              <StyledTableCell align="center">نتیجه نهایی</StyledTableCell>
            )}
          </>
        )}
      </StyledTableRow>
    </TableHead>
  );
};

export default TableHeader;
