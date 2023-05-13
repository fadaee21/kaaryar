import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { RegistrationForm } from "../../model";
import { BoxExamDetail } from "../../styles/examFormDetail";
import { DetailTypography } from "../../styles/studentDetail";
import { addComma } from "../../utils/addComma";

interface RegStudent {
  student: RegistrationForm | null;
}

const RegisterFormDetailComp = ({ student }: RegStudent) => {
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  return (
    <BoxExamDetail>
      <DetailTypography variant="h6" sx={{ minWidth: "30%" }}>
        فرم ثبت اطلاعات اولیه
      </DetailTypography>
      <Divider
        variant="middle"
        flexItem
        orientation={matches ? "vertical" : "horizontal"}
      />
      <Grid container>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <ListItemText primary="کد متقاضی :" secondary={student?.registrationCode} />
            </ListItem>
            <ListItem>
              <ListItemText primary="نام :" secondary={student?.firstName} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="نام خانوادگی :"
                secondary={student?.family}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="استان :" secondary={student?.province} />
            </ListItem>
            <ListItem>
              <ListItemText primary="شهر :" secondary={student?.city} />
            </ListItem>
            <ListItem>
              <ListItemText primary="دوره :" secondary={student?.course} />
            </ListItem>

            <ListItem>
              <ListItemText
                primary="سال دبیرستان :"
                secondary={student?.highSchoolYear}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="سال تولد :"
                secondary={student?.birthDate}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <ListItemText
                primary="نام معرف یا موسسه :"
                secondary={student?.refer}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="شماره همراه :"
                secondary={student?.mobile}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="ایمیل :" secondary={student?.email} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="نحوه آشنایی :"
                secondary={addComma(student?.familiarity)}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="میزان تحصیلات :"
                secondary={student?.education}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="رشته تحصیلی :"
                secondary={student?.studyField}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="رشته انتخابی در کاریار :"
                secondary={student?.selectedField}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="توضیحات سایر :"
                secondary={student?.description}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </BoxExamDetail>
  );
};

export default RegisterFormDetailComp;
