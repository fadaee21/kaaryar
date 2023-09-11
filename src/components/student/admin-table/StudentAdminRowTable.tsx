import { StyledTableCell, StyledTableRow } from "../../../styles/table";
import { Stack, Typography } from "@mui/material";
import TablePic from "../../table/TablePic";
import { itemCounterTable } from "../../../utils/itemCounterTable";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CareerPathway, RegistrationForm, StatusForm } from "../../../model";
import EditingButtons from "./EditingButtons";
import ViewButtons from "./ViewButtons";
import RowViewStatus from "./RowViewStatus";
import RowEditStatus from "./RowEditStatus";
import useGetStatusStudent from "../../../hooks/request/useGetStatusStudent";
import { yellow } from "@mui/material/colors";
// import LoadingProgress from "../../LoadingProgress";
interface Props {
  id: number;
  firstName: string;
  family: string;
  username: string;
  picture: {
    imageAddress: string;
  };
  city: string;
  statusForm: StatusForm | null;
  registrationForm: RegistrationForm | null;
  careerPathway: CareerPathway | null;
  i: number;
  searchingMoodleStudent: any[] | null;
  page: number;
  pageSize: number;
}
const StudentAdminRowTable = ({
  id,
  firstName,
  family,
  username,
  picture,
  city,
  statusForm,
  registrationForm,
  careerPathway,
  i,
  searchingMoodleStudent,
  page,
  pageSize,
}: Props) => {
  const [editingMode, setEditingMode] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const toggleEditingMode = () => setEditingMode((i) => !i);
  const {
    trainingData,
    nextStepData,
    referralToFinanceData,
    kaaryarAssessmentData,
  } = useGetStatusStudent(true);

  const childRef = useRef<{
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  }>();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>
    childRef.current?.handleSubmit(e);

  return (
    <StyledTableRow
      key={id}
      sx={{
        ...(editingMode ? { backgroundColor: `${yellow[50]} !important` } : {}),
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      {/* ردیف */}
      <StyledTableCell align="center">
        <Typography variant="body2">
          {searchingMoodleStudent ? i + 1 : itemCounterTable(page, pageSize, i)}
        </Typography>
      </StyledTableCell>
      {/* عکس */}
      <StyledTableCell align="center">
        <TablePic picture={picture} lastName={family} />
      </StyledTableCell>
      {/* "نام و نام خانوادگی" */}
      <StyledTableCell
        align="center"
        sx={{
          verticalAlign: "center",
          cursor: "pointer",
        }}
        onClick={() => navigate(`${id}`)}
      >
        <Typography variant="body1">{firstName + " " + family}</Typography>
      </StyledTableCell>
      {/* "نام کاربری" */}
      <StyledTableCell align="center">
        <Typography variant="body2" textAlign={"center"}>
          {username}
        </Typography>
      </StyledTableCell>
      {/* "گروه" */}
      <StyledTableCell align="center">
        <Typography variant="body2">{registrationForm?.course}</Typography>
      </StyledTableCell>
      {/* "استان" */}
      <StyledTableCell align="center">
        <Typography variant="body2">
          {registrationForm?.province || "-"}
        </Typography>
      </StyledTableCell>
      {/* "شهر" */}
      <StyledTableCell align="center">
        <Typography variant="body2">
          {registrationForm?.city || city || "-"}
        </Typography>
      </StyledTableCell>
      {/* "معرف" */}
      <StyledTableCell align="center">
        <Typography variant="body2">
          {registrationForm?.refer || "-"}
        </Typography>
      </StyledTableCell>
      {/* "مسیر آموزشی" */}
      <StyledTableCell align="center">
        <Typography variant="body2" textAlign={"center"}>
          {careerPathway?.name ?? "-"}
        </Typography>
      </StyledTableCell>
      {/* " دوره کنونی" */}
      <StyledTableCell align="center">
        <Typography variant="body2" textAlign={"center"}>
          -
        </Typography>
      </StyledTableCell>
      {/* "مربی حل تمرین" */}
      <StyledTableCell align="center">
        <Typography variant="body2" textAlign={"center"}>
          -
        </Typography>
      </StyledTableCell>
      {/* "منتور" */}
      <StyledTableCell align="center">
        <Typography variant="body2" textAlign={"center"}>
          -
        </Typography>
      </StyledTableCell>
      {editingMode ? (
        <RowEditStatus
          statusForm={statusForm}
          trainingData={trainingData}
          nextStepData={nextStepData}
          referralToFinanceData={referralToFinanceData}
          kaaryarAssessmentData={kaaryarAssessmentData}
          firstName={firstName}
          family={family}
          ref={childRef}
          page={page}
          setSubmitLoading={setSubmitLoading}
        />
      ) : (
        <RowViewStatus statusForm={statusForm} />
      )}
      {/* "عملیات" */}
      <StyledTableCell align="center">
        <Stack spacing={1} direction="row">
          {editingMode ? (
            <EditingButtons
              toggleEditingMode={toggleEditingMode}
              handleClick={handleSubmit}
              submitLoading={submitLoading}
            />
          ) : (
            <ViewButtons toggleEditingMode={toggleEditingMode} />
          )}
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default StudentAdminRowTable;
