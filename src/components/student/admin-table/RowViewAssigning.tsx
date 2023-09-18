import {
  StyledTableCellAdmin,
  StyledTypographyAdmin,
} from "../../../styles/adminTable";
interface Props {
  taFullName: string;
  mentorFullName: string;
}
const RowViewAssigning = ({ taFullName, mentorFullName }: Props) => {
  return (
    <>
      {/* "مربی حل تمرین" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin variant="body2" textAlign={"center"}>
          {taFullName}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {/* "منتور" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin variant="body2" textAlign={"center"}>
          {mentorFullName}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
    </>
  );
};

export default RowViewAssigning;
