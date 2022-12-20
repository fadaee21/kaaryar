import React from "react";
import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  List,
  ListItem,
  Divider,
  useMediaQuery,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { BoxExamDetail } from "../../styles/examFormDetail";
import { DetailTypography } from "../../styles/studentDetail";
import { RegistrationForm } from "../../model";

interface RegStudent {
  student: RegistrationForm | null;
  handleChange: (e: any) => void;
}
const RegisterFormDetailEditComp: React.FC<RegStudent> = ({
  student,
  handleChange,
}) => {
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

      {student ? (
        <Grid container>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="token">کد متقاضی : </InputLabel>
                  <Input
                    id="instituteType"
                    value={student?.token || " "}
                    onChange={handleChange}
                    name="token"
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="firstName">نام : </InputLabel>
                  <Input
                    id="lastInstitute"
                    value={student?.firstName || " "}
                    onChange={handleChange}
                    name="firstName"
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="family">نام خانوادگی : </InputLabel>
                  <Input
                    id="eduLevel"
                    value={student?.family || " "}
                    onChange={handleChange}
                    name="family"
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="province">استان : </InputLabel>
                  <Input
                    id="stuSemester"
                    value={student?.province || " "}
                    onChange={handleChange}
                    name="province"
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="city">شهر : </InputLabel>
                  <Input
                    id="stuYear"
                    value={student?.city || " "}
                    onChange={handleChange}
                    name="city"
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel id="idGenderLabel">جنسیت : </InputLabel>
                  <Select
                    labelId="idGenderLabel"
                    id="idGender"
                    name="gender"
                    onChange={handleChange}
                    label="gender"
                    value={student?.gender}
                  >
                    <MenuItem value={"مرد"}>مرد</MenuItem>
                    <MenuItem value={"زن"}>زن</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="codeMeli">کد ملی : </InputLabel>
                  <Input
                    id="stuYear"
                    value={student?.codeMeli || " "}
                    onChange={handleChange}
                    name="codeMeli"
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="birthDate">سال تولد : </InputLabel>
                  <Input
                    id="stuYear"
                    value={student?.birthDate || " "}
                    onChange={handleChange}
                    name="birthDate"
                  />
                </FormControl>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="mobile">شماره همراه : </InputLabel>
                  <Input
                    id="instituteType"
                    value={student?.mobile || " "}
                    onChange={handleChange}
                    name="mobile"
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="email">ایمیل : </InputLabel>
                  <Input
                    id="lastInstitute"
                    value={student?.email || " "}
                    onChange={handleChange}
                    name="email"
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="familiarity">نحوه آشنایی : </InputLabel>
                  <Input
                    id="eduLevel"
                    value={student?.familiarity || " "}
                    onChange={handleChange}
                    name="familiarity"
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="education">میزان تحصیلات : </InputLabel>
                  <Input
                    id="stuSemester"
                    value={student?.education || " "}
                    onChange={handleChange}
                    name="education"
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="studyField">رشته تحصیلی : </InputLabel>
                  <Input
                    id="stuYear"
                    value={student?.studyField || " "}
                    onChange={handleChange}
                    name="studyField"
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="selectedField">
                    رشته انتخابی در کاریار :{" "}
                  </InputLabel>
                  <Input
                    id="stuYear"
                    value={student?.selectedField || " "}
                    onChange={handleChange}
                    name="selectedField"
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl
                  fullWidth
                  sx={{ width: "40ch" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="description">توضیحات سایر :</InputLabel>
                  <Input
                    id="stuYear"
                    value={student?.description || " "}
                    onChange={handleChange}
                    name="description"
                  />
                </FormControl>
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
      ) : null}
    </BoxExamDetail>
  );
};

export default RegisterFormDetailEditComp;
