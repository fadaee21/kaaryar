import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../styles/table";

const TableBodyG = () => {
  const navigate = useNavigate();
  return (
    <StyledTableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <StyledTableCell
        align="left"
        sx={{ width: "2%", verticalAlign: "center" }}
      >
        <Typography variant="body2">01</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "12%", verticalAlign: "center", cursor: "pointer" }}
      >
        <Typography
          variant="body2"
          onClick={() => {
            navigate("/admin/graduate/profile/1");
          }}
        >
          احمد اکبری
        </Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "5%", verticalAlign: "center" }}
      >
        <Typography variant="body2">05-003</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "8%", verticalAlign: "center" }}
      >
        <Typography variant="body2">برنامه نویسی فرانت اند</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "8%", verticalAlign: "center" }}
      >
        <Typography variant="body2">اشتغال غیر مرتبط</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "8%", verticalAlign: "center" }}
      >
        <Typography variant="body2">در انتظار کار</Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "8%", verticalAlign: "center" }}
      >
        <Typography variant="body2"> </Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "8%", verticalAlign: "center" }}
      >
        <Typography variant="body2"> </Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "8%", verticalAlign: "center" }}
      >
        <Typography variant="body2"> </Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "8%", verticalAlign: "center" }}
      >
        <Typography variant="body2"> </Typography>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{ width: "8%", verticalAlign: "center" }}
      >
        <Button variant="outlined">ارسال درخواست بازپرداخت</Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBodyG;
