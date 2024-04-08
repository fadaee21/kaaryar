import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CurrentAssignedMentorTa, Profile } from "../../../model";
import { forwardRef, useImperativeHandle, useState } from "react";
import { StyledTableCellAdmin } from "../../../styles/adminTable";
import useAssignMentorTa from "../../../hooks/request/useAssignMentorTa";

interface Props {
  id: number;
  moduleId: number | undefined;
  volunteerData: Profile[] | undefined;
  ta: CurrentAssignedMentorTa | null;
  mentor: CurrentAssignedMentorTa | null;
  page: number;
  firstName: string;
  family: string;
  setSubmitLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const RowEditAssigning = forwardRef(
  (
    {
      id,
      moduleId,
      volunteerData,
      mentor,
      ta,
      page,
      family,
      firstName,
      setSubmitLoading,
    }: Props,
    ref
  ) => {
    const [mentorState, setMentorState] = useState(
      mentor?.personnel.id.toString() || ""
    );
    const [taState, setTaState] = useState(ta?.personnel.id.toString() || "");

    const [handleSubmitAssigning] = useAssignMentorTa(
      page,
      mentorState,
      taState,
      mentor?.assignmentId,
      ta?.assignmentId,
      moduleId,
      id,
      family,
      firstName,
      setSubmitLoading
    );

    useImperativeHandle(ref, () => ({
      handleSubmitAssigning,
    }));

    return (
      <>
        <StyledTableCellAdmin
          sx={{ minWidth: 160, maxWidth: 300 }}
          align="center"
        >
          <FormControl fullWidth>
            <InputLabel id={`ta-label`}>انتساب مربی حل تمرین</InputLabel>
            <Select
              labelId={`ta-label`}
              id="ta"
              name="ta"
              value={taState}
              label="انتساب مربی حل تمرین"
              onChange={(event) => setTaState(event.target.value.toString())}
            >
              <MenuItem disabled={!ta?.assignmentId} value={"delete"}>
                نامشخص
              </MenuItem>
              {volunteerData?.map((i) => (
                <MenuItem key={i.user.id} value={i.user.id}>
                  {i.firstName + " " + i.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledTableCellAdmin>
        <StyledTableCellAdmin
          sx={{ minWidth: 160, maxWidth: 300 }}
          align="center"
        >
          <FormControl fullWidth>
            <InputLabel id={`mentor-label`}>انتساب منتور</InputLabel>
            <Select
              labelId={`mentor-label`}
              id="mentor"
              name="mentor"
              value={mentorState}
              label="انتساب منتور"
              onChange={(event) =>
                setMentorState(event.target.value.toString())
              }
            >
              <MenuItem disabled={!mentor?.assignmentId} value={"delete"}>
                نامشخص
              </MenuItem>
              {volunteerData?.map((i) => (
                <MenuItem key={i.user.id} value={i.user.id}>
                  {i.firstName + " " + i.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledTableCellAdmin>
      </>
    );
  }
);

export default RowEditAssigning;
