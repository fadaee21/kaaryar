import { Stack } from "@mui/material";
import TablePic from "../../table/TablePic";
import { itemCounterTable } from "../../../utils/itemCounterTable";
import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  CareerPathway,
  CurrentAssignedMentorTa,
  CurrentModuleAsStudent,
  DetailStudentStatus,
  Profile,
  RegistrationForm,
  StatusForm,
} from "../../../model";
import EditingButtons from "./EditingButtons";
import ViewButtons from "./ViewButtons";
import RowViewStatus from "./RowViewStatus";
import RowEditStatus from "./RowEditStatus";
import { yellow } from "@mui/material/colors";
import {
  StyledTableCellAdmin,
  StyledTableRowAdmin,
  StyledTypographyAdmin,
} from "../../../styles/adminTable";
import RowViewAssigning from "./RowViewAssigning";
import RowEditAssigning from "./RowEditAssigning";

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
  countAll: boolean;
  page: number;
  pageSize: number;
  currentAssignedMentor: CurrentAssignedMentorTa | null;
  currentAssignedTA: CurrentAssignedMentorTa | null;
  currentModuleAsStudent?: CurrentModuleAsStudent;
  latestEnrolledModule: any;
  trainingData: DetailStudentStatus[] | undefined;
  nextStepData: DetailStudentStatus[] | undefined;
  referralToFinanceData: DetailStudentStatus[] | undefined;
  kaaryarAssessmentData: DetailStudentStatus[] | undefined;
  volunteerData: Profile[] | undefined;
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
  countAll,
  page,
  pageSize,
  currentAssignedMentor,
  currentAssignedTA,
  currentModuleAsStudent,
  latestEnrolledModule,
  trainingData,
  nextStepData,
  referralToFinanceData,
  kaaryarAssessmentData,
  volunteerData,
}: Props) => {
  const [editingMode, setEditingMode] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [assigningMode, setAssigningMode] = useState(false);
  const [mode, setMode] = useState<"edit" | "assign" | null>(null); // there is only one confirm changes button for handling edit and assign
  const toggleEditingMode = () => {
    setEditingMode((i) => !i);
    setMode("edit");
  };
  const toggleAssigningMode = () => {
    setAssigningMode((i) => !i);
    setMode("assign");
  };

  const childRefEditing = useRef<{
    handleSubmitEditing: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  }>();
  const childRefAssigning = useRef<{
    handleSubmitAssigning: (
      e: React.FormEvent<HTMLFormElement>
    ) => Promise<void>;
  }>();
  const handleSubmitEditing = async (e: FormEvent<HTMLFormElement>) =>
    childRefEditing.current?.handleSubmitEditing(e);
  const handleSubmitAssigning = async (e: FormEvent<HTMLFormElement>) =>
    childRefAssigning.current?.handleSubmitAssigning(e);

  const mentorFullName = currentAssignedMentor
    ? currentAssignedMentor.personnel.firstName +
      " " +
      currentAssignedMentor.personnel.family
    : "-";
  const taFullName = currentAssignedTA
    ? currentAssignedTA.personnel.firstName +
      " " +
      currentAssignedTA.personnel.family
    : "-";

  return (
    <StyledTableRowAdmin
      key={id}
      sx={{
        ...(editingMode || assigningMode
          ? { backgroundColor: `${yellow[50]} !important` }
          : {}),
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      {/* ردیف */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin variant="body2">
          {countAll ? i + 1 : itemCounterTable(page, pageSize, i)}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {/* عکس */}
      <StyledTableCellAdmin align="center">
        <TablePic picture={picture} lastName={family} />
      </StyledTableCellAdmin>
      {/* "نام و نام خانوادگی" */}
      <StyledTableCellAdmin
        align="center"
        sx={{
          verticalAlign: "center",
          cursor: "pointer",
        }}
      >
        <StyledTypographyAdmin variant="body1">
          <Link to={`${id}`}>{firstName + " " + family}</Link>
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {/* "نام کاربری" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin variant="body2" textAlign={"center"}>
          {username}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {/* "گروه" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin variant="body2">
          {registrationForm?.course}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {/* "استان" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin variant="body2">
          {registrationForm?.province || "-"}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {/* "شهر" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin variant="body2">
          {registrationForm?.city || city || "-"}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {/* "معرف" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin variant="body2">
          {registrationForm?.refer || "-"}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {/* "نحوه آشنایی" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin variant="body2">
          {registrationForm?.familiarity === "other"
            ? "سایر"
            : registrationForm?.familiarity || "-"}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {/* "مسیر آموزشی" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin variant="body2" textAlign={"center"}>
          {careerPathway?.name ?? "-"}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {/* "  دوره کنونی / آخرین دوره" */}
      <StyledTableCellAdmin align="center">
        <StyledTypographyAdmin
          maxWidth={200}
          variant="body2"
          textAlign={"center"}
        >
          {latestEnrolledModule?.name || "-"}
          {/* {statusForm?.trainingStatus?.id !== 2 ? "-" : currentModule} */}
          {/* {statusForm?.trainingStatus?.id !== 2
            ? "-"
            : latestEnrolledModule?.name || "-"} */}
        </StyledTypographyAdmin>
      </StyledTableCellAdmin>
      {assigningMode ? (
        <RowEditAssigning
          volunteerData={volunteerData}
          ta={currentAssignedTA}
          mentor={currentAssignedMentor}
          firstName={firstName}
          family={family}
          ref={childRefAssigning}
          page={page}
          setSubmitLoading={setSubmitLoading}
          id={id}
          moduleId={currentModuleAsStudent?.id}
        />
      ) : (
        <RowViewAssigning
          taFullName={taFullName}
          mentorFullName={mentorFullName}
        />
      )}

      {editingMode ? (
        <RowEditStatus
          statusForm={statusForm}
          trainingData={trainingData}
          nextStepData={nextStepData}
          referralToFinanceData={referralToFinanceData}
          kaaryarAssessmentData={kaaryarAssessmentData}
          firstName={firstName}
          family={family}
          ref={childRefEditing}
          page={page}
          setSubmitLoading={setSubmitLoading}
        />
      ) : (
        <RowViewStatus statusForm={statusForm} />
      )}
      {/* "عملیات" */}
      <StyledTableCellAdmin align="center" sx={{ maxWidth: 520 }}>
        <Stack spacing={1} direction="row">
          {editingMode || assigningMode ? (
            <EditingButtons
              toggleEditingMode={toggleEditingMode}
              toggleAssigningMode={toggleAssigningMode}
              handleClickEditing={handleSubmitEditing}
              handleClickAssigning={handleSubmitAssigning}
              submitLoading={submitLoading}
              mode={mode}
            />
          ) : (
            <ViewButtons
              toggleEditingMode={toggleEditingMode}
              toggleAssigningMode={toggleAssigningMode}
              statusForm={statusForm}
              latestEnrolledModuleId={latestEnrolledModule?.id}
            />
          )}
        </Stack>
      </StyledTableCellAdmin>
    </StyledTableRowAdmin>
  );
};

export default StudentAdminRowTable;
