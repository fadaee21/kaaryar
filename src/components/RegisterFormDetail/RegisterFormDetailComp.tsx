import { Grid, List, ListItem, ListItemText } from "@mui/material";
import { RegistrationForm } from "../../model";
import LayoutReg from "../layout/LayoutReg";
import { getLabel } from "../../utils/getLabel";
import { SelectedFieldOpt } from "../search/searchOptions";

interface RegStudent {
  student: RegistrationForm | undefined;
  studentDetailComp?: boolean;
}

const RegisterFormDetailComp = ({ student, studentDetailComp }: RegStudent) => {
  return (
    <LayoutReg title="فرم ثبت اطلاعات اولیه" NotRender={studentDetailComp}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <ListItemText
                primary="کد متقاضی :"
                secondary={student?.registrationCode || "-"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="نام :"
                secondary={student?.firstName || "-"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="نام خانوادگی :"
                secondary={student?.family || "-"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="استان :"
                secondary={student?.province || "-"}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="شهر :" secondary={student?.city || "-"} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="گروه :"
                secondary={student?.course || "-"}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary="سال تولد :"
                secondary={student?.birthDate || "-"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="نحوه آشنایی :"
                secondary={
                  !student?.familiarity || student?.familiarity === ""
                    ? "-"
                    : student?.familiarity === "other"
                    ? "سایر"
                    : student?.familiarity
                }
              />
            </ListItem>
            {student?.refer && (
              <ListItem>
                <ListItemText
                  primary="نام معرف یا موسسه :"
                  secondary={student?.refer || "-"}
                />
              </ListItem>
            )}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <ListItemText
                primary="شماره همراه :"
                secondary={student?.mobile || "-"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="ایمیل :"
                secondary={student?.email || "-"}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary="میزان تحصیلات :"
                secondary={student?.education || "-"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="سال دبیرستان :"
                secondary={student?.highSchoolYear || "-"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="ترم دانشگاه :"
                secondary={student?.uniSemester || "-"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="رشته تحصیلی :"
                secondary={student?.studyField || "-"}
              />
            </ListItem>
            <ListItem>
              {/* <ListItemText
                primary="رشته انتخابی در کاریار :"
                secondary={
                  !student?.selectedField || student?.selectedField === ""
                  ? "-"
                    : student?.selectedField === "other"
                    ? "سایر"
                    : getLabel(student?.selectedField, SelectedFieldOpt)
                  }
                /> */}
              <ListItemText
                primary="رشته انتخابی در کاریار :"
                secondary={student?.careerPathway?.name || "سایر"}
              />
            </ListItem>

            {student?.careerPathwayOther && (
              <ListItem>
                <ListItemText
                  primary="مسیر مورد نظر متقاضی:"
                  secondary={
                    student?.careerPathwayOther ||
                    getLabel(student?.selectedField, SelectedFieldOpt) ||
                    "-"
                  }
                />
              </ListItem>
            )}

            <ListItem>
              <ListItemText
                primary="توضیحات سایر :"
                secondary={student?.description || "-"}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </LayoutReg>
  );
};

export default RegisterFormDetailComp;
