import { StatusForm } from "../../../model";
import {
  StyledTableCellAdmin,
  StyledTypographyAdmin,
} from "../../../styles/adminTable";
type Props = { statusForm: StatusForm | null };
const RowViewStatus = ({ statusForm }: Props) => {
  // if (!statusForm) return null;
  const {
    referralToFinance,
    nextTrainingStep,
    kaaryarAssessment,
    trainingStatus,
  } = statusForm || {};
  return (
    <>
      {/* "وضعیت آموزش" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin textAlign={"center"} variant="body2">
          {trainingStatus?.id === 1 ? "-" : trainingStatus?.value}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {/* "قدم آتی آموزش" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin variant="body2">
          {nextTrainingStep?.id === 1 ? "-" : nextTrainingStep?.value}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {/* "ارجاع به واحد مالی" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin variant="body2">
          {referralToFinance?.id === 1 ? "-" : referralToFinance?.value}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {/* "ارزیابی کاریار" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin variant="body2">
          {kaaryarAssessment?.id === 1 ? "-" : kaaryarAssessment?.value}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
    </>
  );
};

export default RowViewStatus;
