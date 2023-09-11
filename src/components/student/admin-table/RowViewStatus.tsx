import React from "react";
import { StyledTableCell } from "../../../styles/table";
import { Typography } from "@mui/material";
import { StatusForm } from "../../../model";
type Props = { statusForm: StatusForm | null };
const RowViewStatus = ({ statusForm }: Props) => {
  return (
    <>
      {/* "وضعیت آموزش" */}
      <StyledTableCell align="center">
        <Typography variant="body2">
          {statusForm?.trainingStatus?.value || "-"}
        </Typography>
      </StyledTableCell>
      {/* "قدم آتی آموزش" */}
      <StyledTableCell align="center">
        <Typography variant="body2">
          {statusForm?.nextTrainingStep?.value || "-"}
        </Typography>
      </StyledTableCell>
      {/* "ارجاع به واحد مالی" */}
      <StyledTableCell align="center">
        <Typography variant="body2">
          {statusForm?.referralToFinance?.value || "-"}
        </Typography>
      </StyledTableCell>
      {/* "ارزیابی کاریار" */}
      <StyledTableCell align="center">
        <Typography variant="body2">
          {statusForm?.kaaryarAssessment?.value || "-"}
        </Typography>
      </StyledTableCell>
    </>
  );
};

export default RowViewStatus;
