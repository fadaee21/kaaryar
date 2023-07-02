import { List, ListItem, ListItemText, Stack } from "@mui/material";
import {
  ModulesAsStudentAssessment,
  ModulesAsStudentModule,
} from "../../model";
import { convertArrToStr } from "../../utils/courseMethod";
import { persianDate } from "../../utils/persianDate";
interface Props {
  assessment: ModulesAsStudentAssessment | undefined;
  module: ModulesAsStudentModule | undefined;
}

const StudentCoreDetailComp = ({ assessment, module }: Props) => {
  const {
    name,
    careerPathway,
    instructors,
    description,
    category,
    teachingStatus,
    startDate,
  } = module || {};
  const { attendanceGrade, finalGrade, finalProjectGrade, finalAssessment } =
    assessment || {};
  return (
    <Stack direction="row">
      <List sx={{ width: "40%" }}>
        <ListItem>
          <ListItemText primary={"نام دوره"} secondary={name} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"مسیر مرتبط"}
            secondary={careerPathway?.name || "-"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"نام مدرس"}
            secondary={convertArrToStr(instructors || [])}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"توضیحات دوره"}
            secondary={description || "-"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"وضعیت حضور و غیاب در دوره"}
            secondary={attendanceGrade || "-"}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={"نمره نهایی"} secondary={finalGrade || "-"} />
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemText
            primary={"گروه مرتبط"}
            secondary={category?.name || "-"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"وضعیت دوره"}
            secondary={teachingStatus || "-"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"تاریخ شروع"}
            secondary={persianDate(startDate)}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"نمره ارزیابی پروژه پایانی"}
            secondary={finalProjectGrade || "-"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"ارزیابی نهایی"}
            secondary={finalAssessment?.value || "-"}
          />
        </ListItem>
      </List>
    </Stack>
  );
};

export default StudentCoreDetailComp;
