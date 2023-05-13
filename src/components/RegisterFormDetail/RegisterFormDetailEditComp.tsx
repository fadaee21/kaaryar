import React from "react";
import {
  Grid,
  List,
  ListItem,
  Divider,
  useMediaQuery,
  Box,
} from "@mui/material";
import { BoxExamDetail } from "../../styles/examFormDetail";
import { DetailTypography } from "../../styles/studentDetail";
import { RegistrationForm } from "../../model";
import { EditingSelective } from "./EditingSelective";
import {
  acquaintanceOptions,
  eduLevelOptions,
  highSchoolOptions,
  provinceOptions,
} from "../search/searchOptions";
import EditingInput from "./EditingInput";

interface RegStudent {
  student: RegistrationForm | null;
  handleChange: (e: any) => void;
}
const RegisterFormDetailEditComp: React.FC<RegStudent> = ({
  student,
  handleChange,
}) => {
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  console.log(student)
  console.log("سیستان و بلوچستان ")
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
              <EditingInput
                handleChange={handleChange}
                name="token"
                placeholder="کد متقاضی"
                state={student?.registrationCode || ""}
              />
            </ListItem>
            <ListItem>
              <EditingInput
                handleChange={handleChange}
                name="firstName"
                placeholder="نام"
                state={student?.firstName || ""}
              />
            </ListItem>
            <ListItem>
              <EditingInput
                handleChange={handleChange}
                name="family"
                placeholder="نام خانوادگی"
                state={student?.family || ""}
              />
            </ListItem>
            <ListItem>
              <EditingSelective
                handleChange={handleChange}
                state={student?.province?.trimEnd() || ""}
                placeholder="استان"
                options={provinceOptions}
                name="province"
              />
            </ListItem>
            <ListItem>
              <EditingInput
                handleChange={handleChange}
                name="city"
                placeholder="شهر"
                state={student?.city || ""}
              />
            </ListItem>

            <ListItem>
              <EditingSelective
                options={highSchoolOptions}
                placeholder="سال دبیرستان"
                handleChange={handleChange}
                state={student?.highSchoolYear || ""}
                name="highSchoolYear"
              />
            </ListItem>
            <ListItem>
              <EditingInput
                placeholder="نام معرف یا موسسه"
                handleChange={handleChange}
                state={student?.refer || ""}
                name="refer"
              />
            </ListItem>
            <ListItem>
              <EditingInput
                placeholder="سال تولد"
                handleChange={handleChange}
                state={student?.birthDate || ""}
                name="birthDate"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <EditingInput
                placeholder="شماره همراه"
                handleChange={handleChange}
                state={student?.mobile || ""}
                name="mobile"
              />
            </ListItem>
            <ListItem>
              <EditingInput
                placeholder="ایمیل"
                handleChange={handleChange}
                state={student?.email || ""}
                name="email"
              />
            </ListItem>
            <ListItem>
              <EditingSelective
                options={acquaintanceOptions}
                placeholder="نحوه آشنایی"
                handleChange={handleChange}
                state={student?.familiarity?.trim() || ""}
                name="familiarity"
              />
            </ListItem>
            <ListItem>
              <EditingSelective
                options={eduLevelOptions}
                placeholder="میزان تحصیلات"
                handleChange={handleChange}
                state={student?.education || ""}
                name="education"
              />
            </ListItem>
            <ListItem>
              <EditingInput
                placeholder="رشته تحصیلی"
                handleChange={handleChange}
                state={student?.studyField || ""}
                name="studyField"
              />
            </ListItem>
            <ListItem>
              <EditingInput
                placeholder="رشته انتخابی در کاریار"
                handleChange={handleChange}
                state={student?.selectedField || ""}
                name="selectedField"
              />
            </ListItem>
            <ListItem>
              <EditingInput
                placeholder="توضیحات سایر"
                handleChange={handleChange}
                state={student?.description || ""}
                name="description"
              />
            </ListItem>
          </List>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            marginRight: 5,
          }}
        ></Box>
      </Grid>
    </BoxExamDetail>
  );
};

export default RegisterFormDetailEditComp;
